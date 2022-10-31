import Home from "./components/Home/Home"
import logo from "./assets/logo.png"
import React from "react";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails"
import {  Route, Routes, Link } from 'react-router-dom';
import About from "./components/About/About"
import Button from "./components/Button/Button";
import Game from "./components/Game/Game";
function App() {
    return (


        <div className="app">

            <div >
                <Link to="/">
                    <img href="/" src={logo} alt="logo" className="appLogo" />
                </Link>
               
                <a href="/about" style={aboutStyle}>About me</a>
                <Button title="Jugamos?" styleClassName="test" btnHref="/game"/>
           
                

            </div>
            
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} exact={false} />
                <Route path="/game" element={<Game/>}/>
            </Routes>
            
        </div>
       
    );
};
const aboutStyle = {
    display: "inline-block",
    float: "right",
    textDecoration: "none",
    color: "#FF0505",

}

export default App;
