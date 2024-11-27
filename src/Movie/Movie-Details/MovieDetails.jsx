import './MovieDetails.css'
import { useState, useEffect } from 'react'
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import CircularProgress from "./CircularProgress";
function MovieDetail() {
    const location = useLocation();
    const movie = location.state?.movie;
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (movie) {
            const movieRating = movie.vote_average;
            const calculatedPercentage = Math.round((movieRating / 10) * 100);
            setPercentage(calculatedPercentage);
        }
    }, [movie]);
    if (!movie) return <p>Movie data not available.</p>;

    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const backgroundImageUrl = `${baseUrl}${movie.poster_path}`;
    return (
        <div className="detail-container">
            <div className='container' >
                <div className="poster-container">
                    <div className="poster">
                        <img src={baseUrl + movie.poster_path} alt={movie.title} />
                    </div>
                </div>
                <div className="detail"  >
                    <div className="title">
                        <h1>{movie.title}</h1>
                        <p>
                            {new Date(movie.release_date).getFullYear()}
                        </p>
                    </div>
                    <div className="date">
                        <p>{movie.release_date}</p>
                    </div>
                    <div className='rating' style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "5rem",
                        width: '15%',
                    }}>
                        <CircularProgress percentage={percentage} />
                        <h2>User Score</h2>
                    </div>
                    <div className="overview">
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail