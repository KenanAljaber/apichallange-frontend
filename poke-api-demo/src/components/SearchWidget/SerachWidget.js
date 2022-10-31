import React from "react";

const SearchWidget = ({ searchHint, onchange, value }) => {
    return (
        <div className="SearchWidgetContainer">
            <input className="searchWidget" placeholder={searchHint} onChange={onchange} value={value}></input>
        </div>
    );
};

export default SearchWidget;