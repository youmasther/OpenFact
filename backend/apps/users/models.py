from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from PIL import Image


class CustomUserManager(BaseUserManager):
    def create_user(self, email, phone, password=None, **extra_fields):
        """
        Create and save a regular user with email and phone as identifiers.
        """
        if not email:
            raise ValueError(_("The Email field must be set"))
        if not phone:
            raise ValueError(_("The Phone field must be set"))
        
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone, password=None, **extra_fields):
        """
        Create and save a superuser with email and phone as identifiers.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(email, phone, password, **extra_fields)


def upload_company_logo(instance, filename):
    """
    Fonction pour gérer le téléchargement de logo entreprise.
    """
    # Générer un nom de fichier unique basé sur l'horodatage
    ext = filename.split('.')[-1]
    filename = f"{timezone.now().strftime('%Y%m%d%H%M%S')}.{ext}"

class Company(models.Model):
    company_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    phone = models.CharField(max_length=50, blank=True)
    gsm = models.CharField(max_length=50, blank=True)

    email = models.EmailField(blank=True)
    logo = models.ImageField(_("Logo"), upload_to=upload_company_logo, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True)
    zipcode = models.CharField(max_length=20, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    # updated_by = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     blank=True,
    #     related_name="updated_companies"
    # )

    def __str__(self):
        return self.company_name
    
def upload_profile_image(instance, filename):
    """
    Fonction pour gérer le téléchargement d'images de profil.
    """
    # Générer un nom de fichier unique basé sur l'horodatage
    ext = filename.split('.')[-1]
    filename = f"{instance.email}_{timezone.now().strftime('%Y%m%d%H%M%S')}.{ext}"
    
    # Retourner le chemin où l'image sera sauvegardée
    return f"profile_images/{filename}"

def default_profile_image():
    """
    Fonction pour fournir une image de profil par défaut.
    """
    return "profile_images/default.png"


class CustomUser(AbstractBaseUser, PermissionsMixin):

    first_name = models.CharField(_("First name"), max_length=50, blank=True)
    last_name = models.CharField(_("Last name"), max_length=50, blank=True)
    phone = models.CharField(_("Phone"), max_length=15, unique=True)
    email = models.EmailField(_("Email address"), unique=True)
    # profile_img = models.ImageField(_("Image de profil"), upload_to=upload_profile_image, blank=True, null=True)

    # Additional fields
    is_staff = models.BooleanField(_("Staff"), default=False)
    is_admin = models.BooleanField(_("Administrateur"), default=False)
    is_superuser = models.BooleanField(_("Superutilisateur"), default=False)
    is_active = models.BooleanField(_("Actif"), default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Specify email and phone as unique identifiers
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        db_table = 'custom_user'
        db_table_comment = 'Custom user table with email and phone as unique identifiers.'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    

class Administrator(models.Model):
    USER_ROLES = [
        ('admin', 'Admin'),
        ('MANAGER', 'Gerant'),
        ('Agent', 'Agent'),
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="company_admins", null=True, blank=True)
    type_user = models.CharField(_("User Type"), max_length=20, choices=USER_ROLES, default='agent')

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.company.company_name}"