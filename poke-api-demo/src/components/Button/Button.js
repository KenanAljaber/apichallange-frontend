import PropsTypes from "prop-types"
import React from "react";

const Button = ({ title, btnHref, onClick, btnColor,styleClassName }) => {
    return (
        <a href={btnHref}>
            <button className={styleClassName} onClick={onClick} style={{ backgroundColor: { btnColor } }}>{title}</button>
        </a >

    );
};
Button.propsTypes = {
    title: PropsTypes.string.isRequired,

}
Button.defaultProps = {
    title: "Detalles",
    btnHref: "/",
    btnColor: "#058CFF",
    styleClassName: "button",

}


export default Button;