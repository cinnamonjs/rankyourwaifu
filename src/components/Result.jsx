import React from "react";
import { Table ,Text } from "@nextui-org/react";

export default function Result(props) {
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
                <p className="font-Inter font-semibold ml-4 mr-4">{character.rank}</p>
              </Table.Cell>
              <Table.Cell>
                    <div className="flex flex-row items-center">
                        <img src={characterItem.image} className="w-[120px] h-[120px] rounded-full drop-shadow-md object-cover pointer-events-none rendering-auto" />
                        <p className="font-Inter font-semibold ml-6">{characterItem.name}</p>
                    </div>
                </Table.Cell>
              <Table.Cell>
                <p className="font-Inter font-semibold ml-4">{characterItem.anime}</p>
              </Table.Cell>
            </Table.Row>
          );
        }
        return characterElements;
    }

    return (
        <>
        <div className="relative w-screen min-h-[100vh] bg-gray-100 top-0 left-0">
            <Text
                    className="pl-[50vw] pt-[9vh] pb-8 pointer-events-none z-20 -translate-x-1/4"
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
            {/* Top 3 */}
            <div className="flex flex-row w-screen justify-center mb-16 items-end">
                <div className="flex flex-col mr-16">
                    <div className="flex flex-row">
                        <p className="font-Inter font-bold mr-2 text-lg">2nd</p>
                        <p className="font-Inter font-bold text-gray-500 text-lg">{getPositionCharacterElement(2).name}</p>
                    </div>
                    <img src={getPositionCharacterElement(2).image} className="h-64 w-64 object-cover drop-shadow-md pointer-events-none"/>
                    <div className="h-10 w-64 object-cover drop-shadow-md bg-[#D7C0AE]"></div>

                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p className="font-Inter font-bold mr-2 text-xl">1st</p>
                        <p className="font-Inter font-bold text-gray-500 text-xl">{getPositionCharacterElement(1).name}</p>
                    </div>
                    <img src={getPositionCharacterElement(1).image} className="h-72 w-72 object-cover drop-shadow-md pointer-events-none"/>
                    <div className="h-14 w-72 object-cover drop-shadow-md bg-[#967E76]"></div>
                </div>
                <div className="flex flex-col ml-16">
                    <div className="flex flex-row">
                        <p className="font-Inter font-bold mr-2">3rd</p>
                        <p className="font-Inter font-bold text-gray-500">{getPositionCharacterElement(3).name}</p>
                    </div>
                    <img src={getPositionCharacterElement(3).image} className="h-56 w-56 object-cover drop-shadow-md pointer-events-none"/>
                    <div className="h-6 w-56 object-cover drop-shadow-md bg-[#EEE3CB]"></div>

                </div>  
            </div>
            <div className="flex justify-center w-100% pb-32">
                <Table
                css={{
                    height: "auto",
                    minWidth: "45vw",
                }}
                >
                <Table.Header>
                    <Table.Column>ORDER</Table.Column>
                    <Table.Column>NAME</Table.Column>
                    <Table.Column>ANIME</Table.Column>
                </Table.Header>
                <Table.Body>
                    {renderRankedCharacters()}
                </Table.Body>
                </Table>
            </div>
        </div>
        </>
      );
}