from django.urls import path
from .views import *

urlpatterns = [
    path("signup/", (SignupView.as_view()), name="user-signup"),
    path("user/<int:id>/", (UpdateDeleteUserView.as_view()), name="user-update"),
    path("login/", (LoginView.as_view()), name="user-signin"),
    path("delete/<int:id>/", (AuthDeleteView.as_view()), name="user-delete"),
    path("movies/", Movieview.as_view(), name="movies"),
    path("postmovies/", MoviePostview.as_view(), name="post-movies"),
    path("movies/<int:id>/", SpecificMovieview.as_view(), name="specific_movies"),
    path("seats/", PostSeatview.as_view(), name="post-seats"),
    path("seats/<int:theater>/", Seatview.as_view(), name="get-seats"),
    path(
        "seatsuser/<int:user>/<int:theater>/", SeatUserView.as_view(), name="get-seats"
    ),
    path(
        "theaters/<int:theater>/seats/<int:seat_id>/",
        SeatDetailView.as_view(),
        name="put-seat-detail",
    ),
    path("tickets/<int:movie>/", Ticketview.as_view(), name="tickets"),
    path("bookings/", Bookingview.as_view(), name="booking"),
    path("bookings/<int:user>", UserBookingview.as_view(), name="booking"),
]
