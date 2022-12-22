import React from "react";
import GameOptions from "./GameOptions";
import defaultImage from "../../assets/default-pokemon.png"
import axios from "axios";
import { useState } from "react";

const RESPONSES ={CORRECT: "CORRECT",
                WRONG:"WRONG"};

const GameCard = ({ image , gameCard }) => {
    const checkAnswerLink="http://ec2-34-207-70-164.compute-1.amazonaws.com:8080/api-kruger/pokemon/game/";
    const [cardContainerStyleClass,setCardContainerStyle]=useState(" game-card-container");
    const [pokemonImage,setPokemonImage]=useState(defaultImage);
   
    const onOptionClicked=(optionString)=>{
        axios.get(checkAnswerLink+optionString).then((response)=>{
            console.log(response.data);
                switch (response.data){
                    case RESPONSES.CORRECT:
                        setCardContainerStyle("game-card-container-correct");
                        setPokemonImage(gameCard.pokemon["photo"]);
                        return;
                    case RESPONSES.WRONG:
                        
                        setCardContainerStyle("game-card-container-wrong");
                        return;
                    default:
                        setCardContainerStyle("game-card-container");
                }
        });
    }

    return (
        <div className={cardContainerStyleClass}>
            <div >
                <h2>Cual es el nombre del pokemon que tiene la misma descrpicion ?</h2>
                <div className="game-image-constainer">
                <img src={pokemonImage} alt="" className="listImageClass" />
                </div>
                <div className="game-disc-container">
                <p>{gameCard.pokemon["description"]}.</p>
                </div>
            </div>
            <div className="game-bottom-container">
                
                <GameOptions styleClassName="game-options-container" options={gameCard.options} onClickAction={onOptionClicked}/>

            </div>

        </div>

    );
}

GameCard.defaultProps={
    image:defaultImage,
}

export default GameCard;