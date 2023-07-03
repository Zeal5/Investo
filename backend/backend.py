from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database import MyTable, SessionLocal, engine, Base
from sqlalchemy import text
import pandas as pd
import io

Base.metadata.create_all(engine)

app = FastAPI()
origins = [
    "http://localhost:3000",  
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
            return {"message": "uploaded successfully"}
        except ValueError as v:
            return {"message": f"Duplicate Data: {v}"}
    
    except Exception as e:
        print(str(e))
        return {"message": f"error: {e}"}
    finally:
        db.close()


@app.get("/download/{page_number}")
async def download_data(page_number :int):
    db = SessionLocal()
    query = text('SELECT * FROM "OHLC"')

    try:

        result = db.execute(query)

        rows = result.fetchall()
        data = []
        for row in rows:
            data.append({
                "datetime": row[0],
                "close": row[1],
                "high": row[2],
                "low": row[3],
                "open": row[4],
                "volume": row[5],
                "ticker": row[6]
            })
        at_page = 0 if page_number == 0 else (page_number * 20) + 1
        to_page = (page_number + 1) * 20
        print(at_page)
        print(to_page)
        return JSONResponse(data[at_page:to_page]) 

    except Exception as e:
        return {"message": f"Error: {str(e)}"}

    finally:
        db.close()
    
