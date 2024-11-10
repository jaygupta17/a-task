from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests,os,asyncio,httpx
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
        return {"status":400,"message" : "Any one parameter is required"}
    try:
        res=requests.get(f"https://api.peopledatalabs.com/v5/company/enrich?website={website or ''}&name={company or ''}",headers={"X-API-Key":os.getenv("API_KEY")})
        print(res.json())
        return res.json()
    except Exception as e:
        return {"status":400,"message" : str(e)}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

async def keep_alive():
    async with httpx.AsyncClient() as client:
        while True:
            try:
                response = await client.get("https://task-api-yj7z.onrender.com/health")
                print(f"Health check status: {response.status_code}")
            except Exception as e:
                print(f"Health check failed: {str(e)}")
            await asyncio.sleep(60)  # 1 minute

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(keep_alive())