import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '/store/userSlice';
import { Label } from '@/src/components/ui/label';
import { motion } from 'framer-motion'; // Import Framer Motion

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await result.json();
      if (data) {
        dispatch(login({ id: data.data.user_id, name: data.data.userFind.fullName }));
        toast.success("Login Successful");
      } else {
        toast.error("Login Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form method="post" className="w-full" onSubmit={handleSubmit}>
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-gray-900 w-full max-w-md rounded-xl text-center flex flex-col p-8 shadow-2xl"
        >
          <h1 className="text-white font-serif text-3xl mb-6">Login for existing user!</h1>

          <div className="flex flex-col mb-4 w-full">
            <Label className="text-white text-left m-2">Email</Label>
            <Input
              type="email"
              placeholder="Enter Your email"
              value={email}
              name="email"
              className="rounded p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <Label className="text-white text-left m-2">Password</Label>
            <Input
              type="password"
              placeholder="Enter Your password"
              value={password}
              name="password"
              className="rounded p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <p className="flex justify-center font-serif mb-2 text-white">
              Don't have an account?
              <Link to="/signup" className="text-blue-400 cursor-pointer underline ml-2">Register account!</Link>
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 w-full">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-serif font-bold p-3 rounded-lg shadow-md w-full transition-transform duration-300"
              >
                Login
              </Button>
            </motion.div>
            
            {/* <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-green-600 hover:bg-green-500 text-white font-serif font-bold p-3 rounded-lg shadow-md w-full transition-transform duration-300"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                SignIn with Google
              </Button>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </form>
  );
}

export default Login;
