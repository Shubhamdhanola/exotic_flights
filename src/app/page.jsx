"use client"
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { slideAnimation, headTextAnimation, headContentAnimation, headContainerAnimation } from "../../src/helpers/motion"

export default function Home() {


  return (
    <AnimatePresence>
      <div className="hero mt-10 shadow-lg py-10 bg-white/30">
        <motion.div className="text-center" {...headContainerAnimation} >
          <div className="gradientText text-8xl leading-normal flex item-center justify-center gap-3">
            <div>
              <h2 className="">Exotic</h2>
            </div>
            <div>
              <Typewriter
                options={{
                  strings: ['Fligts', 'Services', 'Ventures'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="w-3/4 mx-auto">
            <p className="head_text">Embark on a journey of luxury and convenience with our exclusive airplane services. From swift bookings to curated travel experiences, we're your passport to hassle-free adventures. Elevate your travel standards and let us redefine the way you soar through the skies.</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
