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


export const UserContext =  createContext(); // contextApi ki jarurat isliye hai taki dala values ko jis component pr chahe send kar sake ye ek Provider deta h isme values ko send kar sakte hai jisko niche use kiya hai

const App = () =>{

  const [state, dispatch] = useReducer(reducer, initialState)// is reducer jarurat isliye hai taki state ke update 'true/false' hone pr logout/ login/ register button ko toggle kar sake  then is 'reducer, initialState' ke functions ko UseReducer.js ke file me define kiya hai
  return(

   
  // 'UserContext.Provider value = {{state,dispatch}}'  is prover ki values ko 'useContext' ko use kar ke uske state values change kar sake 'state,dispatch' ye 2 values reducer se milta hai 'dispatch' update state hai aur 'state' current state hai hum dispatch ko hi true ya false booleans change karte hai aur state automatic dispatch ke values ko get kar leta hai
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
