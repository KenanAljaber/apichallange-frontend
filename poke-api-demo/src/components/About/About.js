import myPhoto from "../../assets/myPhoto.png"
import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
const About = () => {
    const navigate = useNavigate();
    return (
        <div style={divStyle}>
            <img src={myPhoto} alt="" style={photoStyle} />
            <p style={paragraphStyle}>Mi nombre es Kenan Aljaber, y esta es mi participacion en Poke-ApiChallange.</p>
                <br/><Button onClick={()=> navigate(-1)} title="Back" btnHref="#"/>
        </div>
        
        );

}

const divStyle= {
    textAlign: "center",
    padding:"20px"
}

const photoStyle = {
    width: "20%",
    borderRadius: "10px",
    

}
const paragraphStyle = {
  
    verticalAlign: "top",
    marginLeft: "8px",
    fontSize: "18px",
    color: "#058CFF",
    fontWeight:"bold"

}
export default About;
