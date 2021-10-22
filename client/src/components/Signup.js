import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {
    const history = useHistory();
    const [user,setUser] = useState({
        name:'', email:'',phone:'',work:'',password:'',cpassword:'' });
 
        let name,value;
        const handleInputs = (e)=>{
            //console.log(e)
            name = e.target.name;
            value = e.target.value;

            setUser({...user, [name]:value}) //ye uper variable jo name ,value hai uske ander ke saare data ko get kar liya hai
        } 

        const postData = async(e)=>{
                e.preventDefault();

              const {name, email, phone, work, password, cpassword}= user;

              const res = await fetch('/register',{
                
                method:'POST',
                  headers:{
                      "Content-Type" : "application/json"
                  },
                  body: JSON.stringify({
                    name, email, work, phone, password, cpassword
                  })
              })

              const data = await res.json();

              console.log(data);

              if(res.status === 423){

                window.alert('email already exist');

              }else if(res.status === 422 || !data){
                  window.alert('All fields are required');
                  console.log("All fields are required");
              }else if(res.status === 424){
                    window.alert('password not matching');
              } else {
                window.alert('Registration Successful');
                console.log("Registration Successful");
                history.push('/login');
              }



        }


    return (
        <>
               <section className='signup'>
                   <div className='container mt-5 shadow p-3 mb-5 bg-body rounded '>
                        <div className='signup-content'>
                                <div className= 'signup-form col-6'>
                                    <h2 className='form-title mb-3' style={{fontWeight:"bold"}}>User Registration</h2>
                                    <form method='POST'>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label"><i className="zmdi zmdi-account"></i> Name </label>
                                        <input  type="text" name='name' id='name' autoComplete='off' placeholder='Your Name' className="form-control" required={true} value={user.name} onChange={handleInputs}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label"><i className="zmdi zmdi-email"></i> E-mail</label>
                                        <input  type="email" name='email' id='email' autoComplete='off' placeholder='Your Email' className="form-control" required={true} value={user.email} onChange={handleInputs}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label"><i className="zmdi zmdi-phone-in-talk"></i> Phone Number</label>
                                        <input  type="number" name='phone' id='phone' autoComplete='off' placeholder='Your phone number' className="form-control" required={true} value={user.phone} onChange={handleInputs}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="work" className="form-label"><i className="zmdi zmdi-laptop-mac"></i> Work</label>
                                        <input  type="text" name='work' id='work' autoComplete='off' placeholder='Your profession' className="form-control" required={true} value={user.work} onChange={handleInputs}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"><i className="zmdi zmdi-lock"></i> Password</label>
                                        <input type="password" className="form-control" placeholder='enter your password' name='password' id="password" required={true} value={user.password} onChange={handleInputs}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="cpassword" className="form-label"><i className="zmdi zmdi-smartphone-portrait-lock"></i> Confirm Password</label>
                                        <input type="password" className="form-control" placeholder='confirm your password' name='cpassword' id="cpassword" required={true} value={user.cpassword} onChange={handleInputs}/>
                                    </div>

                                    <div className='form-group form-button'>
                                        <input type='submit' name='signup' id='signup' className='btn btn-primary' value='register' onClick={postData}/> 
                                        <Link to='/login' className='signup-image-link'>I'm already register</Link>
                                    </div>

                                    </form>
                                    </div>
                                    <div className='signup-image col-6 '>
                                    <figure>
                                        <img className='img-fluid' src='../images/register.svg' alt='register pic'/>
                                        </figure> 
                                       
                                    </div>
                                
                        </div>
                   </div>
               </section>
        </>
    )
}

export default Signup
