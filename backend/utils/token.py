from fastapi import HTTPException
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from pathlib import Path
from models.users import User
from sqlalchemy.orm import Session

# Load .env from the utils directory explicitly
load_dotenv(Path(__file__).resolve().parent / ".env")
SECRETE_KEY = os.getenv("SECRETE_KEY") 
ALGORITHM = os.getenv("ALGORITHM")

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=SECRETE_KEY, algorithm=ALGORITHM)
    return encoded_jwt
    
    
def verify_access_token(token: str, db: Session, key=SECRETE_KEY, algorithms=ALGORITHM):
    try:
        to_decode = jwt.decode(token, key, algorithms=[algorithms])
        user_id = to_decode.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    current_user = db.query(User).filter(User.id == int(user_id)).first()
    if current_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return current_user
