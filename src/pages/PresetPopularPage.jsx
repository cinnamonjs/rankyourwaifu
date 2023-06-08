import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { transition } from "@/utils/setting";
import Box from '@/components/card';

export default function Popular() {

  {/* Selection */}
  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [isSelectable, setIsselectable] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const handleSelect1 = (event) => {
    if (!isSelectable) {
      setIsselectable(true)
      event.preventDefault();
      setIsSelect1(true);
  }};

  const handleSelect2 = (event) => {
    if (!isSelectable) {
      setIsselectable(true)
      event.preventDefault();
      setIsSelect2(true);
  }};

  const resetSelect = () => {
    if (!animationCompleted) {
    console.log("Animation complete");

    setAnimationCompleted(true);
  }};

  return (
    <MotionConfig transition={transition}>
      {/* background */}
      <motion.div className=" bg-red-100 w-[50vw] h-[100vh] absolute z-0"
        animate={{ opacity: 1, x: 0 }} 
        onAnimationComplete={{}} >
      </motion.div>
      
      <motion.div className=" bg-blue-100 w-[50vw] h-[100vh] absolute z-0"
        animate={{ opacity: 1, x: '50vw' }}
        onAnimationComplete={{}} >
      </motion.div>

      {/* Content */}
      <div className='flex flex-row z-10'>

        {/* left content */}
        <motion.button className='flex w-[50vw] h-screen justify-center justify-items-center'
          animate={isSelect1 ? "selected" : "idle"}
          variants={{
            selected: { scale: 1.5, opacity: 0 },
            idle: { scale: 1, opacity: 1},
          }}
          onClick={handleSelect1}
          onAnimationComplete={resetSelect}
        >
          <Box
            name='Tania'
            image='/images/tania.jpg'
            anime='Beast tamer'
          />
        </motion.button>

        {/* right content */}
        <motion.button className='flex w-[50vw] h-screen left-[50vw] justify-center justify-items-center'
          animate={isSelect2 ? "selected" : "idle"}
          variants={{
            selected: { scale: 1.5, opacity: 0 },
            idle: { scale: 1, opacity: 1},
          }}
          onClick={handleSelect2}
          onAnimationComplete={resetSelect}
        >
          <Box
            name='Fran'
            image='/images/fran.jpg'
            anime='Reincarnated as a sword'
          />
        </motion.button>
      </div>
    </MotionConfig>
  );
};