
import Button from "../Button/Button"
import React from "react";
const PokemonHolder = ({ disc, btnTitle, imageSrc, imageAlt, btnHref, pokemonName }) => {
    return (
        <div>
            <div className="item-title">
                <h3>{pokemonName}</h3>
            </div>
            <img className="listImageClass" src={imageSrc} alt={imageAlt}  />
            
            <p className="disc-paragraph">{disc}</p>

            <Button title={btnTitle} btnHref={btnHref} />
            
        </div>
        
        )

}
PokemonHolder.defaultProps = {
    disc:"",
    btnTitle:"Detalles",
}
export default PokemonHolder;