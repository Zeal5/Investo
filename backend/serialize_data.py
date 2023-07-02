import pandas as pd


def serialize_data(data):
    df = pd.read_csv(data)
    print(df)
    print(df.to_string)
    
