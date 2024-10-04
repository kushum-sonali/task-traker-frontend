import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Label } from '@/src/components/ui/label';
import { useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../tododataConfig'
import { login } from '/store/userSlice';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion'; // Import Framer Motion

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setfullName] = useState('');
  const [phone, setPhone] = useState('');
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

    const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'fullName') setfullName(value);
    else if (name === 'phone') setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, phone, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await result.json();

      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
        toast.success("Signup Successful");
        navigate('/login');
      } else {
        toast.error("Signup Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const googleSubmit = async (userToSave) => {
    const result = await fetch('http://localhost:3000/firebaseuser', {
      method: 'POST',
      body: JSON.stringify({
        fullName: userToSave.fullName,
        email: userToSave.email,
        firebaseId: userToSave.firebaseId
      }),
      headers: {
        "content-Type": "application/json"
      },
    });

    const data = await result.json();
    if (data) {
      dispatch(login({ id: data.user._id, name: data.user.fullName }))
      navigate("/")
      toast.success("SignIn successfully");
    }
  };

  const googleSignIn = async () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      const userToSave = {
        email: user.email,
        fullName: user.displayName,
        firebaseId: user.uid
      }
      await googleSubmit(userToSave);
    })
  }

  return (
    <form method="post" className="w-full" onSubmit={handleSubmit}>
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-gray-900 w-full max-w-md rounded-xl text-center flex flex-col p-6 shadow-2xl"
        >
          <h1 className="text-white font-serif text-3xl mb-4">Signup for new user</h1>

          <div className="flex flex-col mb-4 w-full">
            <Label className="text-white text-left m-2">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your username"
              value={fullName}
              name="fullName"
              className="rounded p-2 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <Label className="text-white text-left m-2">Email</Label>
            <Input
              type="email"
              placeholder="Enter Your email"
              value={email}
              name="email"
              className="rounded p-2 w-full"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <Label className="text-white text-left m-2">Phone</Label>
            <Input
              type="number"
              placeholder="Enter Your phone"
              value={phone}
              name="phone"
              className="rounded p-2 w-full"
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
              className="rounded p-2 w-full"
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-4">
            <p className="flex justify-center font-serif mb-2 text-white">
              Already have an account? 
              <Link to="/login" className="text-blue-400 cursor-pointer underline ml-2">Login</Link>
            </p>
          </div>

          <div className="flex justify-center items-center gap-5 w-full">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-serif font-bold p-3 rounded-lg shadow-lg w-full"
              >
                Signup
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-green-600 hover:bg-green-500 text-white font-serif font-bold p-3 rounded-lg shadow-lg w-full"
                onClick={(e) => {
                  e.preventDefault();
                  googleSignIn();
                }}
              >
                SignIn with Google
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </form>
  );
}

export default Signup;
