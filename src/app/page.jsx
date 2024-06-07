"use client"
import { motion,AnimatePresence } from "framer-motion";
import { slideAnimation, headTextAnimation, headContentAnimation, headContainerAnimation } from "../../src/helpers/motion"

export default function Home() {
  return (
    <AnimatePresence>
      <div className="hero mt-2">
        <motion.div className="text-center" {...headContainerAnimation} >
          <h2 className="gradientText text-8xl">Exotic Fligths</h2>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
