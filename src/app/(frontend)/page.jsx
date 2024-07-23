"use client"
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';
import {headContainerAnimation } from "../../helpers/motion"

export default function Home() {

  return (
    <AnimatePresence>
      <div className="hero mt-10 shadow-lg py-5 bg-white/30">
        <motion.div className="text-center" {...headContainerAnimation} >
          <div className="gradientText flex item-center justify-center gap-3 leading-normal py-5 lg:py-10 lg:text-8xl md:text-6xl sm:text-4xl text-3xl">
            <div>
              <h2>Exotic</h2>
            </div>
            <div >
              <Typewriter
                options={{
                  strings: ['Flights', 'Services', 'Ventures'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="lg:w-3/4 mx-auto w-10/12 lg:py-2">
            <p className="font-bold leading-[1.15] text-sm lg:text-md text-gray-500 text-center">Embark on a journey of luxury and convenience with our exclusive airplane services. From swift bookings to curated travel experiences, we're your passport to hassle-free adventures. Elevate your travel standards and let us redefine the way you soar through the skies.</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
