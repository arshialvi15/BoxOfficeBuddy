
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import SpecificMovie from './components/SpecificMovie/SpecificMovie';
import LandingPage from './components/LandingPage/LandingPage';
import TheaterList from './components/TheaterList/TheaterList';
import BookingSummary from './components/BookingSummary/Booking';
import UserProfile from './components/UserProfile/UserProfile';
import SeatOptions from './components/SeatOptions/SeatOptions';
import PostBooking from './components/PostBooking/PostBooking';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />}>
            </Route>
            <Route path='/login' element={<Login />}>
            </Route>
           
            <Route path='/' element={<LandingPage />}>
            </Route>
            <Route path='/movies/:movie_id' element={<SpecificMovie />}>
            </Route>
            <Route path=':movie_id/tickets/:theater_id' element={<TheaterList />}>
            </Route>
            <Route path='/:movie_id/:theater_id/seats/' element={<SeatOptions />}>
            </Route>
            <Route path='/:movie_id/:theater_id/postbooking/' element={<PostBooking />}>
            </Route>
            <Route path='/bookings/:user' element={<BookingSummary />}>
            </Route>
         
            <Route path='/userProfile' element={<UserProfile />}>
            </Route>

          </Routes>
      </BrowserRouter>    </div>
  );
}

export default App;
