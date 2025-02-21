import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-[100vh-80px]'>
        <SignIn signUpUrl='/register'>Sign In</SignIn>

    </div>
  )
}

export default Login