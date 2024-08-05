import { createContext, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import Tasklist from './components/Task-management/tasklist';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Link,
  Route,
  Router,
  Navigate,
  useNavigate,
  Outlet,
  redirect,
} from "react-router-dom";
export const ExampleContext = createContext();
function App() {

   
   // const navigate = useNavigate()
   
  //  const router = createBrowserRouter([
  //    // {
  //     //   path: '/',
  //   //   element: <App />,
  //   //   children: [
  //   {
  //     path: "/",
  //     element: <Login />,
  //     loader: () => {
  //       if (localStorage.getItem('logindata')) {
  //         // navigate('/')
  //         throw redirect("/tasklist");
  //       }
  //       return null;
  //     }
  //   },
  //   {
  //     path: "/tasklist",
  //     element: <Tasklist />,
  //     loader: () => {
  //       if (!localStorage.getItem('logindata')) {
  //         // navigate('/')
  //         throw redirect("/");
  //       }

  //       return null;
  //     },
  //   }
  //   // ]}
  // ]);



  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);

  //Function to add item to the list
  const addItem = () => {
    if (item.trim() !== '') {
      setItemList([...itemList, item]);
      setItem(''); // Clear input after adding item
    }
  };

  //Function to remove item from the list
  const removeItem = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);
  };
  const [color, setcolor] = useState('green')
  return (
    <ExampleContext.Provider value={{ appcolor: color }}>

      <div className="App">
     <h1 className="title">Todo List</h1>
      <form className='todo-form'>
         <input
          type='text'
         placeholder='Add item'
           className='todo-input'
           value={item}
           onChange={(e) => setItem(e.target.value)}
         />
         <button
          type='button'
          className='todo-btn'
          onClick={addItem}
        >
          Add Todo
        </button>
      </form>
      <div className='list-todo'>
        <h2>List:</h2>
        {itemList.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {itemList.map((data, index) => (
              <li key={index} className='item-todo'>
                {data}
                <MdDeleteForever
                  onClick={() => removeItem(index)}
                  className='delete-btn'
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      
    </div>
      {/* <RouterProvider router={router} /> */}

    </ExampleContext.Provider>
  );
}

export default App;
