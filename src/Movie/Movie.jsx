import React, { useState, useEffect } from "react";
import './Movie.css';
import Search from "./Search/Search";
import TopBar from "./Top-Bar/Top-Bar";
import { useNavigate } from "react-router-dom"; 

function Movie() {
    const [movie, setMovie] = useState({}); 
    const [searchResults, setSearchResults] = useState([]); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [triggerSearch, setTriggerSearch] = useState(false);
    const navigate = useNavigate();
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=ad49ccfdb6941afd7ccc12758c1d5ef2');
                const data = await response.json();
                setMovie(data);
                console.log(data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchMovieData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const length = triggerSearch ? searchResults.length : Object.values(movie)[1].length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const onSearchResult = (results) => {
        setTriggerSearch(true);
        setSearchResults(results);
        setCurrentPage(1);
    };

    const onEndSearch = () => {
        setTriggerSearch(false);
        setCurrentPage(1); 
    };

    const baseUrl = "https://image.tmdb.org/t/p/w500";
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    let currentItems = [];

    if (triggerSearch) {
        currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
    } else {
        currentItems = Object.entries(movie)[1][1].slice(indexOfFirstItem, indexOfLastItem);
    }

    const handleMovieClick = (movie) => {
        navigate(`/Home/Movie`, { state: { movie } }); 
    };


    return (
        <>
            <TopBar />
            <Search onSearchResult={onSearchResult} onEndSearch={onEndSearch} />
            <div>
                <ul className="pagination">
                    <li>
                        <button
                            className="pagination-button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                    </li>
                    {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber}>
                            <button
                                onClick={() => handlePageChange(pageNumber)}
                                className={currentPage === pageNumber ? 'active' : 'pagination-button'}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className="pagination-button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === pageNumbers.length}
                        >
                            &gt;
                        </button>
                    </li>
                </ul>
            </div>
            <ul className="output-container">
                {currentItems.map((item, index) => (
                    <div key={index} className="output-box" onClick={() => handleMovieClick(item)}  style={{ cursor: "pointer" }} >
                        <div className="box">
                            <img src={baseUrl + item.poster_path} alt={item.title} />
                            <li><h1>{item.title}</h1></li>
                            <p>{item.release_date}</p>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    );
}

export default Movie;
