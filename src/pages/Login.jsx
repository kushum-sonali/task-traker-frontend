import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {login} from '/store/userSlice'
import { Label } from '@/src/components/ui/label'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'email') {
      setEmail(value);
    }
    if (name == 'password') {
      setPassword(value);
    }
  }

  useEffect(()=>{
    if(user){
      navigate('/');
    }
   
  },[user])

  const handleSubmit = async (e) => { 
    e.preventDefault();
 try{
  console.log(email,password);
  const result=await fetch('http://localhost:3000/login',{
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{
      'content-type':'application/json'
    }
  })
  console.log(result);
  const data=await result.json();
  if(data){
    console.log("data before dispatch", data)
    dispatch(login({id:data.data.user_id,name:data.data.userFind.fullName}));
    console.log("data after dispatch", data.data.user_id, data.data.userFind)
    toast.success("Login Successfull");
    // navigate('/');
  }
  else{
    toast.error("Login Failed");

  }
}
  catch(err){
    console.log(err);
  }
}


console.log("user login",user)

  return (
    
    <form method="post" className="w-full" onSubmit={handleSubmit}>
    <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
      <div className="bg-custom-gradient2 w-full max-w-md rounded-xl text-center flex flex-col p-6">
        <h1 className="text-white font-serif text-3xl mb-4">Login for existing user!</h1>

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
                              Do You Have An Account?
                           <Link to="/signup" className=" text-blue-700 cursor-pointer underline flex justify-end ml-2">Register account!</Link>
                           {/* <Link to="/forget" className=" text-blue-700 cursor-pointer underline flex justify-end ml-2">forget password</Link> */}

                            </p>

                        </div>
                    </div>
         <div className=" flex justify-center align-middle items-center">
        <Button
          className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center mr-4 items-center text-lg hover:scale-90 "
         
        >
        Login
        </Button>
        <Button
            className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center items-center  text-lg hover:scale-90 "
            onClick={(e) => {
              e.preventDefault();
              handleGoogleSignIn();
            }}
          >
            SignIn with Google
          </Button>
        </div>
      </div>
    </div>
  </form>
  


  )
}

export default Login