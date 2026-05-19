import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const { login } = useAuth();

  const submitEmail = async (e) => {
    if (email.trim() === '') {
      toast("Please enter email", "error");
      return;
    }
    try {
      setLoading(true)
      const res = await fetch(`${backend_url}/auth/check-email`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email }),
        credentials: 'include'
      })

      const data = await res.json()

      if(res.ok){
        setStep(2);
      }else{
        toast(data.detail || "Email is not exists please signup", "error");
      }

    } catch (error) {
      toast(error.message, "error");
    }finally{
      setLoading(false)
    }
  };

  const handleLogin = async() => {
    if (password.trim() === '') {
      toast("Please enter password", "error");
      return;
    }

    try {

      setLoading(true);

      await login(password);

      navigate('/dashboard');

    } catch (error) {

      toast(error.message, "error");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className='p-2 min-h-screen overflow-hidden'>
      <header className='w-full flex justify-between items-center p-2'>
        <p className='text-app-text text-xl tracking-wider font-rogbold flex gap-2 items-center'>
          <ChevronLeft 
          className='text-app-text'
          onClick={()=>navigate('/')}
          />
          BugLens</p>
        <button
          className='bg-(--text) text-(--bg) text-sm px-2 py-1 rounded font-medium'
          onClick={() => navigate('/auth/signup')}
        >
          Sign Up
        </button>
      </header>

      <div className='w-full flex flex-col items-center mt-20 gap-10'>
        <p className='font-bold text-app-text sm:text-2xl text-xl transition-all'>
          Log in to BugLens
        </p>

        <div className='w-full max-w-sm overflow-hidden'>

          <div
            className='auth-track'
            style={{ transform: `translateX(${step === 1 ? '0%' : '-50%'})` }}
          >

            <div className='auth-slide px-1 flex flex-col gap-5'>
              <input
                type="email"
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-3 w-full border border-app-border rounded-lg focus:border-blue-500/50 focus:outline-none bg-transparent dark:placeholder:text-gray-500'
                required
              />
              <button
                type='submit'
                disabled={loading}
                className={`bg-(--text) text-(--bg) p-3 rounded-lg font-medium flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} `}
                onClick={submitEmail}
              >
                {loading ?
                  <Loader className='animate-spin' />
                  :
                  <>
                    Continue with Email <ChevronRight className='ml-2' size={18} />
                  </>
                }
              </button>
            </div>

            <div className='auth-slide px-1'>
              <div className='flex flex-col gap-5'>
                <div>

                  <input
                    type="password"
                    placeholder="Password"
                    autoFocus={step === 2}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={step !== 2}
                    tabIndex={step === 2 ? 0 : -1}
                    className='p-3 w-full border border-app-border rounded-lg focus:border-blue-500/50 focus:outline-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed'
                    required
                  />
                  <span className='text-app-text-h flex gap-2 p-0.5 text-xs'>
                    {email}
                    <p className='text-blue-600 cursor-pointer'
                      onClick={() => setStep(1)}
                    >edit</p>
                  </span>
                </div>
                <button
                  className={`bg-(--text) text-(--bg) p-3 rounded-lg font-medium  ${loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} flex justify-center items-center`}
                  disabled={loading}
                  onClick={handleLogin}
                  type='submit'
                >
                  {loading ?
                    <Loader className='animate-spin' />
                  :
                    <>Log In</>
                  }
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login