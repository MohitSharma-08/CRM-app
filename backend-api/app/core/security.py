from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

MAX_BCRYPT_BYTES = 72

def _truncate_password(password: str) -> str:
    b = password.encode("utf-8")
    if len(b) > MAX_BCRYPT_BYTES:
        b = b[:MAX_BCRYPT_BYTES]
        return b.decode("utf-8", errors="ignore")
    return password

def hash_password(password: str) -> str:
    pw = _truncate_password(password)
    return pwd_context.hash(pw)

def verify_password(plain: str, hashed: str) -> bool:
    pw = _truncate_password(plain)
    return pwd_context.verify(pw, hashed)