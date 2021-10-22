import React, {useState,useEffect} from 'react'

const Home = () => {
    
    const [userData, setUserData] = useState({});
    const [show, setShow] = useState(false);
    
        const userName = async () => {
            try{
                const res =  await fetch('/getdata',{
                    method:'GET',
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                console.log(data);
                setUserData(data);
                setShow(true);
            }catch(err){
                console.log(err);
            }
        }
    useEffect(()=>{
        userName();
    },[]);


    return ( 
        <>
             <div className='home-page  d-flex justify-content-center align-items-center bg-light bg-gradient shadow-sm '>
                <div className='home-div  text-center' >
                    <p className='p-2 badge bg-primary fs-4 '>WELCOME</p>
                    <h1 className='gradient-text' style={{fontWeight:"bold"}} >{userData.name}</h1><br/>
                    <h5 >{show ? 'Happy To See You Back ! 🥰' : 'Hello MERN Developers 🤟 You Need To Login For Managing your Account 😄' }</h5>
                </div>
             </div>
             
           

            
        </>
    )
}

export default Home
