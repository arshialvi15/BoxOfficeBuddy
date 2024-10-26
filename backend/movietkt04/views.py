from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser


class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            return Response({"message": "Account created successfuly"}, status=201)
        return Response(serializer.errors, status=400)

    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=200)


class UpdateDeleteUserView(APIView):
    def put(self, request, id):
        user = User.objects.get(id=id)

        data = request.data
        serializer = UserSerializer(instance=user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "user updated"}, status=200)
        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        user = User.objects.get(id=id)
        user.delete()
        return Response({"message": "user deleted"}, status=204)


class LoginView(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = LoginSerializer(user, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        print("Serializer Data:", serializer)
        if serializer.is_valid():
            user = serializer.validated_data
            print("Validated User:", user)

            token = RefreshToken.for_user(user)
            return Response(
                {
                    "username": str(user.username),
                    "id": str(user.id),
                    "message": "login successful",
                    "access_token": str(token.access_token),
                    "refresh_token": str(token),
                }
            )
        print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=401)


class AuthDeleteView(APIView):
    def delete(self, request, id):
        user = User.objects.get(id=id)
        user.delete()
        return Response({"message": "user deleted"}, status=204)


class Movieview(APIView):
    def get(self, request):
        search = request.GET.get("search")
        genre = request.GET.get("genre")
        language = request.GET.get("language")
        city = request.GET.get("city")
        rating = request.GET.get("rating")
        movies = Movie.objects.all()
        if search:
            movies = movies.filter(title__icontains=search)
        if genre:
            movies = movies.filter(genre__icontains=genre)
        if language:
            movies = movies.filter(language__icontains=language)
        if city:
            movies = movies.filter(city__icontains=city)
        if rating:
            movies = movies.filter(rating=rating)

        serializer = MovieSerializer(movies, many=True).data

        return Response(serializer)


class MoviePostview(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        data = request.data
        # data["movie_id"] = request.user.id
        serializer = MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            return Response({"message": "Movie added"}, status=201)
        return Response(serializer.errors, status=400)


# admin only post,put and delete also


class SpecificMovieview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        movies = Movie.objects.get(id=id)
        serializer = MovieSerializer(movies).data
        return Response(serializer)

    def put(self, request, id):
        movie = Movie.objects.get(id=id)
        self.check_permissions(request)

        data = request.data
        serializer = MovieSerializer(instance=movie, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie updated"}, status=200)
        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        movie = Movie.objects.get(id=id)
        self.check_permissions(request)
        movie.delete()
        return Response({"message": "Movie deleted"}, status=204)

    def check_permissions(self, request):
        if request.method == "PUT" or request.method == "DELETE":
            self.permission_classes = [IsAdminUser]
        return super().check_permissions(request)


class Ticketview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, movie):
        try:
            movies = Theater.objects.filter(movie=movie)
            serializer = TheaterSerializer(movies, many=True).data
            return Response(serializer)
        except:
            return Response(status=500)

    def post(self, request, movie):
        try:
            # Fetch the Movie instance
            movie_instance = Movie.objects.get(id=movie)

            request.data["movie"] = movie_instance.id

            serializer = TheaterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(movie=movie_instance)
                return Response({"message": "Ticket booked successfully"}, status=201)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class SeatUserView(APIView):
    def get(self, request, user, theater):
        seats = Seat.objects.filter(user=user, theater=theater)
        serializer = SeatSerializer(seats, many=True).data
        return Response(serializer)


class Seatview(APIView):
    def get(self, request, theater):
        seats = Seat.objects.filter(theater=theater)
        serializer = SeatSerializer(seats, many=True).data
        return Response(serializer)


# class PostSeatview(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         seats = Seat.objects.all()
#         serializer = SeatSerializer(seats, many=True)
#         return Response(serializer.data)

# def post(self, request):
#     data = request.data

#     if isinstance(data, list):
#         serializer = SeatSerializer(data=data, many=True)
#     else:
#         serializer = SeatSerializer(data=data)

#     if serializer.is_valid():
#         serializer.save()
#         print(serializer)
#         return Response({"message": "seat reserved"}, status=201)
#     return Response(serializer.errors, status=400)


class PostSeatview(APIView):
    def get(self, request):
        seats = Seat.objects.all()
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        data = request.data

        # Ensure user is included in each seat data
        if isinstance(data, list):
            for seat_data in data:
                seat_data["user"] = user.id
        else:
            data["user"] = user.id

        serializer = SeatSerializer(data=data, many=isinstance(data, list))
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Seat reserved"}, status=201)
        return Response(serializer.errors, status=400)


class SeatDetailView(APIView):
    def put(self, request, theater, seat_id):
        try:
            seat = Seat.objects.get(id=seat_id, theater=theater)
        except Seat.DoesNotExist:
            return Response({"message": "Seat not found"}, status=404)

        serializer = SeatSerializer(instance=seat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Seat updated successfully"}, status=200)
        return Response(serializer.errors, status=400)


class Bookingview(APIView):
    def get(self, request):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True).data
        print(serializer)
        return Response(serializer)

    def post(self, request):
        data = request.data
        serializer = BookingSerializerTwo(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            return Response({"message": "seat reserved"}, status=201)
        return Response(serializer.errors, status=400)


class UserBookingview(APIView):
    def get(self, request, user):
        bookings = Booking.objects.filter(user=user)
        serializer = BookingSerializer(bookings, many=True).data
        print(serializer)
        return Response(serializer)
