import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './SpecificMovie.css'
export default function SpecificMovie() {
    const [movies, setmovies] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const params = useParams();
    const movie_id = params.movie_id;

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setIsAuthenticated(false);
            alert("Login required to view this page properly.");
        } else {
            setIsAuthenticated(true);
        }

        fetch(`http://127.0.0.1:8000/api/movies/${movie_id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((results) => {
                setmovies(results);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, [movie_id]);

    return (
        <>
            <Navbar />
           

            <div className='movie-detail-cont' >
            <img src={movies.img} className="card-img-top" alt="..." />
                <div className='movie-content'>
                <h5 className="movie-title">{movies.title}</h5>
                <p className="lang-text">{movies.language}</p>
                        <p className="genre-text">{movies.genre}</p><span className="lang-text">Rating:{movies.rating}</span>
                       
                        {/* <p >{movies.release_date}</p> */}
                        <p className="lang-text">🕛{movies.runtime}</p>
                </div>
              
                </div>
                
<div className='book-btn-div'>  {isAuthenticated ? (
                    <Link to={`/${movie_id}/tickets/${movies.id}`}>
                        <button className='book-btn'>Book Ticket</button>
                    </Link>
                ) : (
                    <Link to={'/login'}>
                        <button  >Login to Book Ticket</button>
                    </Link>
                )}</div>
             

           
        </>
    );
}
