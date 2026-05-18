import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast';
import second from 'dotenv'
import { ChevronLeft, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const {signup} = useAuth();

  const handleSignUp = async (e) => {

    e.preventDefault();

    const nameRegex = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/;

    if (!name || !email || !password) {
      toast("Please fill in all fields", "error");
      return;
    }

    if (!nameRegex.test(name.trim())) {
      toast("Please enter your full name", "error");
      return;
    }

    try {

      setLoading(true);

      await signup({
        name,
        email,
        password
      });

      toast("Account created successfully!", "success");

      navigate('/dashboard');

    } catch (error) {

      toast(error.message, "error");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className='p-2 min-h-screen overflow-hidden bg-app-bg'>
      <header className='w-full flex justify-between items-center p-2'>
        <p className='text-app-text text-xl tracking-wider font-rogbold  flex items-center gap-2'>
          <ChevronLeft
            className='text-app-text'
            onClick={() => navigate('/auth/login')}
          />
          BugLens</p>
        <button
          className='bg-app-bg border border-app-border text-app-text text-sm px-4 py-1 rounded font-medium'
          onClick={() => navigate('/auth/login')}
        >
          Login
        </button>
      </header>

      <div className='w-full flex flex-col items-center mt-20 gap-10'>
        <p className='font-bold text-app-text sm:text-2xl text-xl'>
          Create your account
        </p>

        <div className='w-full max-w-sm px-4'>
          <form onSubmit={handleSignUp} className='flex flex-col gap-5'>
            <input
              type="text"
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='p-3 w-full border border-app-border rounded-lg bg-transparent text-app-text focus:outline-none focus:border-app-accent capitalize'
            />
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-3 w-full border border-app-border rounded-lg bg-transparent text-app-text focus:outline-none focus:border-app-accent'
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-3 w-full border border-app-border rounded-lg bg-transparent text-app-text focus:outline-none focus:border-app-accent'
            />
            <button
              type="submit"
              className='bg-app-text text-app-bg p-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex justify-center items-center'
            >
              {loading ? 
            <Loader className='animate-spin'/>:
            <>Sign up</>  
            }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
