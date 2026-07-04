from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pathlib import Path
import os

# Load environment variables from the utils/.env file
load_dotenv(Path(__file__).resolve().parent.parent / "utils" / ".env")

# ---- Configuration ----
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLAMA_MODEL = "llama-3.3-70b-versatile"

# ---- LLM Instance ----
llm = ChatGroq(
    model=LLAMA_MODEL,
    groq_api_key=GROQ_API_KEY,
)


def get_llm() -> ChatGroq:
    """Return the shared LLM instance."""
    return llm


def chat_without_memory(query: str) -> str:
    """
    Simple one-shot chat with no conversation history.
    Equivalent to the Colab `chat_without_memory` function.
    """
    response = llm.invoke(query)
    return response.content
