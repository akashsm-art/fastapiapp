
from typing import Optional

from pydantic import BaseModel

class companyCreate(BaseModel):
    name: str
    location: str


class companyUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
