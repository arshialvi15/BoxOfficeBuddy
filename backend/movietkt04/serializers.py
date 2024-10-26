from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = "__all__"


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True)
    movie = MovieSerializer(Movie.title)
    date = serializers.DateField(
        source="theater.date"
    )  # Use double underscore notation
    movie_timing = serializers.TimeField(source="theater.movie_timing")

    class Meta:
        model = Booking
        fields = [
            "user",
            "theater",
            "movie",
            "seats",
            "date",
            "movie_timing",
            "total_cost",
            "isconfirmed",
        ]


class BookingSerializerTwo(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "password", "email")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            # name=validated_data["name"],
            password=validated_data["password"],
            email=validated_data["email"],
        )
        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password", "id")

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError("username or password does not match")
