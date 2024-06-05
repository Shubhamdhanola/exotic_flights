import React from 'react'
import AuthForm from '/src/components/forms/AuthForm'

const page = () => {
    return (
        <div className='mt-5'>
            <div className='heading py-2 mb-6 text-center'>
                <h2 className='textGradient text-6xl'>Sign Up</h2>
            </div>
            <div className=''>
                <AuthForm mode="signUp" />
            </div>
        </div>
    )
}

export default page