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
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setfullName] = useState('');
  const [phone, setPhone] = useState('');
  const {user}= useSelector(state=>state.user);
  const dispatch= useDispatch();

  

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring the event target

    // Update the state based on the input name
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'fullName') {
      setfullName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

useEffect(()=>{
  if(user){
    navigate("/")
  }
},[user])

  const handleSubmit = async (e) => {
    e.preventDefault();
try{
  console.log(fullName,email,phone,password);
  const result= await fetch('http://localhost:3000/signup', 
    {
      method:'POST',
      body:JSON.stringify({fullName,email,phone,password}),
      headers:{
        'Content-Type':'application/json'
      },
    });
    const data= await result.json();


    if(data){
      localStorage.setItem('user',JSON.stringify(data));
      toast.success("Signup Successfull");
      navigate('/login');


}
else{
  toast.error("Signup Failed");
}
}
catch(err){
  console.log(err);
}
  };



  const googleSubmit=async( userToSave)=>{
    const result = await fetch('http://localhost:3000/firebaseuser',{
      method:'POST',
      body:JSON.stringify({
         fullName:userToSave.fullName,
        email:userToSave.email,
        firebaseId:userToSave.firebaseId}),
      headers:{
        "content-Type":"application/json"
      },
      

    })
    console.log("firebase result",result)
    const data= await result.json();
    console.log("data from firebase",data);
    if(data){
      dispatch(login({id: data.user._id,name:data.user.fullName}))
      navigate("/")
      toast.success("SignIn successfully");
    }
  }

  const googleSignIn= async()=>{
    signInWithPopup(auth,provider).then(async(result)=>{
      const user= result.user;
      console.log(user);
      const userToSave=  {
        email: user.email,
        fullName: user.displayName,
        firebaseId: user.uid
      }

     await googleSubmit(userToSave);

      
      // console.log("data from firebase",userToSave);

    })
  
  }

  return (
    <form method="post" className="w-full" onSubmit={handleSubmit}>
      <div className="bg-gray-800 min-h-screen flex justify-center items-center ">
        <div className="bg-custom-gradient2 w-full max-w-md rounded-xl text-center flex flex-col p-6">
          <h1 className="text-white font-serif text-3xl mb-4">Signup for new user</h1>

          <div className="flex flex-col mb-4">
            <Label className="text-white text-left m-2">FullName</Label>
            <Input
              type="text"
              placeholder="Enter Your username"
              value={fullName}
              name="fullName"
              className="rounded"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <Label className="text-white text-left m-2">Email</Label>
            <Input
              type="email"
              placeholder="Enter Your email"
              value={email}
              name="email"
              className="rounded"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <Label className="text-white text-left m-2">Phone</Label>
            <Input
              type="number"
              placeholder="Enter Your phone"
              value={phone}
              name="phone"
              className="rounded"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4 ">
            <Label className="text-white text-left m-2">Password</Label>
            <Input
              type="password"
              placeholder="Enter Your password"
              value={password}
              name="password"
              className="rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <p className=" flex justify-center font-serif mb-2">
                Already have an account? <Link to="/login" className=" text-blue-700 cursor-pointer underline flex justify-end ml-2">Login</Link>
              </p>
            </div>
          </div>
       
          <div className=" flex justify-center align-middle items-center gap-5">
            <Button
              className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center items-center text-lg hover:scale-90 "
             
            >
              Signup
            </Button>
            
            <Button
              className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center items-center text-lg hover:scale-90 "
             onClick={(e)=>{
              e.preventDefault();
              googleSignIn();
             }
             }
            >
              SignIn with Google
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
