"use client"
import AuthForm from '/src/components/forms/AuthForm'
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import '../styles/auth.css';
import { slideAnimation,headContainerAnimation } from "../../../../helpers/motion"

const page = () => {
    return (
        <AnimatePresence>
            <motion.div className='authContent mt-20 shadow-xl w-full bg-white/30 backdrop-blur-sm  px-10 py-5 flex justify-evenly items-center' {...headContainerAnimation}>
                <div className='heading py-2 mb-4 text-center w-1/2'>
                    <h2 className='gradientText block lg:text-8xl max-sm:text-4xl max-md:text-5xl lg:leading-normal'>Sign Up</h2>
                    <motion.div {...slideAnimation('down')}>
                        <Image src="/images/plane.png"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            className='mt-10'
                        />
                    </motion.div>
                </div>
                <div className='w-2/5'>
                    <AuthForm mode="signUp" />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default page