import React from "react";
import { Table ,Text } from "@nextui-org/react";

export default function Result(props) {
    const time = new Date().toLocaleDateString('en-US');
    const RankArray = props.RanksArray
    const CharacterArray = props.Characters
    RankArray.sort((a, b) => a.rank - b.rank);

    const getPositionCharacterElement = (index) => {
        return CharacterArray.find((item => item.name === (RankArray.find((item) => item.rank === index)).item ))
    }

    /** render table element */
    const renderRankedCharacters = () => {

        const characterElements = [];
        for (let i = 0; i < RankArray.length; i++) {
          const character = RankArray[i];
          const characterItem = CharacterArray.find((item) => item.name === RankArray[i].item);
          
          characterElements.push(
            <Table.Row key={ i + 1 }>
              <Table.Cell>
                <p className="font-Inter font-semibold ml-1 md:ml-4 mr-2 md:mr-4">{character.rank}</p>
              </Table.Cell>
              <Table.Cell>
                    <div className="flex flex-row items-center min-w-[75px] min-h-[75px]">
                        <img src={characterItem.image} className="w-[75px] h-[75px] md:w-[120px] md:h-[120px] rounded-full drop-shadow-md object-cover pointer-events-none rendering-auto" />
                        <p className="font-Inter font-semibold ml-6 md:flex hidden">{characterItem.name}</p>
                    </div>
                </Table.Cell>
              <Table.Cell>
                <p className="font-Inter font-semibold ml-4 truncate max-sm:text-sm max-sm:w-[120px]">{characterItem.anime}</p>
              </Table.Cell>
            </Table.Row>
          );
        }
        return characterElements;
    }

    return (
        <>
        
        <div className="relative w-screen min-h-[100vh] bg-gray-100 top-0 left-0">
            {/* Head Text */}
            <Text
                    className="pl-[50vw] pt-[9vh] pb-1 pointer-events-none z-20 -translate-x-1/4 max-sm:text-2xl"
                    h1
                    size={50}
                    css={{
                        textGradient: "145deg, #0F2027 40%, #4DA0B0 70%",
                        margin: 0,
                    }}
                    weight="bold"
            >
                Scoreboard
            </Text>
            <p className="font-Inter font-medium ml-2 text-[13px] md:text-lg pl-[49.7vw] pb-7 -translate-x-1/4">Preset: {props.PresetName}</p>

            {/* Top 3 */}
            <div className="flex flex-row w-screen justify-center mb-16 items-end">
                <div className="flex flex-col mr-4 md:mr-16">
                    <div className="flex flex-row">
                        <p className="font-Inter font-bold mr-2 ml-1 md:ml-0 text-[11px] md:text-lg">2nd</p>
                        <p className="font-Inter font-bold text-gray-500 text-[11px] md:text-lg">{getPositionCharacterElement(2).name}</p>
                    </div>
                    <img src={getPositionCharacterElement(2).image} className="h-24 w-24 md:h-64 md:w-64 object-cover drop-shadow-md pointer-events-none"/>
                    <div className="h-4 w-24 md:h-10 md:w-64 object-cover drop-shadow-md bg-[#D7C0AE]"></div>

                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p className="font-Inter font-bold mr-2 ml-1 md:ml-0 md:text-xl">1st</p>
                        <p className="font-Inter font-bold text-gray-500 md:text-xl">{getPositionCharacterElement(1).name}</p>
                    </div>
                    <img src={getPositionCharacterElement(1).image} className="h-28 w-28 md:h-72 md:w-72 object-cover drop-shadow-md pointer-events-none"/>
                    <div className="h-6 w-28 md:h-14 md:w-72 object-cover drop-shadow-md bg-[#967E76]"></div>
                </div>
                <div className="flex flex-col ml-4 md:ml-16">
                    <div className="flex flex-row">
                        <p className="font-Inter font-bold mr-1 md:mr-2 text-[9px] md:text-base">3rd</p>
                        <p className="font-Inter font-bold text-gray-500 text-[9px] md:text-base">{getPositionCharacterElement(3).name}</p>
                    </div>
                    <img src={getPositionCharacterElement(3).image} className="h-20 w-20 md:h-56 md:w-56 object-cover drop-shadow-md pointer-events-none"/>
                    <div className="h-2 w-20 md:h-6 md:w-56 object-cover drop-shadow-md bg-[#EEE3CB]"></div>

                </div>  
            </div>
            <div className="flex justify-center w-100% pb-8">
                <Table
                css={{
                    height: "auto",
                    minWidth: "45vw",
                }}
                >
                <Table.Header>
                    <Table.Column> ORDER</Table.Column>
                    <Table.Column> NAME</Table.Column>
                    <Table.Column> ANIME</Table.Column>
                </Table.Header>
                <Table.Body>
                    {renderRankedCharacters()}
                </Table.Body>
                </Table>
            </div>
            <p className="font-Inter font-light text-[14px] md:text-xl pl-[45vw] translate-x-[18%] pb-16">created at {time}</p>
        </div>
        </>
      );
}