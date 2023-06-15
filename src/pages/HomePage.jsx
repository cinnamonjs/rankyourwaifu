import { Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Paper } from "@/components/card.jsx";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const CenterWidth = window.innerWidth / 2;
  const CenterHeight = window.innerHeight / 2;
  const object = "absolute rounded-full animate-pulse mix-blend-multiply filter blur-xl opacity-70 "

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX - CenterWidth, y: event.clientY - CenterHeight});
  };

  return (
    <>
      <div className="bg-gray-50 w-[100vw] h-[100vh] absolute"
      onMouseMove={handleMouseMove}
      >
        {/* background object */}
          <motion.div className={`${object} bg-purple-300 w-[24rem] h-[24rem] animate-delay-3000`}
          animate={{
            x: -128 + (position.x / 70),
            y: -160 + (position.y / 70),
          }}
          ></motion.div>
          <div className={`${object} bg-orange-200 top-[16rem] left-[5rem] w-[9rem] h-[9rem] animate-delay-5000`}></div>
          <div className={`${object} bg-lime-300 top-[23rem] -left-[4rem] w-[13rem] h-[13rem] animate-delay-9000`}></div>
          <motion.div className={`${object} bg-amber-200 w-[18rem] h-[18rem] animate-delay-5000`}
          animate={{
            x: window.innerWidth - 364 + (position.x / 60),
            y: window.innerHeight - 364 + (position.y / 20),
          }}         
          ></motion.div>
          <div className={`${object} bg-teal-200 bottom-72 -right-4 w-[4rem] h-[4rem] animate-delay-7000`}></div>
      </div>

        {/* primary text */}
        <div className="flex flex-col relative top-[7vh] items-center justify-center w-screen"
        onMouseMove={handleMouseMove}
        > 
          <div className="flex flex-row">
                <Text
                  className="pointer-events-none"
                  h1
                  size={60}
                  css={{
                    textGradient: "115deg, $blue600 -20%, $pink600 80%",
                  }}
                  weight="bold"
                >
                Rank Your Waifu
                </Text>
          </div>  
          <img src="https://media.tenor.com/-vOy1q13l7oAAAAC/kaon-priconne.gif" className="ml-2 rounded-xl drop-shadow-[0_15px_30px_rgba(255,99,71,0.5)]"></img>
          {/* secondary text */}
          <div className="mt-16">
          <Text
                  className="pointer-events-none"
                  h1
                  size={32}
                  weight="bold"
                >
                 Presets 
                </Text>
          </div>

          {/* sub context cards */}
          <div className="flex flex-row justify-center items-center h-[250px] mt-16 ">
                <Link to='/popular'>
                  <Paper 
                    bg='bg-gradient-to-br from-[#B993D6] to-[#8CA6DB]'
                    image='/images/anime1.png'
                    primary='popular anime'
                    secondary='based by most fans'
                  />
                 </Link>
                 <Link to='/popular'>
                  <Paper 
                    bg='bg-gradient-to-br from-[#ee0979] to-[#ff6a00]'
                    image='/images/anime2.png'
                    primary="dev's presets"
                    secondary='recommended by me'
                  />
                 </Link>
                 <Link to='/popular'>
                  <Paper 
                    bg='bg-gradient-to-br from-[#BE93C5] to-[#7BC6CC]'
                    image='/images/anime3.png'
                    primary='Full set (30) preset'
                    secondary='400-600 click (hardcore users)'
                  />
                 </Link>
          </div>
          
          {/* footer */}
          <div className="mt-32 flex flex-row">
              <div className="underline underline-offset-2 font-semibold font-Inter text-[12px] text-gray-700">FAQ</div>
              <div className="ml-1 font-light font-Inter text-[12px] text-gray-700">if u want to suggest anime to me, contact me =w=</div>
          </div>
        </div>
    </>
  )
};