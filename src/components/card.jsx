import { motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { Text } from "@nextui-org/react";
import useMeasure from "react-use-measure";
import { transition, transitionLong } from "@/utils/setting";


export const Paper = (props) => {
    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);

    return (
        <MotionConfig transition={transition}>
            <motion.button className="flex justify-center h-[380px] w-[320px] overflow-hidden"
                ref={ref}
                initial={false}
                animate={isHover ? "hover" : "rest"}
                whileTap="press"
                variants={{
                    rest: { scale: 1, rotateX: 0, rotateY: 0 },
                    hover: { scale: 1.2, rotateX: 15, rotateY: 11 },
                    press: { scale: 1.5, rotateX: 15, rotateY: 11 }
                }}
                onHoverStart={() => {
                    setIsHover(true);
                }}
                onHoverEnd={() => {
                    setIsHover(false);
                }}
                onTapStart={() => setIsPress(true)}
                onTap={() => setIsPress(false)}
                onTapCancel={() => setIsPress(false)}
            >
                <motion.div className={`flex items-start h-[340px] w-[240px] ${props.bg} drop-shadow-xl rounded-xl`}>
                    {/* image */}
                    <img src={props.image} className="absolute z-0 h-[300px] w-[220px] object-contain ml-[10px] mt-[10px] drop-shadow-lg" />
                    {/* TEXT */}
                    <div className="flex flex-col z-10">
                        <div className="pt-2 pb-2 bg-black bg-opacity-40 mt-[200px]">
                        <Text h2 size={12} weight="light" color="white"
                            css={{ marginLeft: '29px', lineHeight: '8px', textAlign: 'left', letterSpacing: '.5px' , marginTop: '0.5px', marginBottom: '2px' }}
                        >
                            {props.secondary}
                        </Text>
                        </div>
                        <Text h1 size={40} weight="bold" color="white"
                            css={{ marginLeft: '27px', lineHeight: '44px', marginTop: '0px', textAlign: 'left' }}
                        >
                            {props.primary}
                        </Text>
                    </div>
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
};

export default function Box(props) {

    return (
        <MotionConfig transition={transitionLong}>
            <motion.div className="flex flex-col text-center mt-[7vh] md:mt-[17.5vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Text
                    className="pointer-events-none z-20 max-sm:text-xl"
                    h1
                    size={50}
                    css={{
                        textGradient: "45deg, #0F2027 0%, #ad5389 100%",
                    }}
                    weight="bold"
                >
                    {props.character.name}
                </Text>
                <img src={props.character.image} className='ml-[50vw] -translate-x-[66.6%] md:ml-0 md:translate-x-0 h-[140px] w-[140px] md:h-[420px] md:w-[420px] object-cover rounded-lg z-20 drop-shadow-[5px_10px_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[20px_40px_5px_rgba(0,0,0,0.2)] duration-300 hover:duration-300' />

                <div className="flex flex-row rounded-full bg-white mt-4 md:mt-16 min-w-[280px] h-[24px] md:min-w-[300px] md:max-w-[45vw] md:h-[36px] z-20 pl-4 pt-[12px]">
                    <Text
                        className="pointer-events-none z-20 max-sm:text-sm max-sm:mt-[-9px]"
                        h1
                        size={18}
                        css={{lineHeight: '12px', margin: '0'}}
                        weight="semibold"
                    >
                        Fromㅤ
                    </Text>
                    <Text
                        className="pointer-events-none z-20 truncated max-sm:text-sm max-sm:mt-[-9px]"
                        h1
                        size={18}
                        weight="normal"
                        css={{lineHeight: '12px', margin: '0'}}
                    >
                        {props.character.anime}
                    </Text>
                </div>
            </motion.div>
        </MotionConfig>
    )
}
