
from typing import Optional

from pydantic import BaseModel

class JobCreate(BaseModel):
    name: str
    Salary : int


class JobUpdate(BaseModel):
    name: Optional[str] = None
    Salary: Optional[int] = None
