import React from "react";

const HomeHeader = () => {

    return (
        <div className="headerContainer" >
            <div className="title-description" >

                <h1 ><span style={{ color: "#FF0505" }}>Pokemon-API</span>
                    <span style={{ color: "#058CFF" }} >Challange</span></h1>


                <p className="site-desc" >
                    En esta página puedes ver los pokemons más famosos
                    con un poco de detalles sobre sus habilidades y características,
                    espero que disfrutes el tour:)</p>
            </div>

        </div>

    );
};

export default HomeHeader;