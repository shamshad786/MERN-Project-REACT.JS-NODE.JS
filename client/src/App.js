import React,{createContext,useReducer} from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Switch} from 'react-router-dom' 
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import { reducer,initialState } from './reducer/UseReducer';


export const UserContext =  createContext();

const App = () =>{

  const [state, dispatch] = useReducer(reducer, initialState)
  return(

   
  
    <>
    <UserContext.Provider value = {{state,dispatch}}>
      <BrowserRouter>
      
       <Navbar/>
      
       <Switch>
         <Route path='/'exact component={Home} />
         <Route path='/about' component={About} />
         <Route path='/contact' component={Contact}/>
         <Route path='/login' component ={Login}/>
         <Route path='/signup' component={Signup}/>
         <Route path= '/logout' component={Logout} />
         <Route component={ErrorPage}/>
         
       </Switch>
       
       </BrowserRouter>
       </UserContext.Provider>
       
       
    </>
  )
}

export default  App;
