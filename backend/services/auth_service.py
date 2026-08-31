from passlib.context import CryptContext

# Set up password hashing algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hashes plain text password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Checks if plain text password matches hashed password."""
    return pwd_context.verify(plain_password, hashed_password)