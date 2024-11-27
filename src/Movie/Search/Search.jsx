import React, { useState, useEffect } from "react";
import './Search.css';

function Search({onSearchResult , onEndSearch}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const apiKey = 'ad49ccfdb6941afd7ccc12758c1d5ef2';

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ad49ccfdb6941afd7ccc12758c1d5ef2&&query=${searchTerm}`);
          const data = await response.json();
          setResults(data.results);
          onSearchResult(data.results);
        } catch (error) {
          console.error("Error");
        }
      } else {
        setResults([]);
        onEndSearch(true)
      }
    };
    fetchResults();
  }, [searchTerm, apiKey]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search">
      <input
        className="input"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;