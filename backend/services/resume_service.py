import os 
from pathlib import Path
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
llm = ChatGroq(
    model= "llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)

resume_prompt = ChatPromptTemplate.from_messages([
    ("system", """ You are a Professional resume Analyser.
Analyse the given resume text and provide
1.key skills found 
2. Experience level(Junior/Mid/Senior)
3. Strengths
4.Areas to improve
5.Suggested Job Roles
Keep the analysis short and structured."""),
    ("human","{resume_text}")
])

resume_chain = resume_prompt | llm 

def analyse_resume(resume_text : str) -> str:
    response = resume_chain.invoke({"resume_text":resume_text})
    return response.content
