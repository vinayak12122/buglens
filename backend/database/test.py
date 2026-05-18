from connection import engine
from sqlalchemy import text

def test_conn():
    print("Testing DB Connection....")

    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            value = result.scalar()

        if value == 1:
            print("Successfully connected to the database!")
            print("Your connection parameters are valid.")
    except Exception as e:
        print("Database connection failed!")
        print(f"Error details: {e}")

if __name__ == "__main__":
    test_conn()