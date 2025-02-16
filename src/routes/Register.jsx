import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Register = () => {
  return (
    <div className='flex items-center justify-center h-[100vh-80px]'>
        <SignUp signInUrl='/login'>Sign In</SignUp>

    </div>
  )
}

export default Register