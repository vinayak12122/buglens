from datetime import timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException,Depends,APIRouter,status,Response

from database.models import User
from database.connection import get_db
from api.utils.dependency import get_current_user,verify_pre_auth_token
from api.utils.security import hash_password,verify_pass,create_access_token
from api.schemas.validator import UserLogin, UserSignup, UserOut,TokenResponse,EmailCheck,PasswordVerify

router = APIRouter(prefix="/auth",tags=["Authentication"])

@router.post('/signup',status_code=status.HTTP_201_CREATED)
async def signup(user_data:UserSignup,response:Response,db:Session=Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account with this email already exists"
        )
    
    hashed_pwd = hash_password(user_data.password)
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub":str(new_user.id)})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 24 * 7
    )

    return {"message":"Signup successful"}

@router.post('/check-email')
async def check_email(payload: EmailCheck, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    
    pre_auth_token = create_access_token(
        data={"sub": str(user.id), "intent": "pre-auth"},
        expires_delta=timedelta(minutes=2)
    )
    
    response.set_cookie(
        key="pre_auth_token",
        value=pre_auth_token,
        httponly=True,
        secure=False, 
        samesite="lax",
        max_age=120 
    )
    
    return {"message": "Email verified", "name": user.name}


@router.post('/verify-password')
async def verify_password(
    payload: PasswordVerify,
    response: Response,
    user: User = Depends(verify_pre_auth_token), 
    db: Session = Depends(get_db)
):
    if not verify_pass(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect password")
    
    access_token = create_access_token(data={"sub": str(user.id)})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 24 * 7
    )

    response.delete_cookie("pre_auth_token")

    return {"message": "Login successful"}



@router.post('/login',status_code=status.HTTP_200_OK)
async def login(credentials:UserLogin,response:Response,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_pass(credentials.password,user.password_hash):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"sub":str(user.id)})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 24 * 7
    )
    return {"message":"Login successful"}

@router.post("/logout")
async def logout(response:Response):
    response.delete_cookie(
        key="access_token",
        path="/",
        domain=None,
        httponly=True,
        secure=False,
        samesite="lax"
    )
    return {"message":"Successfully logged out"}

@router.get('/me',response_model=UserOut)
async def get_me(curr_user:User=Depends(get_current_user)):
    return curr_user
    

