import React, {useEffect,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App'



const Logout = () => {

    const {state,dispatch} = useContext(UserContext)

    const history = useHistory();


    const logoutFunction = async () => {
       
        try{
            const res =  await fetch('/logout',{
                method:'GET',
                headers:{
                    'Content-Type': "application/json"
                }
                    
            })
            dispatch({type:'USER',payload:false})
            //window.alert('User Logout');
            history.push('/login',{replace: true});

            const data = await res.json();
            console.log(data);

        }catch(err){
            console.log('logout error problem occur' + err)
        }

    }

    useEffect(()=>{

        logoutFunction();
         //  eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // this is logout function with promises then & catch

    // useEffect(()=>{
    //     fetch('/logout',{
    //         method:'GET',
    //         headers:{
    //             "Content-Type": "application/"
    //         }
    //     }).then((res)=>{
    //          dispatch({type:'USER',payload:false})
    //         history.push('/login');
    //         if(res.status !== 200){
    //             throw new Error("something error")

    //         }
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // })

    return (
        <>
            
        </>
    )
}

export default Logout
