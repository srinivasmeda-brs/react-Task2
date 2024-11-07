import { useState, useEffect } from 'react';
import "./index.css";  // Importing the external CSS file

const Harry = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getData = async () => {
            const url = "https://hp-api.onrender.com/api/characters";
            try {
                const response = await fetch(url);
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className="title">Harry Potter Characters</h1>
            <input
                type="text"
                placeholder="Search by Name"
                value={search}
                onChange={handleSearchChange}
                className="searchInput"
            />
            <ul className="list">
                {filteredData.length > 0 ? (
                    filteredData.map((character, index) => (
                        <li key={index} className="listItem">
                            <h2 className="characterName">{character.name}</h2>
                            <p className="characterDetails">House: {character.house || "Unknown"}</p>
                            <p className="characterDetails">Role: {character.role || "Unknown"}</p>
                            <img
                                src={character.image || "https://via.placeholder.com/150"}
                                alt={character.name}
                                className="characterImage"
                            />
                        </li>
                    ))
                ) : (
                    <p className="noResults">No characters found</p>
                )}
            </ul>
        </div>
    );
};

export default Harry;
