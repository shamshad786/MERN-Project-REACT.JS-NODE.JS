import React, {useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from '../App' // useContext ke ander ContextAPI dalna padta hai tabhi uski values get hongi 'state,dispatch' 

const Login = () => {

    const {state,dispatch} = useContext(UserContext) // is useContext ka prover values ko get karne ke liye useContyext ki jarurat padti hai

    const history =  useHistory();
    const [email,setEmail] = useState('');
    const [password,SetPassword]= useState('');

    const onChangeData = (e) =>{
        setEmail(e.target.value)
    }


    const loginUser = async (e)=>{
        e.preventDefault();

     const res = await fetch('/signin',{ // yaha server ke 'auth.js' ke file se as api us path ke data ko get kiya hai
            method : "POST",
            headers : {
                    "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });
        const data = await res.json();
        console.log(data);
        if(res.status === 400 || !data){
            window.alert('Invalid Credentials')
        }else{
            dispatch({type:'USER',payload:true})// ye dispatch me types aur payload define kiya hai, login me true kiya taki navbar.js me state true milne pr logout button show naa kare
            window.alert('Login Successful')
            history.push('/');
        }
    }
    
    return (
        <>
            <section className='login'>
                   <div className='container mt-5 shadow p-3 mb-5 bg-body rounded '>
                   
                        <div className='signup-content'>
                        <div className='login-image col-4'>
                                    <figure>
                                    <img src='../images/login.svg' alt='login pic'/>
                                        </figure> 
                                    </div>
                                <div className= 'signup-form col-6'>
                                    <h2 className='form-title mb-5' style={{fontWeight:"bold"}}>User Login</h2>
                                    <form method="POST">
                                    
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label"><i className="zmdi zmdi-email"></i> E-mail</label>
                                        <input  type="email" name='email' id='email' autoComplete='off' placeholder='Your Email' className="form-control" value={email} onChange={onChangeData}/>
                                    </div>

                                    
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"><i className="zmdi zmdi-lock"></i> Password</label>
                                                                                                                                                                        {/* direct 'SetPassword' ke updated data ko inner function call kar ke likh ke data get kar sakte hai */}
                                        <input type="password" name='password' className="form-control" autoComplete="off" placeholder='enter your password'  id="password" value={password} onChange={(e)=> SetPassword(e.target.value)} /> 
                                    </div>

                                    <div className='form-group form-button'>
                                        <input type='submit' name='signin' id='signin' className='btn btn-primary' value='Log In' onClick={loginUser}/> 
                                        <Link to='/signup' className='signin-image-link'>Create New Account</Link>
                                    </div>

                                    </form>
                                    </div>
                                    
                                
                        </div>
                   </div>
               </section>
        </>
    )
}

export default Login
