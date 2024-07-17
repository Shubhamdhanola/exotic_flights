"use client"
import AuthForm from "../../components/forms/AuthForm";
import { motion, AnimatePresence } from "framer-motion";
import {headContainerAnimation } from "../../../../helpers/motion"

const SignIn = () => {

  return (
    <AnimatePresence>
      <motion.div className='authContent flex flex-col justify-evenly items-center mt-20 shadow-xl w-10/12 bg-white/30 backdrop-blur-sm px-2 lg:px-10 md:px-10 py-5' {...headContainerAnimation}>
        <div className='heading py-2 mb-4 text-center w-1/2'>
          <h2 className='gradientText block lg:text-8xl max-sm:text-4xl max-md:text-5xl lg:leading-normal py-2'>Sign In</h2>
        </div>
        <div className='w-2/5'>
          <AuthForm mode="signIn" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SignIn