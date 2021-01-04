import React from 'react';

const SearchBar = ({ query, setQuery, activePage }) => {
    const handleClick = () => {
        setQuery("")
    }

    return (
        <div id="search-bar">
            <input
                id="search-bar-1"
                key="houses"
                maxLength={60}
                value={query}
                placeholder={"Search Treehouses"}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleClick}
                className="clear-button"
            >
                clear
            </button>
        </div>
    );
}

export default SearchBar;