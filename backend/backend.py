from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import datetime
from database import MyTable, SessionLocal, engine, Base
import pandas as pd
import io

Base.metadata.create_all(engine)

app = FastAPI()  # max_request_size=100 * 1024 * 1024
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
    db = SessionLocal()

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        df = pd.DataFrame(df)

        try:
            df.to_sql("OHLC", con=engine, index=False, if_exists="append")
        except ValueError as v:
            return {"message": f"error: {v}"}
        return {"message": "uploaded successfully"}
    except Exception as e:
        print(str(e))
        return {"message": f"error: {e}"}
