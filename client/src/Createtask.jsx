import React from 'react';
import { useForm } from "react-hook-form";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material';


export default function Createtask(props) {

    //color schemes
    const theme = createTheme({
        palette: {
          primary: {
            main: '#144272',
          }
        },
      });

    let post_add = 'http://localhost:3001/task';

    //form stuff
    const{
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    function onSubmit(data){
        //senddata sends to server
        props.dataSend(data,post_add);
        reset();
    };

    return(
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                type="text" 
                name="task" 
                autoComplete='off'
                placeholder='Enter New Task...'
                {...register("task", {
                    required: true
                })} />
                <Button variant="contained" type="submit" color = "primary" endIcon={<AddTaskIcon />}>
                    Add
                </Button>
            </form>
        </ThemeProvider>
    )
}
