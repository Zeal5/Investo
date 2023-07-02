from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class MyTable(Base):
    __tablename__ = 'my_table'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

# Create the table
engine = create_engine('postgresql://postgres:zeal@localhost:5432/investo')
Session = sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(engine)