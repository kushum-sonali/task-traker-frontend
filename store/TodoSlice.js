// todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Async thunk to fetch todos from the backend
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (createdBy) => {
  console.log(createdBy);
  const response = await fetch(`https://task-traker-backend.vercel.app//tasks/${createdBy}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("data from ",data)
return data.result; // Assuming the backend sends the data as an array of todosid
});

// Async thunk to delete a todo from the backend
export const deleteTodoFromDB = createAsyncThunk("todos/deleteTodo", async (id) => {
  await fetch(`https://task-traker-backend.vercel.app/deletetask/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return id; // Return the ID to update state after deletion
});

// Async thunk to add a todo to the backend
export const addTodoToDB = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await fetch("https://task-traker-backend.vercel.app/addtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  toast.success("task added successfully")
  

  console.log("todo data", data)

  return data; // Return the saved todo from backend including the unique ID

});

// Async thunk to update a todo on the backend
export const updateTodoInDB = createAsyncThunk("todos/updateTodo", async ({ id, title, desc }) => {
  const response = await fetch(`https://task-traker-backend.vercel.app/updatetask/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      desc: desc,
   }), // Ensure both title and desc are sent in the body
  });
  const data = await response.json();
  console.log("data from backend",data);

  // if (!response.ok) {
  //   throw new Error(data.message || 'Failed to update the task');
  // }

  return { id, title: data.task.title, desc: data.task.desc }; // Return the updated task
});
export const completedTodoInDb=createAsyncThunk("todos/completedTodo",async(id)=>{
  const response= await fetch(`https://task-traker-backend.vercel.app/task/completed/${id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
  });
  const data=await response.json();
  console.log("completed data",data)
  return data.task;
});

 

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({ ...action.payload });
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      console.log("action payload",action.payload);
      if (index !== -1) {
        state.todoList[index].completed = action.payload.completed;
      }
    },
    updateTodo: 
    (state, action) => {
      const { id, title, desc } = action.payload;
      const todo = state.todoList.find((todo) => todo._id === id);
      if (todo) {
        todo.title = title;
        todo.desc = desc;
      }
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter((todo) => todo._id !== action.payload);
  
    },


   

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todoList = action.payload; // Update state with fetched todos
      })
      .addCase(deleteTodoFromDB.fulfilled, (state, action) => {
        state.todoList = state.todoList.filter((todo) => todo._id !== action.payload); // Correct filtering logic
      })
      .addCase(addTodoToDB.fulfilled, (state, action) => {
        // state.todoList.push(action.payload); 
        state.todoList=[...state.todoList, action.payload]
      })
      .addCase(updateTodoInDB.fulfilled, (state, action) => {
        var todo = state.todoList.find((todo) => todo._id === action.payload.id);
        if (todo) {
           // Update the todo text in the state
          todo.title = action.payload.title;
          todo.desc = action.payload.desc;
        }
      })
      .addCase(completedTodoInDb.fulfilled,(state,action)=>{  // Add a new case for the completedTodoInDb thunk
        console.log(state.todoList);
        const todoList= JSON.parse(JSON.stringify(state.todoList));
        console.log("todoList",todoList);
        const todo = todoList.find((todo) => todo._id == action.payload._id);
       
        console.log("action",action.payload) // Find the todo by ID
        console.log("todo",todo);
        if (todo) {
          todo.completed= action.payload.completed; // Update the completed state
          state.todoList=todoList
        }
      });

  },
});

export const { toggleComplete,addTodo,deleteTodo,updateTodo} = todoSlice.actions;
export default todoSlice.reducer;
