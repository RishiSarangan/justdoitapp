import React from 'react';
import axios from 'axios';
import Createtask from "./Createtask";
import Footer from "./Footer";
import Header from "./Header";
//UI elements import
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';
import ArchiveIcon from '@mui/icons-material/Archive';


export default function App() {

  //color scheme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#144272',
      }
    },
  });
  
  //axios get quote function
  const [quote, setQuote] = React.useState({quote: "simply"});
  const [data, setData] = React.useState([{}]);
  let quote_url = 'http://localhost:3001/quote';
  let get_url = 'http://localhost:3001/task';
  //axios post url
  let post_delete = 'http://localhost:3001/delete';

  function getData(){
    axios.all([
      axios.get(quote_url), 
      axios.get(get_url)
    ])
    .then(axios.spread((obj1, obj2) => {
      setQuote(obj1.data);
      setData(obj2.data);
      console.log(quote.quote);
    }));
  }

  //axios post FUNCTION
  function sendData(reactData,path){
      axios.post(path, reactData)
       .then(res => console.log(res))
       .catch(err => console.log(err.response.data))
    }

  //deleteData
  function deleteData(event){
    const temp = {
      id: event.target.value
    }
    sendData(temp,post_delete);
  }

  //final return statement
  return (
    <div className="App">
      <Header 
        quote = {quote.quote}
      />
      {/* {console.log(quote)} */}
      <div className = "box" id = "rectangle1" >
          <h1 id = "heading">What do you wanna do today?</h1>
          <Createtask 
            dataSend = {sendData}
          />
      </div>
      <ThemeProvider theme={theme}>
        <div className = "box" id = "rectangle3">
          <h1 id = "heading2">Other Stuff you gotta do</h1>
          <div className = "navbutton">
            <Button  variant="contained" type="submit" color = "primary" endIcon={<HomeIcon />}>
            </Button>
            <Button variant="contained" type="submit" color = "primary" endIcon={<WorkIcon />}>
            </Button>
            <Button variant="contained" type="submit" color = "primary" endIcon={<ArchiveIcon />}>
            </Button>
          </div>
        </div>
      </ThemeProvider>
      <div className = "box" id ="rectangle2">
        {getData()}
        {data.map((t,i) => (
          <div className='item'>
            <Checkbox id = "checks" value = {t._id} onChange={deleteData}/>
            <p key = {i}>{t.name}</p>
          </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}



