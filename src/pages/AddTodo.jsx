import React, { useEffect } from 'react'
import {Input} from '@/components/ui/input';
import {Button}from '@/components/ui/button';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Textarea } from '@/src/components/ui/textarea';
import { addTodoToDB } from '../../store/TodoSlice';

const getCurrentDate = () => {
  const current = new Date();
  const offset = current.getTimezoneOffset() * 60000;
  const istDate = new Date(current.getTime() - offset + 19800000); // Adjusting for IST (+5:30)
  return istDate.toISOString().split('T')[0];
};

const getCurrentTime = () => {
  const current = new Date();
  const offset = current.getTimezoneOffset() * 60000;
  const istDate = new Date(current.getTime() - offset + 19800000); // Adjusting for IST (+5:30)
  return istDate.toTimeString().split(' ')[0].substring(0, 5);
};

function AddTodo() {
const [title,setTitle]=useState('');
const [date, setDate] = useState(getCurrentDate()); // Default to current date
  const [time, setTime] = useState(getCurrentTime());
const [desc,setDesc]=useState('');

const navigate=useNavigate();
const dispatch=useDispatch();
const todos=useSelector(state=>state.todos);
const {user}= useSelector(state=> state.user);
console.log("addtodo user id",user);



  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name == 'title') {
      setTitle(value);
    }
    if (name == 'date') {
      setDate(value);
    }
    if (name == 'time') {
      setTime(value);
    }
    if (name == 'desc') {
      setDesc(value);
    }
  }

const handleSubmit= (e)=>{
  e.preventDefault();
  dispatch(addTodoToDB ({
    title,date,time,desc,createdBy:user.id
  }));
  setTitle("");
  setDate("");
  setTime("");
  setDesc("");

  navigate("/todolist");
  
}

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("form filled", title, date, time, desc);
    
  //   // Extract only the `id` part of `user`
  //   const result = await fetch('http://https://task-traker-backend.vercel.app/addtask', {
  //     method: 'POST',
  //     body: JSON.stringify({ title, date, time, desc, createdBy: user.id }), // Pass only `user.id`
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   });
  
  //   console.log("result", result);
  //   const data = await result.json();
  //   console.log("backend data", data);
  
  //   if (data) {
  //     dispatch(addTodo(data));
  //     console.log("show data", title, date, time, desc);
  //     toast.success("Todo Added");
  //     console.log("Todo Added");
  //     setTitle('');
  //     setDate('');
  //     setTime('');
  //     setDesc('');
  //     navigate('/todolist');
  //   } else {
  //     console.log("Todo not added");
  //   }
  // }
  

  return (
   <>
    <div className='flex flex-col items-center justify-center align-middle h-screen w-screen bg-slate-700 gap-9'>
    <h1 className='text-4xl font-bold text-white'>Add Your Task 📝</h1>
    <div className='flex flex-col items-center justify-center align-middle h-1/2 w-1/2 border-double border-4 border-white-600 rounded-xl'>
 
    <form className='  flex flex-col items-center justify-center ' onSubmit={handleSubmit}>
      <Input type='text' placeholder='Title' className="mt-5" 
      name="title"
      value={title}
      onChange={handleChange}
     
      />
      <Input type='date' placeholder='Date' className="mt-5"
      name="date"
      value={date}
      onChange={handleChange}
      />
      <Input type='time' placeholder='Time' className="mt-5"
      name="time"
      value={time}
      onChange={handleChange}
      />
      <Textarea type='text' placeholder='Description' className="mt-5"
      name="desc"
      value={desc}
      onChange={handleChange}
      />
      <Button className="mt-5 w-full">Add Todo</Button>
    </form>
    </div>
    </div>

    
   </>
    
  )
}

export default AddTodo;