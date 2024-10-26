import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Booking.css'
import MyDocument from './pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
   
   
 export default function BookingSummary() {
        const [booking, setbooking] = useState([])
        const params= useParams();
        const user=params.user;
        useEffect(() => {
    
            fetch("http://127.0.0.1:8000/api/bookings/"+user)
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
    <h1 className='booking-title'>Booking Summary</h1>
                {booking.map((i) => (
  <div key={i.id} className='custom-booking-cont'>
    <div className='custom-details'>
    {/* <h5 className="custom-title">Username: {username}</h5> */}
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
        Total cost: ${i.total_cost}
        <p>{i.date}</p>
        <p>{i.movie_timing}</p>
      </p>
      <p>Seat numbers:</p>
      <div className='custom-seats'>
      {i.seats.map((seat) => (
        <span key={seat.id}>{seat.seat_number}</span>
      ))}
    </div>
    </div>
    
    <PDFDownloadLink document={<MyDocument movieTitle={i.movie.title} seatDetail={i.isconfirmed} seatDetail2={i.total_cost} movie_timing={i.movie_timing}/>} fileName="document.pdf">
      {({ blob, url, loading, error }) => 
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div>
))}
               
            </>
        )
    }








