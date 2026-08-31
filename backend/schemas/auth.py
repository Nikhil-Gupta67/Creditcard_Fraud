from pydantic import BaseModel, EmailStr


class UserSignUp(BaseModel):
    fullName: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    message: str
    token: str
    email: str
    fullName: str