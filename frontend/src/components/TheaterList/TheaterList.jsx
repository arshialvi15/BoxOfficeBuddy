import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
// import cinemaImage from './cinema02.jpg';
import './TheaterList.css'

export default function TheaterList() {
   
    const [theaters, settheaters] = useState([])
    const params = useParams();
    const movie_id = params.movie_id;
    const theater_id = params.theater_id;
    console.log(theater_id)
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        fetch("http://127.0.0.1:8000/api/tickets/" + movie_id, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((results) => {
                settheaters(results);
                console.log(results); // Move console.log here
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    return (

        <>

            <Navbar />
            {/* <img src={cinemaImage} alt="Cinema" /> */}

            {theaters.map((i) => (
                <div className="col" id='theater-list-cont' key={i.id}>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                        <Link to={`/${movie_id}/${i.id}/seats/`}>

                            <button type="button"
                                className="btn btn-light my-2 px-3 py-2 border border-dark">
                                {i.name}
                                <span className='mx-5'>{i.date}</span>
                                <span className='mx-5'>{i.movie_timing}</span>
                            </button>
                        </Link>

                    </div>

                </div>

            ))}





        </>
    )
}