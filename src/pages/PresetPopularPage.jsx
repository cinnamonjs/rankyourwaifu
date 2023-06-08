import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { transition } from "@/utils/setting";
import Box from '@/components/card';
import { CharacterData } from '@/utils/characterdata';

export default function Popular() {

  {/* Selection */}
  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [isSelectable, setIsselectable] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  {/* handle Selection */}
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

  {/* handle after selection */}
  const resetSelect = () => {
    if (!animationCompleted && isSelectable) {
    console.log("Animation complete");
    //update data character
    // ..
    setAnimationCompleted(true);
  }};

  return (
    <MotionConfig transition={transition}>
      {/* background */}
      <motion.div className=" bg-red-100 w-[50vw] h-[100vh] absolute z-0"
        animate={{ opacity: 1, x: 0 }} 
      >
      </motion.div>

      <motion.div className=" bg-blue-100 w-[50vw] h-[100vh] absolute z-0"
        animate={{ opacity: 1, x: '50vw' }}
      >
      </motion.div>

      {/* Content box*/}
      <div className='flex flex-row z-10'>

        {/* left content (first character) */}
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
            character={CharacterData[0]}
          />
        </motion.button>

        {/* right content (second character) */}
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
            character={CharacterData[1]}
          />
        </motion.button>
      </div>
    </MotionConfig>
  );
};