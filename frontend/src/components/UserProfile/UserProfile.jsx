import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './UserProfile.css'
export default function UserProfile() {
    const [booking, setbooking] = useState([])
    const id = localStorage.getItem("id");
    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/bookings/"+ id)
            .then((res) => res.json())
            .then((results) => {
                setbooking(results);
                console.log(results); // Move console.log here
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    const username = localStorage.getItem("username");
    return (
        <>
            <Navbar />

            <div className="row row-cols-1 row-cols-md-4 g-5 " style={{ padding: '50px', background: "#191939" }}  >
               
            {booking.map((i) => (
  <div key={i.id} className='custom-booking-cont m-5'>
    <div className='custom-details'>
      <h5 className="custom-title">Username: {username}</h5>
      <h5 className="custom-title">user ID: {i.user}</h5>
      <p className="custom-text">
      Movie Title: {i.movie.title} {/* Accessing movie title */}
      <p>Theater ID:{i.theater}</p>
        <p>Number of seats: {i.seats.length}</p>
        {/* <p>Seat numbers: {i.seats.map((seat) => seat.seat_number).join(', ')}</p> */}
        {i.isconfirmed ? (
          <div className="confirmed">Confirmed</div>
        ) : (
          <div>Not confirmed</div>
        )}
        <p>{i.date}</p>
        <p>{i.movie_timing}</p>
      </p>
      <p>Seat numbers:</p>
      <div className='custom-seats'>
      {i.seats.map((seat) => (
        <span key={seat.id}>{seat.seat_number}</span>
      ))}
    </div>
    Total Cost:
    {i.total_cost}
    </div>
   
  </div>
))}

            </div>



            <div className="container">

            </div>
        </>
    )
}