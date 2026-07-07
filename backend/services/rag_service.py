import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from services.qdrant_service import search_jobs

load_dotenv(Path(__file__).resolve().parent.parent / "utils" / ".env")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)

rag_prompt = ChatPromptTemplate.from_messages([
    ("system", """ you are a job search assistant.
    use the following job listing retrieved from the database to answer If no relevent jobs are found , say so clearly.
    
    Retrieved Jobs:
    {context}"""),
    ("human","{question}")

])

rag_chain = rag_prompt | llm


def rag_job_search(question:str) -> str:
    results = search_jobs(question,top_k=5)
    if not results:
        return "No jobs found in the database . Please embed job first using the / rag/embed-jobs endpoint."

    context = "\n".join([
        f" - {r['title']}: {r['description']} (salary:{r['salary']}, Match:{r['score']})"
        for r in results
    ])

    response= rag_chain.invoke({"context":context, "question":question})
    return response.content

    