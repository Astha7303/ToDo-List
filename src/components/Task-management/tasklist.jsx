import React, { useContext, useEffect, useState } from 'react';
import './tasklist.css';
import { Form, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ListItem, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/material/Button';



const Tasklist = () => {

  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [status, setStatus] = useState('ToDo');
  const [isediting, setIsEditing] = useState(false);
  const [isedititem, setIsEditItem] = useState(null);
  const [btn, setBtn] = useState('edit');
  const [activeItem, setActiveItem] = useState(null);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const navigate = useNavigate()
  const statusdata = [
    { statuss: 'ToDo', id: 1 },
    { statuss: 'In Progress', id: 2 },
    { statuss: 'Completed', id: 3 },
  ];
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItemList(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(itemList));
  }, [itemList]);

  const addItem = () => {
    if (item.trim() !== '') {
      setItemList([...itemList, { id: itemList.length + 1, text: item.trim(), status }]);
      setItem('');
    }
  };

  const handleUpdate = (id) => {
    const matchTodo = itemList.find((e) => e.id === id);
    setIsEditing(true);
    setItem(matchTodo.text);
    setIsEditItem(id);
  };

  const handleSave = () => {
    if (isediting) {
      setBtn('edit');
    }
    setIsEditing(false);
    setItemList(itemList.map((element) => (element.id === isedititem ? { ...element, text: item } : element)));
    setItem('');
    setIsEditItem(null);
  };

  const removeItem = (id) => {
    setItemList(itemList.filter((elem) => elem.id !== id));
  };

  const changeStatus = (e) => {
    const newStatus = e.target.value;
    const updatedItemList = itemList.map((item) => (item.id === activeItem.id ? { ...item, status: newStatus } : item));
    setItemList(updatedItemList);
    setActiveItem(null);
  };

  const onDragStart = (e, dataId) => {
    e.dataTransfer.setData('text/plain', dataId);
    setDraggedItemId(dataId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newStatus) => {
    e.preventDefault();
    const dataId = e.dataTransfer.getData('text/plain');
    if (dataId) {
      const updatedItemList = itemList.map(item => (item.id === parseInt(dataId, 10) ? { ...item, status: newStatus } : item));
      setItemList(updatedItemList);
    }
  };
  const handlelogout = () => {
    localStorage.clear();
    localStorage.setItem('userLoggedIn', false)
    navigate('/');
  }

  const [light, setLight] = useState(false);

  const handletheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  const themee = createTheme({
    palette: {
      mode,
    },
  })

  return (

    <ThemeProvider theme={themee}>
      <Box className="App" sx={{ backgroundColor: 'background.default' }}>
        <IconButton>hello</IconButton>
        <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>
        <Button sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }} onClick={handletheme} color="inherit">
          {themee.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </Button>

        <Button onClick={handlelogout} className='todo-btn'>LogOut</Button>
        <Box className="title" sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }} >Task Management</Box>
        <Form className="todo-form">
          <TextField
            type="text"
            placeholder="Type Task Name"
            onBlur={(e) => e.target.placeholder = "Type Task Name"}
            onFocus={(e) => e.target.placeholder = ""}
            className="todo-input"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <Button
            type="button"
            className="todo-btn"
            onClick={addItem}
          >
            Add Task
          </Button>
        </Form>

        <Box className="divofstatus" sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
          {statusdata.map((s) => {
            const itemsForStatus = itemList.filter(item => item.status === s.statuss);
            return (
              <Box key={s.id} className="status-section">
                <Box className="status-title" sx={{
                  bgcolor: 'background.default',
                  color: 'text.primary',
                }}> {s.statuss}</Box>
                <Box sx={{
                  bgcolor: 'background.default',
                  color: 'text.primary',
                }}
                  className="droparea"
                  onDrop={(e) => onDrop(e, s.statuss)}
                  onDragOver={onDragOver}
                >
                  {itemsForStatus.length === 0 ? 'No Items' : (
                    <Box sx={{
                      bgcolor: 'background.default',
                      color: 'text.primary',
                    }}>
                      {itemsForStatus.map((data) => (
                        <ListItem
                          key={data.id}
                          className="todo-item"
                          draggable
                          onDragStart={(e) => onDragStart(e, data.id)}
                          sx={{
                            bgcolor: 'background.default',
                            color: 'text.primary',
                          }}
                        >
                          {data.text}
                          <Box className='buttons-div' sx={{
                            bgcolor: 'background.default',
                            color: 'text.primary',
                          }}>
                            <Button onClick={() => removeItem(data.id)} className="insidetodobtn">Delete Task</Button>
                            <Button
                              onClick={isediting && isedititem === data.id ? handleSave : () => handleUpdate(data.id)}
                              className="insidetodobtn"
                            >
                              {isediting && isedititem === data.id ? 'Save' : 'Edit'}
                            </Button>
                            <Select
                              sx={{
                                bgcolor: 'background.default',
                                color: 'text.primary',
                              }}
                              name="dropdown"
                              defaultValue={data.status}
                              onChange={changeStatus}
                              onClick={() => setActiveItem(data)}
                              className="insidetodobtn"
                            >
                              {statusdata.map((status, index) => (
                                <MenuItem key={index} value={status.statuss}>{status.statuss}</MenuItem>
                              ))}
                            </Select>
                          </Box>
                        </ListItem>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </ThemeProvider>

  );
};

export default Tasklist;
