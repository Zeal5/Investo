from fastapi import FastAPI,UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from serialize_data import serialize_data

app = FastAPI() #max_request_size=100 * 1024 * 1024
origins = [
    "http://localhost:3000",  # Add the origin of your React application
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"Hello": "World"}



@app.post("/upload")
async def upload_data(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        serialize_data(contents)
        return {"message":"uploaded successfully"}
    except Exception as e:
        print(e)
        return {"message":e}
