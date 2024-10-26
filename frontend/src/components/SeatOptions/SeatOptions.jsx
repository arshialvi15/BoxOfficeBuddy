import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './SeatOptions.css'

export default function SeatOptions() {
    const navigate = useNavigate();
    const params = useParams();
    const movie_id = params.movie_id;
    const theater_id = params.theater_id;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);

    

    const fetchReservedSeats = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/seats/${theater_id}?is_reserved=true`);
          const data = await response.json();
          setReservedSeats(data);
          console.log(data)
          console.log(reservedSeats)
        } catch (error) {
          console.error('Error fetching reserved seats data:', error);
        }
      };
    
     
      useEffect(() => {
        fetchReservedSeats();
      }, []);
      useEffect(() => {
        const seatlist = [];
        for (let i = 0; i < reservedSeats.length; i++) {
    seatlist.push( reservedSeats[i].id);
}

console.log(seatlist); 

    //    console.log(reservedSeats[0].id)
        const allSeats = document.querySelectorAll('.seat');
        allSeats.forEach(seat => {
          const seatNumber = seat.getAttribute('id');
          const isReserved = reservedSeats.some(seat => seat.seat_number === seatNumber);
          seat.style.backgroundColor = isReserved ? 'red' : '';  // Apply red color if reserved
          seat.style.pointerEvents = isReserved ? 'none' : 'auto';
        });
      }, [reservedSeats]);
    



    const handleClick = (seatNumber, seatCategory, seatPrice) => {
        const isSeatSelected = selectedSeats.some(
            (selectedSeat) => selectedSeat.seat_number === seatNumber
        );

        if (isSeatSelected) {
            const updatedSeats = selectedSeats.filter(
                (selectedSeat) => selectedSeat.seat_number !== seatNumber
            );
            setSelectedSeats(updatedSeats);
        } else {
            setSelectedSeats((prevSeats) => [
                ...prevSeats,
                { seat_number: seatNumber, category: seatCategory,
                 price: seatPrice, movie: movie_id, theater: theater_id, is_reserved: true },
            ]);
        }

        const spanElement = document.getElementById(seatNumber);
        if (spanElement) {
            spanElement.style.backgroundColor = isSeatSelected ? "" : "green";
        }
    };

    useEffect(() => {
        console.log(selectedSeats[0]);
        console.log(selectedSeats);
    }, [selectedSeats]); // Change dependency to selectedSeats

    const handleSubmit = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat before booking.");
            return;
        }


        const token = localStorage.getItem("access_token");
        console.log("Movie ID:", movie_id);
        console.log("Theater ID:", theater_id);
        const apiUrl = `http://127.0.0.1:8000/api/seats/`;
        console.log(selectedSeats[0].seat_number)
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                 Authorization: `Bearer ${token}` ,
            },
            body: JSON.stringify(selectedSeats),
        })

            .then((response) => {
                if (response.status === 201) {
                    navigate(`/${movie_id}/${theater_id}/postbooking/`)
                    // alert("Seats Booked")
                } else {
                    alert("Error posting seat data");
                }
            })
            .catch((error) => {
                console.error("Error posting seat data:", error);
            });
    };
    console.log(selectedSeats)



const id = localStorage.getItem("id");

// const handleCombinedClick = () => {
    // Call both functions
    // handleSubmit();
    // handleBooking();
//   };
    return (
        <>
            <Navbar />
            <div className="seat-conatainer">
             <div className="seat-gold">Category Gold($100):
             <div>
                    <span id="A1" className="seat" onClick={() => handleClick("A1", "Gold", 100)}>A1</span>
                </div>
                <div>
                    <span id="A2" className="seat" onClick={() => handleClick("A2", "Gold", 100)}>A2</span>
                </div>
                <div>
                    <span id="A3" className="seat" onClick={() => handleClick("A3", "Gold", 100)}>A3</span>
                </div>
                <div>
                    <span id="X3" className="seat" onClick={() => handleClick("X3", "Gold", 100)}>X3</span>
                </div>
                <div>
                    <span id="X4" className="seat" onClick={() => handleClick("X4", "Gold", 100)}>X4</span>
                </div>
             </div>

             <div className="seat-silver">Category Silver($200):
             <div>
                    <span id="B1" className="seat" onClick={() => handleClick("B1", "Silver", 200)}>B1</span>
                </div>
                <div>
                    <span id="B2" className="seat" onClick={() => handleClick("B2", "Silver", 200)}>B2</span>
                </div>
                <div>
                    <span id="B3" className="seat" onClick={() => handleClick("B3", "Silver", 200)}>B3</span>
                </div>
                <div>
                    <span id="B4" className="seat" onClick={() => handleClick("B4", "Silver", 200)}>B4</span>
                </div>
                <div>
                    <span id="B5" className="seat" onClick={() => handleClick("B5", "Silver", 200)}>B5</span>
                </div>
             </div>
            </div>
           <div className="seat-select">
            
           <button onClick={handleSubmit} className="seat-select-btn" >Book Seats</button>
            <Link to={`/${movie_id}/${theater_id}/postbooking/`}>
            </Link> 
            </div>

            {/* <button onClick={handleBooking}  >Get Yor Booking Summary</button> */}
            {/* <button onClick={handleCombinedClick}  >PROCEED</button> */}
            {/* <Link to={`${movie_id}/${theater_id}/bookings/${id}`}>
                <button>go to user's booking summary</button>
                 </Link> */}
        </>
    )
}