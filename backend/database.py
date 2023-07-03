from sqlalchemy import create_engine, Column,DateTime, Integer, String, Float, BigInteger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class MyTable(Base):
    __tablename__ = 'OHLC'
    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime)
    close = Column(Float)
    high = Column(Float)
    low = Column(Float)
    open =Column(Float)
    volumn = Column(BigInteger)
    ticker = Column(String(15))



engine = create_engine('postgresql://postgres:zeal@localhost:5432/investo')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
