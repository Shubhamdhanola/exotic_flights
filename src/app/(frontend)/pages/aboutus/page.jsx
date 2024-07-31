"use client"
import { motion, AnimatePresence } from "framer-motion";
import { headContainerAnimation } from "../../../../helpers/motion"

export default function AboutUs() {

  return (
    <AnimatePresence>
      <div className="hero mt-10 shadow-lg py-5 bg-white/70">
        <motion.div className="text-center" {...headContainerAnimation} >
          <div className="gradientText flex item-center justify-center gap-3 leading-normal py-5 lg:py-10 lg:text-8xl md:text-6xl sm:text-4xl text-3xl">
            <div>
              <h2>About Us</h2>
            </div>
          </div>
          <div className="lg:w-3/4 mx-auto w-10/12 lg:py-2 flex flex-col gap-6 text-md text-gray-600">
            <p className="font-bold leading-[1.15]  lg:text-md  text-start">
              Welcome to Exotic Flights! ✈️
            </p>
            <p className="font-bold leading-[1.15]  lg:text-md  text-start">
              At Exotic Flights, we are dedicated to making your ticketing experience seamless and enjoyable. Whether you're booking tickets for travel, events, or any other special occasion, we've got you covered. Our mission is to provide top-notch service and support, ensuring you get the best deals and a hassle-free experience.
            </p>
            <p className="font-bold leading-[1.15]  lg:text-md  text-start">
              With a team of experienced professionals, we pride ourselves on our commitment to customer satisfaction. We understand the importance of your plans, and we're here to help you every step of the way. From ticket reservations to personalized support, we aim to exceed your expectations.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
