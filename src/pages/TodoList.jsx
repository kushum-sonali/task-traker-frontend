import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodoFromDB, updateTodoInDB, toggleComplete ,completedTodoInDb} from "/store/todoSlice"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";

function TodoList() {
  const dispatch = useDispatch();
  const todolist = useSelector((state) => state.todo.todoList);
  console.log("todolist",todolist)
  const {user}= useSelector(state=> state.user);
  const navigate = useNavigate();

  const [editableTodo_id, setEditableTodo_id] = useState(null);
  const [todotitle, setTodoTitle] = useState(""); 
  const [tododesc, setTodoDesc] = useState("");
  const [completed, setCompleted] = useState(null);

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    if(user.id)
    dispatch(fetchTodos(user.id));
  }, [user]);

  // Handle toggling todo complete state
  const handleToggle = (todoid) => {
    console.log("This todo has this ID:", todoid);
    dispatch(completedTodoInDb(todoid))
      
        // console.log("update todo")
      
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };


  // Handle editing a todo
  const handleEdit = (todoid) => {
    if (editableTodo_id === todoid) {
      // Dispatch the update thunk with both title and desc fields
      dispatch(updateTodoInDB({ 
        id: todoid, 
        title: todotitle,  // Assuming todoMsg refers to the title
        desc: tododesc  // Ensure the description is also passed
      }));
      // console.log("dispatched data",title,desc);
      setEditableTodo_id(null); // Reset editable state
    } else {
      setEditableTodo_id(todoid); // Set the current todo to be editable
      setTodoTitle(todotitle); // Pre-fill the input with the current todo's title
      setTodoDesc(tododesc); // Pre-fill the input with the current todo's description
    }
  };

  // Handle deleting a todo
  const handleDelete = (_id) => {
    dispatch(deleteTodoFromDB(_id));
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-2xl text-white font-bold mb-4">Your Task List 📃</h1>
      <button
        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => navigate("/addtodo")}
      >
        Add New Task 📝
      </button>

      <ul className="space-y-4">
        {todolist?.map((todo) => (
          <li
            key={todo._id}
            className="p-4 bg-gray-800 rounded flex justify-between items-center"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                
                checked={todo.completed}
                className="mr-4 cursor-pointer "
                onChange={() => handleToggle(todo._id)}

              />
              {/* {console.log("input todo",todo.completed)} */}
              <span
                className={`text-white ${todo.completed ? "line-through text-gray-500" : ""}`}
              >
                {editableTodo_id === todo._id ? (
                  <div>
                  <input
                    type="text"
                    className="bg-transparent border-b border-white outline-none text-white"
                    value={todotitle}
                    onChange={(e) =>  setTodoTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="bg-transparent border-b border-white outline-none text-white"
                    value={tododesc}  
                    onChange={(e) => setTodoDesc(e.target.value)}
                  />
                  </div>
                ) : (
                  <>
                    <p className="font-bold">{todo.title}</p>
                    <p className="text-sm">{todo.desc}</p>
                    <p className="text-xs">
                      {todo.date} {todo.time}
                    </p>
                  </>
                )}
              </span>
            </div>
            <div className="flex space-x-2">
              {console.log("htlm",todo)}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
               
                onClick={() => handleEdit(todo._id)}
                disabled={todo.completed}
              >
                {editableTodo_id === todo._id ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
