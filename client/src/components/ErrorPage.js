import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
    return (
        <>
            <div id='notfound'>
                <div className='notfound'>
                    <div className='notfound-404 text-center'>
                        <h1>404 Not Found !</h1>
                        <Link to='/' className='btn btn-primary'>Go Back</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
