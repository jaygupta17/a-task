from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests,os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/enrich")
async def fetch(website:str = "",company:str = ""):
    if not company and not website:
        return {"error" : "Any one parameter is required"}
    try:
        res=requests.get(f"https://api.peopledatalabs.com/v5/company/enrich?website={website or ""}&name={company or ""}",headers={"X-API-Key":os.getenv("API_KEY")})
        print(res.json())
        return res.json()
    except Exception as e:
        return {"error" : str(e)}