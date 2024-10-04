import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { logout } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Home() {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  console.log("home data",user);

  // useEffect(()=>{
  //   if(!user){
  //    navigate('/login')
  //   }
  // },[user])

  return (
    <div className="bg-custom-gradient h-screen w-full text-white flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center p-5 w-full">
        <h1 className="text-2xl font-semibold">Hey, {user?.name || 'Guest'}!</h1>
        <Button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 
          transition duration-300 ease-in-out transform hover:scale-105 h-18 w-32"
          onClick={() => {
            dispatch(logout());
            toast.success('Logged out successfully!');
            navigate('/login');
            
            console.log('Logging out...');
          }}
        >
          Logout
        </Button>
      </div>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Text Prompt */}
        <motion.div
          className="text-5xl font-bold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Your Todo App
        </motion.div>

        {/* Buttons with Animation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="shadow-lg"
          >
            <Button
              className="bg-blue-500 h-28 w-60 text-white text-xl font-bold rounded-lg shadow-lg"
              onClick={() => navigate('/addtodo')}
            >
              Create Todo
            </Button>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="shadow-lg"
          >
            <Button
              className="bg-green-500 h-28 w-60 text-white text-xl font-bold rounded-lg shadow-lg"
              onClick={() => navigate('/completed')}
            >
              Completed Todo
            </Button>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="shadow-lg"
          >
            <Button
              className="bg-yellow-500 h-28 w-60 text-white text-xl font-bold rounded-lg shadow-lg"
              onClick={() => navigate('/incompleted')}
            >
              Incomplete Todo
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
