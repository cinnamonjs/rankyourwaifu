import { useState , useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { transition } from "@/utils/setting";
import Box from '@/components/card';

/**
 * selector frontpages component
 * @param onclick handle onclick event
 * @param nextRound handle nextRound event
 * @param object character data object
 */
export default function Selection(props) {
  
  /** Selection */  
  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [isSelectable, setIsselectable] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  /** handle Selection */
  const handleSelect1 = (event) => {
    if (!isSelectable) {
      setIsselectable(true)
      event.preventDefault();
      setIsSelect1(true);
      props.onclick(props.index, props.object.Right)
  }};

  const handleSelect2 = (event) => {
    if (!isSelectable) {
      setIsselectable(true)
      event.preventDefault();
      setIsSelect2(true);
      props.onclick(props.index, props.object.Left)
  }};

  /** handle after selection */
  const resetSelect = (animationId) => {
      if (animationId === 'ButtonAnimation' && isSelectable) {
        props.nextRound()
        setAnimationCompleted(true);
      }
  };

  useEffect(() => {
      setAnimationCompleted(false);
      setIsSelect1(false);
      setIsSelect2(false);
      setIsselectable(false);
  }, [props.object]);

  return (
    <MotionConfig transition={transition}>
      {/* background */}
      <motion.div className=" bg-red-100 w-screen h-[50vh] md:w-[50vw] md:h-[100vh] absolute z-0"
        animate={{ opacity: 1, x: 0 }} 
      >
      </motion.div>

      <motion.div className=" bg-blue-100 w-[50vw] h-[100vh] absolute z-0 hidden md:flex"
        animate={{ opacity: 1, x: '50vw' }}
      >
      </motion.div>

      <motion.div className=" bg-blue-100 w-screen h-[50vh] absolute z-0 flex md:hidden"
        animate={{ opacity: 1, y: '50vh' }}
      >
      </motion.div>

      {/* Content box*/}
      <div className='flex flex-col md:flex-row z-10'>
        {/* Title */}
        <div className='flex flex-row absolute w-[320px] min-h-[33px] md:w-[450px] md:min-h-[60px] rounded-full drop-shadow-xl ml-7 md:ml-16 mt-5 bg-white opacity-75'>
            <p className='ml-6 mt-[7px] md:mt-4 font-Inter font-semibold text-sm md:text-xl'>rounds {props.index + 1}</p>
            <p className='ml-6 mt-[7px] md:mt-4 font-Inter font-light text-sm md:text-xl text-gray-400'>Select by click at character image.</p>
        </div>
        {/* left content (first character) */}
        <motion.button className='flex w-screen h-[50vh] md:w-[50vw] md:h-screen justify-center justify-items-center'
          animate={isSelect1 ? "selected" : "idle"}
          variants={{
            selected: { scale: 0.5, opacity: 0 },
            idle: { scale: 1, opacity: 1},
          }}
          onClick={handleSelect1}
          onAnimationComplete={() => resetSelect("ButtonAnimation")}
        >
          <Box
            character={props.object.Right}
          />
        </motion.button>

        {/* right content (second character) */}
        <motion.button className='flex w-screen h-[50vh] md:w-[50vw] md:h-screen left-0 md:left-[50vw] top-[50vh] md:top-0 justify-center justify-items-center overflow-auto'
          animate={isSelect2 ? "selected" : "idle"}
          variants={{
            selected: { scale: 0.5, opacity: 0 },
            idle: { scale: 1, opacity: 1},
          }}
          onClick={handleSelect2}
          onAnimationComplete={() => resetSelect("ButtonAnimation")}
        >
          <Box
            character={props.object.Left}
          />
        </motion.button>
      </div>
    </MotionConfig>
  );
};