import React,{useEffect,useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {useHistory} from 'react-router-dom'
import 'react-tabs/style/react-tabs.css';

const About = () =>{
 
   const [userData, setUserData] = useState({});


   const history = useHistory();
   const callAboutPage = async () =>{
      try {
            const res = await fetch('/about',{ // yaha server ke 'auth.js' ke file se as api us path ke data ko get kiya hai
               method:'GET',
               headers:{
                  Accept: 'application/json',// ye liye likha hai taki cookies ko to accept kar le
                  "Content-Type": "application/json"
               },
               credentials: "include" //ye isliye likha hai taki jo cookie humne generate kiya hai wo hamare backend tak pahuch jaaye, agar hume cookies ya token backend me send karna ho to humne Credentials: "include" likhna hi padega
            });
               const data = await res.json();

               console.log(data);
               setUserData(data); // yaha get kiya data direct use nahi kar sakte uske pehle state me get karna hoga isliye updated state me data ko daal diya taki current state 'userData' ko use kar data ko get kar sake

               if(!res.status === 200){
                  throw new Error ("unauthorized token");
                 
               }

      }catch(err){
         console.log(err)
         window.alert('You Need To Login For Verify Your Token')
         history.push('/login');
      }
   }

   useEffect(() => {
      callAboutPage();
       //  eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

    return (
        <>
         <div className ='container shadow-sm p-3 mb-5 bg-body rounded '>
            <form method='GET'>
                <div className='row'>
                    <div className='col-md-4 hover-rotate'>
                        {/* <img className='rounded ' src='../images/sam.jpg' height='150' width='150' alt=''/> */}
                        <img className='rounded ' src={userData.name === 'Shamshad Hussain' ? '../images/sam.jpg'  : '../images/user.png'} height='250' width='250' alt='profile'/>
                    </div>
                    <div className='col-md-6'>
                        <div className='profile-head' >
                            <h5 className='gradient-text' style={{fontWeight:"bold"}}>{userData.name}</h5>
                            <h6>{userData.work}</h6>
                            <p className='profile-rating mt-3 mb-5 text-muted'>RANKING: <span>8/10</span></p>

                            {/* <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active " id='home-tab' data-bs-toggle='tab' aria-current="page" href="#home" role='tab' type="button" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link " id='profile-tab' data-bs-toggle='tab' aria-current="page" href="#profile" role='tab' type="button" aria-selected="false">Timeline</a>
                                </li>
                               
                            </ul> */}

                            {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">About</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Timeline</button>
                                </li>
                            </ul> */}
                            
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <input type='text' name='btnAddMore' className='btn btn-primary animated-border-button' value='Edit Profile'/>
                    </div>
                </div>
            <div className='row '>
            {/* left side social links */}

            <div className='col-md-4'>
                <div className='profile-work'>
                    <p>Social Links</p>
                    <a href='https://www.facebook.com/profile.php?id=100006385997898' target='_blank' rel="noreferrer">Facebook</a> <br/>
                    <a href='https://www.facebook.com/profile.php?id=100006385997898' target='_blank' rel="noreferrer">Instagram</a> <br/>
                    <a href='https://www.facebook.com/profile.php?id=100006385997898' target='_blank' rel="noreferrer">GitHub</a> <br/>
                    <a href='https://www.facebook.com/profile.php?id=100006385997898' target='_blank' rel="noreferrer">LinkedIn</a> <br/>
                </div>
            </div>

            {/* right side data */}
           
            <div className='col-md-8 px-5 about-info '>
            <Tabs>
                            <TabList>
                            <Tab>About</Tab>            
                            <Tab>Timeline</Tab>
                                            
                            </TabList>
                            
                            
            <TabPanel>
            <div className='tab-content profile-tab' id='myTabContent'>
                <div className='tab-pane fade show active ' id='home' role='tabpanel' aria-labelledby='home-tab'>
                
                    <div className='row mt-3'>
                    <div className='col-md-6'>
                       <label>User ID</label>
                    </div>
                    <div className='col-md-6'>
                       <p>{userData._id}</p>
                    </div>

                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Name</label>
                    </div>
                    <div className='col-md-6'>
                       <p>{userData.name}</p>
                    </div>
                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>E-mail</label>
                    </div>
                    <div className='col-md-6'>
                       <p>{userData.email}</p>
                    </div>
                    </div> 

                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Phone</label>
                    </div>
                    <div className='col-md-6'>
                       <p>{userData.phone}</p>
                    </div>
                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Profession</label>
                    </div>
                    <div className='col-md-6'>
                       <p>{userData.work}</p>
                    </div>
                    </div> 
                </div>
            </div>
            </TabPanel>
            <TabPanel>
            <div className='tab-content profile-tab' id='myTabContent'>
                <div className='tab-pane fade show active ' id='home' role='tabpanel' aria-labelledby='home-tab'>
                
                    <div className='row mt-3'>
                    <div className='col-md-6'>
                       <label>Experience</label>
                    </div>
                    <div className='col-md-6'>
                       <p>Intermediate</p>
                    </div>

                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Country</label>
                    </div>
                    <div className='col-md-6'>
                       <p>India</p>
                    </div>
                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Projects </label>
                    </div>
                    <div className='col-md-6'>
                       <p>250</p>
                    </div>
                    </div> 

                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Current project</label>
                    </div>
                    <div className='col-md-6'>
                       <p>React E-commerce</p>
                    </div>
                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Company</label>
                    </div>
                    <div className='col-md-6'>
                       <p>KWIQSOFT</p>
                    </div>
                    </div> 
                </div>
            </div>
            </TabPanel>
            </Tabs>
            {/* <div className='tab-content profile-tab' id='myTabContent'>
                <div className='tab-pane fade show active ' id='home' role='tabpanel' aria-labelledby='home-tab'>
                
                    <div className='row mt-3'>
                    <div className='col-md-6'>
                       <label>User ID</label>
                    </div>
                    <div className='col-md-6'>
                       <p>2r823r7987r7679878</p>
                    </div>

                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Name</label>
                    </div>
                    <div className='col-md-6'>
                       <p>Shamshad Hussain</p>
                    </div>
                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>E-mail</label>
                    </div>
                    <div className='col-md-6'>
                       <p>Example@example.com</p>
                    </div>
                    </div> 

                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Phone</label>
                    </div>
                    <div className='col-md-6'>
                       <p>98XXXXXXXX</p>
                    </div>
                    </div> 
                    <div className='row'>
                    <div className='col-md-6'>
                       <label>Profession</label>
                    </div>
                    <div className='col-md-6'>
                       <p>Node.JS Developer</p>
                    </div>
                    </div> 
                </div>
            </div> */}
            
            
            {/* <div className='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
            <div className='row'>
                    <div className='col-md-6'>
                       <label>Experience</label>
                    </div>
                    <div className='col-md-6'>
                       <p>Intermediate</p>
                    </div>
                    </div> 
            </div> */}

            </div>

            </div>

            </form>
         </div>
         
        </>
    )
}

export default About
