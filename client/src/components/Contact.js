import React,{useEffect,useState} from "react";
import {useHistory} from 'react-router-dom';


const Contact = () =>{
    const history = useHistory();
    const [userData, setUserData] = useState({name:'' , email:'', phone:'', message:''});

  //useEffect function get data from backend
    const userContact = async () =>{
        
       try {
             const res = await fetch('/getdata',{
                method:'GET',
                headers:{
                   "Content-Type": "application/json"
                }
                
             });
                const data = await res.json();
 
                //console.log(data);
                setUserData({...userData, name: data.name, email: data.email, phone:data.phone});
                console.log(userData);
 
                if(!res.status === 200){
                   throw new Error ("unauthorized token");
                  
                }
 
       }catch(err){
          console.log(err)
          window.alert('You can not able to send your message without login')
          history.push('/login');
       }
    }
 
    useEffect(() => {
       userContact();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

      // storing form data in state    
      const handleInputData = (e) => {
        console.log(e)
       const name = e.target.name;
      const  value = e.target.value;

        setUserData({...userData, [name]:value});
    }

    //send form data to backend server

    const contactForm = async(e) => {
        e.preventDefault();

        const {name,email,phone,message} = userData;

        const res = await fetch('/contact',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,email,phone,message
            })
        });

        const sentData = await res.json();

        if(res.status === 422 || !sentData){
            window.alert('Fill the all details')
        }else{
            window.alert('your data has been sent')
            setUserData({...userData, message:""})
        }

    }

    return(
        <>
                <div className='contact_info'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between mt-5'>
                            {/* phone number */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center shadow-sm p-3 mb-5 bg-body rounded col-3' >
                                <img className='me-4 ' src='https://img.icons8.com/office/30/000000/iphone.png' alt='phone'/>
                                <div className='contact_info_content'>
                                <div className='contact_info_title ' style={{fontWeight:"bold"}}>
                                    Phone
                                </div>
                                <div className='contact_info_text '>
                                    {userData.phone}
                                </div>
                                </div>
                            </div>  
                               {/* email number */}
                               <div className='contact_info_item  d-flex justify-content-start align-items-center shadow-sm p-3 mb-5 bg-body rounded col-3 '>
                                <img className='me-4' src='https://img.icons8.com/office/30/000000/new-post.png' alt='email'/>
                                <div className='contact_info_content'>
                                <div className='contact_info_title'style={{fontWeight:"bold"}}>
                                     E-mail
                                </div>
                                <div className='contact_info_text' >
                                    {userData.email}
                                </div>
                                </div>
                                
                            </div>
                               {/* Address number */}
                               <div className='contact_info_item d-flex justify-content-start align-items-center shadow-sm p-3 mb-5 bg-body rounded col-3'>
                                <img className='me-4' src='https://img.icons8.com/office/30/000000/contact-card.png' alt='address'/>
                               
                                <div className='contact_info_content'>
                                <div className='contact_info_title' style={{fontWeight:"bold"}}>
                                    Address
                                </div>
                                <div className='contact_info_text'>
                                    New Delhi
                                </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>


                <div className='contact-form'>
                    <div className='container shadow p-3 mb-5 bg-body rounded'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>
                            <div className='contact_form_title mb-5 ' style={{fontWeight:"bold", fontSize:30}}>
                            Get in touch
                            </div>
                            <form method='POST' id='contact_form'>
                                <div className='contact_form_name d-flex justify-content-between align-items-between'>
                                        <input type='text' name='name' id='contact_form_name' className='contact_form_name input_field ' placeholder='Your Name' required={true} value={userData.name} onChange={handleInputData}/>
                                        <input type='email' name = 'email' id='contact_form_email' className='contact_form_email input_field' placeholder='Your E-mail' required={true} value={userData.email} onChange={handleInputData}/>
                                        <input type='number' name= 'phone' id='contact_form_phone' className='contact_form_phone input_field' placeholder='Your Phone Number' required={true} value={userData.phone} onChange={handleInputData}/>
                                </div>
                                <div className="contact_form_text mt-5 col-lg-10 offset-lg-1">
                                    <textarea className='text_field contact_from_message align-items-center' name='message' placeholder='Enter your message' cols='100' rows='10' value={userData.message} onChange={handleInputData} ></textarea>
                                </div>
                                <div className='contact_form_button mt-3 col-lg-10 offset-lg-1'>
                                    <button type='submit' className='btn btn-primary btn-lg animated-border-button' onClick={contactForm}> Send Message</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </>
    )
}

export default Contact