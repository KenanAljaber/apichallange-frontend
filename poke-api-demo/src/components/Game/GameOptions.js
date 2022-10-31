import React from "react";

const GameOptions = ({ styleClassName, options, onClickAction }) => {


    return (
        <div className={styleClassName}>
            <span className="game-option" onClick={() => {
                onClickAction(options[0]);
            }}>{options[0]}</span>

            <span className="game-option" onClick={() => {
                onClickAction(options[1]);
            }}>{options[1]}</span>

            <span className="game-option" onClick={() => {
                onClickAction(options[2]);
            }}>{options[2]}</span>

        </div>

    );
}
export default GameOptions;