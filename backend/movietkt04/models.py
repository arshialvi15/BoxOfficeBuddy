from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username should be provided")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=60, unique=True)
    password = models.CharField(max_length=16)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    objects = UserManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    image = models.ImageField(null=True)
    img = models.URLField(null=True, max_length=1500)
    director = models.CharField(max_length=200)
    starring_actors = models.CharField(max_length=200)
    runtime = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    description = models.TextField()
    language = models.CharField(max_length=200)
    rating = models.CharField(max_length=200)
    popcorn_rating = models.FloatField(default=5.0)
    tomato_rating = models.FloatField(default=5.0)
    release_date = models.DateTimeField(default=None, null=True)
    city = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Theater(models.Model):
    id = models.AutoField(primary_key=True)
    movie_id = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="movietheaters"
    )
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    pincode = models.CharField(max_length=200)
    date = models.DateField(default=timezone.now)
    movie_timing = models.TimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    no_of_tickets = models.IntegerField()
    booking_date = models.DateTimeField(auto_now_add=True)
    # Add other fields related to the ticket (e.g., booking status, total cost, etc.)

    def __str__(self):
        return f"{self.user.username} - {self.theater} - {self.no_of_tickets} tickets"


class Seat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movie")
    seat_number = models.CharField(max_length=10)
    is_reserved = models.BooleanField(default=False)
    category = models.CharField(max_length=200)
    price = models.FloatField()

    def __str__(self):
        return f"-{self.movie.title}-Seat{self.seat_number}"


class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theater = models.ForeignKey(
        Theater,
        on_delete=models.CASCADE,
    )
    seats = models.ManyToManyField(Seat)
    total_cost = models.FloatField()
    isconfirmed = models.BooleanField(default=True)

    def __str__(self):
        return f"-{self.movie.title}-{self.theater.movie_timing}"
