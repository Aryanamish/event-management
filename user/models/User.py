from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
)
from django.db import models
from django.utils import timezone
from .Role import Role
from .Branch import Branch
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, college_id, email=None, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not college_id:
            raise ValueError('Users must have College id')
        if not email:
            raise ValueError('User must have a email id')
        user = self.model(
            college_id=college_id,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, college_id, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            college_id=college_id,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, college_id, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            college_id=college_id,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# hook in the New Manager to our Model


class User(AbstractBaseUser, PermissionsMixin):
    college_id = models.CharField(
        verbose_name='Register/Emp Number',
        max_length=10,
        unique=True,
    )
    first_name = models.CharField("First Name", max_length=150, blank=True)
    last_name = models.CharField("Last Name", max_length=150, blank=True)
    email = models.EmailField("Email Address", blank=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    role = models.ForeignKey(Role, on_delete=models.CASCADE, blank=True, null=True)

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, blank=True, null=True)

    joining_year = models.CharField(max_length=4, blank=True, null=True)
    leaving_year = models.CharField(max_length=4, blank=True, null=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = 'college_id'
    REQUIRED_FIELDS = ['email', 'role'] # Email & Password are required by default.


    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    def full_name(self):
        return f"{self.first_name} {self.last_name}"