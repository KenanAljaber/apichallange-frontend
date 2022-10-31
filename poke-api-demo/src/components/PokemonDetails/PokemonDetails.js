import React from "react";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineRightCircle } from 'react-icons/ai';

const PokemonDetails = () => {
    //getting the pokemon id to load it from the back-end
    let { pokemonId } = useParams();
    const pokemonUrlBase = "https://pokemon-api-challange.herokuapp.com/api-kruger/pokemon/"  ;
    const [pokemon, setPokemon] = useState([]);
    const [types, setTypes] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const navigate = useNavigate();

//fetch the pokemon from the api
    const fetchPokemon=(pokemonUrl)=>{
        axios.get(pokemonUrl).then((response) => {
            setPokemon(response.data);
            setTypes(response.data["types"])
            setAbilities(response.data["abilities"])
            if (pokemon !== undefined) {
                setDataLoaded(true);
            }

        });
    };
 
    //load the api data
    useEffect(() => {
        
        if (pokemon === undefined) {
            setDataLoaded(false);
        }
       fetchPokemon(pokemonUrlBase+pokemonId);
    }, []);


//go the the next pokemon 
    const nextPokeomn=()=>{
        
        let nextPokemonId=pokemonId;
       if(pokemon.id === 20){
            nextPokemonId=1;
            
       }else{
        nextPokemonId++;
       }
       console.log(nextPokemonId);
       return nextPokemonId;
    };

   

    //get strings from abilites/types arrays as one plain text
    const getStrings = (array, key) => {
        
        let result = "";
        array.forEach(it => {
            result = result + it[key] + ", ";
            console.log(result);
        });

        result = result.slice(0, -2) + '.';

        return result;
    };

    return (

        <div className="details-card-container">
            
            <div className="details-body-card">
            <div className="next-icon-container">
                <a href={"/pokemon/"+ (nextPokeomn())}>
                <AiOutlineRightCircle className="next-icon"   />
                </a>
            </div>

                <div className="left-side">

                    <img className="listImageClass" src={pokemon["photo"]} alt={pokemon["name"]} />
                </div>

                {dataLoaded &&
                    <div className="right-side">

                        <h1 className="pokemon-details-name">{pokemon["name"]}</h1>

                        <div className="pokemon-details-details" key={pokemonId}>
                            <div className="pokemon-details-disc"  >Name: <span>{pokemon["name"]}</span></div>
                            <div className="pokemon-details-disc" >Weight: <span >{pokemon["weight"]}</span></div>
                            <div className="pokemon-details-disc" >Height: <span >{pokemon["height"]}</span></div>
                            <div className="pokemon-details-disc">Type: <span>{getStrings(types, "type")}</span></div>
                            <div className="pokemon-details-disc" >Abilities: <span>{getStrings(abilities, "ability")}</span></div>

                        </div>


                        <Button title="Back" onClick={() => navigate(-1)} btnHref="#" />
                        <Button title="Home" btnColor="#209483" />
                    </div>


                }
                {!dataLoaded &&
                    <div style={{ display: "flex", placeContent: "center", padding: "100px" }}>
                        <div className="loader" />

                    </div>
                }


            </div>
        </div>

    );

}


export default PokemonDetails;