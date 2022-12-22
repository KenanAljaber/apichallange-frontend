import React from "react";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";
import axios from "axios";
const Game = () => {
    const gameCardgeneratorLink = "http://ec2-34-207-70-164.compute-1.amazonaws.com:8080/api-kruger/pokemon/game";
    const [gameCard, setGameCard] = useState(undefined);
    const fetchGameCard = async () => {
        const response = await axios.get(gameCardgeneratorLink);
        setGameCard(response.data);
    };

    useEffect(() => {
        fetchGameCard();
    }, []);

    if (gameCard === undefined) {

        return (



            <div>
                {
                    console.log("empty")
                }
            </div>

        );
    } else {

        console.log(gameCard);

        return (
            <div>

                <GameCard gameCard={gameCard} />


            </div>

        );
    }
}

export default Game;