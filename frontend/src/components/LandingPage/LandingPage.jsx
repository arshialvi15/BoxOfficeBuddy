import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './LandingPage.css'
import cinemaImage from './cinema03.jpg.webp'


const LandingPage = () => {
    const divStyle = {
        backgroundImage: `url(${cinemaImage})`,
        backgroundSize: 'cover',  // Adjust according to your needs
        backgroundRepeat: 'no-repeat',
        height: '500px',  // Set the desired height
        color: "white",
        padding: "100px"
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [movies, setMovies] = useState([]);
    const [unavailable, setunavailable]=useState(false)
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        genre: '',
        city: '',
        language: '',
        rating: '',
    });


    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
       
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const id = localStorage.getItem("id");
        // console.log("Local Storage:", localStorage);  // Log the entire local storage object
        console.log("id:", id);
        console.log("token:", token);
        if (!token) {
            setIsAuthenticated(false);

        } else {
            setIsAuthenticated(true);
        }
        console.log("Is Authenticated:", isAuthenticated);
        const apiUrl = `http://127.0.0.1:8000/api/movies/?${new URLSearchParams(filters)}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // setMovies(data);
                // setLoading(false);
                if (data.length === 0) {
                    // Handle the case where there are no movies
                    setMovies([]);
                    setLoading(false);
                    setunavailable(true)
                   
                } else {
                    setMovies(data);
                    setLoading(false);
                    setunavailable(false)
                }
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setLoading(false);
            });
    }, [filters, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            {/* <img src={cinemaImage} alt="Cinema" /> */}
            <div className='main-container' style={divStyle}>
                <div className='main-text'>
                <h1 className='main-text1'>Get <span style={{color:"green"}}> Movie </span>Tickets</h1>
                <p className='main-text2'>Buy movie tickets in advance, find movie times watch trailers,
                
                </p>
                <p className='main-text3'>  read movie reviews and much more</p>
                </div>
                
                <div className='search-container'>
                    <div className='search-text'>
                    <h6>Welcome to Boleto</h6>
                    <h4>What are you looking for</h4>
                    <p>Search for movies</p>
                    </div>
                   
                    <div className='filter-divs'>
                      

                        <div className='filter-div'>
                            <label className='filter-div-label'>
                                Search: &nbsp;
                                <input className='filter-div-input' value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} placeholder='Search'>

                                </input>
                            </label>
                        </div>
                        <div className='filter-div'>
                            <label className='filter-div-label'>
                                Genre:
                                <select value={filters.genre} onChange={(e) => handleFilterChange('genre', e.target.value)}>
                                    <option value="">Select Genre</option>
                                    <option value="adventure">Adventure</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="scifi">Scifi</option>
                                    <option value="drama">Drama</option>
                                    {/* Add genre options here */}
                                </select>
                            </label>
                        </div>
                        <div className='filter-div'>
                            <label className='filter-div-label'>
                                city:
                                <select value={filters.city} onChange={(e) => handleFilterChange('city', e.target.value)}>
                                    <option value="">Select city</option>
                                    <option value="bhopal">Bhopal</option>
                                    <option value="indore">Indore</option>
                                    <option value="indore">Kolkata</option>
                                    <option value="delhi">Delhi</option>
                                    <option value=""></option>
                                    {/* Add city options here */}
                                </select>
                            </label>
                        </div>
                        <div className='filter-div'>
                            <label className='filter-div-label'>
                                Language:
                                <select value={filters.language} onChange={(e) => handleFilterChange('language', e.target.value)}>
                                    <option value="">Select Language</option>
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                    <option value="japanese">Japanese</option>
                                    <option value="german">German</option>
                                    {/* Add language options here */}
                                    
                                </select>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div>
            </div>




                <div className="row row-cols-1 row-cols-md-4 g-5" id='card-container'  >
                        {unavailable &&<div className='unavailable-txt'> <p>Sorry, we do not have any movies that match the applied filters</p></div>}
                        {console.log("Unavailable:",unavailable)} 
                    {movies.map((i) => (
                        <div className="col" key={i.id}>
                            <div className="card mt-5" id='card-body-box' >


                                {isAuthenticated ? (
                                    <Link to={'/movies/' + i.id}>
                                        <img src={i.img} className="card-img-top" alt="Card image cap" height={360} style={{ padding: '10px' }} />
                                    </Link>
                                ) : (
                                    <Link to={'/login'}>
                                        <img src={i.img} className="card-img-top" alt="Card image cap" height={360} style={{ padding: '10px' }} />
                                    </Link>
                                )}




                                <div className="card-body" >
                                    <h5 className="card-title">{i.title}</h5>
                                    {/* <p className="card-text">
                                        {i.genre}
                                    </p> */}
                                    <div className='ratings-div'>
                                    <p className="card-text" id='ratings'>
                                       🍿 {i.popcorn_rating} 
                                    </p>
                                    <p className="card-text" id='ratings'>
                                        🍅{i.tomato_rating}
                                    </p>
                                    </div>
                                   
                                   
                                </div>
                             </div>
                        </div>
                    ))}
                </div>

          
        </>
    );
};

export default LandingPage;

