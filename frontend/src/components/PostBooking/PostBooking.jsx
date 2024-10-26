import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './PostBooking.css'

export default function PostBooking() {
  const navigate = useNavigate();
  const params = useParams();
  const movie_id = params.movie_id;
  const theater_id = params.theater_id;
  const id = localStorage.getItem("id");
  const [userReservedSeats, setuserReservedSeats] = useState([]);

  const fetchuserReservedSeats = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/seatsuser/`+ id+"/"+theater_id);
      const data = await response.json();
      console.log(data); // Log the data here
      setuserReservedSeats(data);
    } catch (error) {
      console.error('Error fetching reserved seats data:', error);
    }
  };
  
console.log(userReservedSeats)
  useEffect(() => {
    fetchuserReservedSeats();
  }, []);

  const seatIdlist = userReservedSeats.map(seat => seat.id);
  console.log(seatIdlist);


   let totalCost = 0;
for (let i = 0; i < userReservedSeats.length; i++) {
    totalCost += userReservedSeats[i].price;
}

  const handleBooking = () => {
    const apiUrl = `http://127.0.0.1:8000/api/bookings/`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: id, movie: movie_id, theater: theater_id, seats: seatIdlist, total_cost: totalCost }),
    };

    const postBooking = async () => {
      try {
        const response = await fetch(apiUrl, requestOptions);

        if (response.status === 201) {
          console.log(response);
          alert('YOUR booking SUMMARY IS GENERATED');
          navigate(`/bookings/${id}`)
        } else {
          alert('Error posting booking SUMMARY');
        }
      } catch (error) {
        console.error('Error posting booking SUMMARY:', error);
      }
    };

    postBooking();
  };

  return (
    <>
      <Navbar />
      <h5 className="success-message">You Successfully Booked Your Seats🥳!!!</h5>
      
      <div className="btn-div" >
      <Link  style={{ textDecoration: 'none' }}>
        <button onClick={handleBooking} className="Booking-summ-btn">Get Your booking summary</button>
      </Link>
      </div>
    </>
  );
}
