"use client"
import AuthForm from "/src/components/forms/AuthForm"
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import '../styles/auth.css';
import { slideAnimation, headContainerAnimation } from "../../../../helpers/motion"

const Page = () => {

  return (
    <AnimatePresence>
      <motion.div className='authContent flex justify-evenly items-center mt-20 shadow-xl w-full bg-white/30 backdrop-blur-sm px-2 lg:px-10 md:px-10 py-5' {...headContainerAnimation}>
        <div className='heading py-2 mb-4 text-center w-1/2'>
          <h2 className='gradientText block lg:text-8xl max-sm:text-4xl max-md:text-5xl lg:leading-normal py-2'>Sign In</h2>
          <motion.div {...slideAnimation('up')}>
            <Image src="/images/plane.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className='mt-5 lg:mt-10 md:mt-10'
            />
          </motion.div>
        </div>
        <div className='w-2/5'>
          <AuthForm mode="signIn" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Page