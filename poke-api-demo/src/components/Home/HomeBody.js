import SearchWidget from "../SearchWidget/SerachWidget"
import Button from "../Button/Button"
import PokemonHolder from "../PokemonHolder/PokemonHolder";
import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";

//Actions taht will be used by the useReducer to control nex/previous button
const ACTIONS = {
    NEXTPAGE: "NEXTPAGE",
    PREVIOUSPAGE: "PREVIOUSPAGE"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.NEXTPAGE:
            return { firstPokemonIndex: (state.firstPokemonIndex * 0) + 10, lastPokemonIndex: (state.lastPokemonIndex * 0) + 20, btnTitle: state.btnTitle = "Back" };
        case ACTIONS.PREVIOUSPAGE:
            return { firstPokemonIndex: (state.firstPokemonIndex * 0), lastPokemonIndex: (state.lastPokemonIndex * 0) + 10, btnTitle: state.btnTitle = "Next" }
        default:
            return state;
    }
};

const HomeBody = () => {
    const pokemonsApi = "http://ec2-34-207-70-164.compute-1.amazonaws.com:8080/api-kruger/pokemon/all";


    const [state, dispatch] =
        useReducer(reducer, { pokemons: [], firstPokemonIndex: 0, lastPokemonIndex: 10, btnTitle: "Next" });

    const [dataLoaded, setDataLoaded] = useState(false);

    //declaring the list that will be updated and filled with the data of the api
    const [pokemons, setPokemons] = useState([]);
    //the pokemon name that user will look for 
    const [pokemonToSearch, setPokemonToSearch] = useState("");
    /*
    @btntitle a string used to switch the button title between Buscar/Cancelar
    @searchedClicked a boolean flag to indicate us when the user click Buscar button 
    */
    const [btnTitle, setBtnTitle] = useState("Buscar");
    const [searchValue, setSearchValue] = useState("");
    const [searchedClicked, setSearchedClicked] = useState(false);
    //an object that will hold the pokemon that user is loking for


    //fetching the api data
    useEffect(() => {
        if (pokemons === undefined) {
            setDataLoaded(false);
        }
        //if the user did not searched for any results yet then the page is recently loaded so 
        //get the data from the api
        if (!searchedClicked) {

            axios.get(pokemonsApi).then((response) => {
                console.log("useEffect called", response.data);
                setPokemons(response.data);
                if (response.data !== undefined) {
                    setDataLoaded(true);
                }

            });
        }

    }, [searchedClicked]);


    //Method to handle the next page by calling the dispatch method
    const handleNextPage = () => {
        if (state.btnTitle === "Next") {
            dispatch({ type: ACTIONS.NEXTPAGE });
        } else {
            dispatch({ type: ACTIONS.PREVIOUSPAGE })
        }
    };

    function search() {
        let searchedItem = [];
        //once the user clicked Buscar button, set the setSearchedClicked to the opisite
        //setSearchedClicked(!searchedClicked);
        //If the user will make a search
        if (!searchedClicked) {
            //check wheather the pokemon name exits in the list
            pokemons.forEach(it => {

                if (it.name.toLowerCase() === pokemonToSearch.toLowerCase()) {
                    searchedItem[0] = it;
                }
            });
            //pokemon name not found
            if (searchedItem.length === 0) {
                console.log("clicked not found setting pokemons to show");
                //clear the input
                setSearchValue("");
            }
            //Pokemon found, update pokemons list to show only the pokemon required,
            // change buscar title and also set setSearchedClicked to true 
            else {
                setPokemons(searchedItem);
                setBtnTitle("Cancelar");
                searchedItem = [];
                setPokemonToSearch("");
                setSearchedClicked(true);
            }
        }
        // if the user already searched we get back all pokemons and change the btn title
        else {
            setSearchedClicked(false);
            console.log("canceled");
            console.log(pokemons);
            setBtnTitle("Buscar");
            setSearchValue("");
            setPokemons(pokemons);

        }
    }


    //Keeping track of the value that user will input in search widget
    const onchange = e => {
        setPokemonToSearch(e.target.value);
        setSearchValue(e.target.value);
    }

    return (

        <div>
            {dataLoaded ?

                (<div>
                    {console.log(dataLoaded)}
                    <div className="searchContainer">
                        <SearchWidget searchHint="Busca tu pokemon favorito..." onchange={onchange} value={searchValue} />
                        <Button title={btnTitle} onClick={search} btnHref="#" /><br />
                    </div>

                    <div className="grid">
                        {

                            pokemons.slice(state.firstPokemonIndex, state.lastPokemonIndex).map(currentItem => {
                                return (
                                    <div className="item" key={currentItem.id}>
                                        <PokemonHolder btnTitle="Detalles" pokemonName={currentItem.name}
                                            disc={currentItem.description} textOnImage={currentItem.name}
                                            btnHref={'/pokemon/' + currentItem.id} imageSrc={currentItem.photo} />

                                    </div>
                                );
                            })}
                    </div> </div>) :
                <div style={{ display: "flex", placeContent: "center", padding: "100px" }}>
                    <div className="loader" />
                </div>
            }




            {!searchedClicked && dataLoaded &&
                <div className="next-btn-container">
                    <Button btnHref="#" title={state.btnTitle} onClick={handleNextPage} />
                </div>
            }

        </div>


    );
}

export default HomeBody;