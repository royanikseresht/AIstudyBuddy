from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
import logging
from dotenv import load_dotenv

# Load API key
load_dotenv()
hf_api_key = os.getenv("HUGGINGFACE_API_KEY")

if not hf_api_key:
    raise ValueError("HUGGINGFACE_API_KEY is missing. Check your .env file.")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. You can restrict this to specific domains later
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class TextRequest(BaseModel):
    text: str
    length: str  # 'short', 'medium', or 'detailed'

@app.post("/summarize")
async def summarize_text(request: TextRequest):
    logger.info(f"Received request: {request.text[:50]}...")  # Log first 50 chars

    length_map = {"short": 50, "medium": 100, "detailed": 150}
    max_tokens = length_map.get(request.length, 60)

    response = requests.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        headers={"Authorization": f"Bearer {hf_api_key}"},
        json={
            "inputs": request.text,
            "parameters": {
                "max_length": max_tokens,
                "min_length": max_tokens // 2,
                "do_sample": False,  # Prevents randomness
                "num_beams": 6,  # Increased number of beams for better search
                "early_stopping": True,
                "no_repeat_ngram_size": 2,  # Prevents repetition
                "temperature": 0.7,  # Lower temperature for more focused output
                "top_p": 0.9  # Nucleus sampling to control diversity
            }
        }
    )

    if response.status_code == 200:
        response_json = response.json()
        if "error" in response_json:
            return {"error": response_json["error"]}
        try:
            summary = response_json[0]["summary_text"]
            return {"summary": summary}
        except (KeyError, IndexError):
            return {"error": "Unexpected response format from API"}
    else:
        return {"error": f"Error {response.status_code}: {response.text}"}

#uvicorn main:app --reload
#uvicorn main:app --host 0.0.0.0 --port 8000