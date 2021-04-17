import pandas as pd
import numpy as np
import json
from ast import literal_eval
from fastapi import Body, FastAPI
from pydantic import BaseModel, Field

tags_metadata = [
    {
        "name": "recipes",
        "description": "Retrieve a number of recipes based on a query. Variables:\
        \n- query: str (what to search database for. Note: whitespaces should be replaced with %20)\
        \n- k: int (number of items requested)",
    },
    {
        "name": "seasonal",
        "description": "Get all the relevant seasonal and local food for a state and month. Variables:\
        \n- location: str (state of choice, possible values = 'alaska', 'alabama', 'arkansas', 'arizona', 'california',\
       'colorado', 'connecticut', 'delaware', 'florida', 'georgia',\
       'hawaii', 'iowa', 'idaho', 'illinois', 'indiana', 'kansas',\
       'kentucky', 'louisiana', 'massachusetts', 'maryland', 'maine',\
       'michigan', 'minnesota', 'missouri', 'mississippi', 'montana',\
       'north-carolina', 'north-dakota', 'nebraska', 'new-hampshire',\
       'new-jersey', 'new-mexico', 'nevada', 'new-york', 'ohio',\
       'oklahoma', 'oregon', 'pennsylvania', 'rhode-island',\
       'south-carolina', 'south-dakota', 'tennessee', 'texas', 'utah',\
       'virginia', 'vermont', 'washington', 'wisconsin', 'west-virginia','wyoming')\
        \n- month: str (month of choice, possible values = 'january', 'february', 'march', 'april', 'may', 'june', 'july',\
       'august', 'september', 'october', 'november', 'december')\
        \n- period: str (period within month, possible values = 'early', 'late')",
    },
]

app = FastAPI(
    title="Project INSERT-NAME-HERE",
    description="An API to support an awesome website for more sustainable recipe selection and grocery shopping!",
    version="1.0.0",
    openapi_tags=tags_metadata,
)

df = pd.read_csv('../data/recipes/RAW_recipes.csv')
df = df.dropna()
season_df = pd.read_csv('../data/seasonality.csv')

def query_df(query, k):
    search_list = query.split(" ")

    data_new = df.copy()

    for search in search_list:            
        data_new = data_new[data_new.name.str.contains(search)]

    recipe_count = data_new.shape[0]
    return_data = data_new.head(k)

    return recipe_count, return_data

@app.get("/recipes", tags=["recipes"])
async def query_recipes(query: str, count: int = 5):
    recipe_count, recipes = query_df(query, count)
    recipes['tags'] = recipes['tags'].apply(lambda x: literal_eval(str(x)))
    print('query: {}, recipe count: {}'.format(query, recipe_count))
    return recipes.to_json(orient="records")

@app.get("/seasonal", tags=["seasonal"])
async def query_seasonal_foods(location: str, month: str, period: str = 'early'):
    queried_food = season_df.query('state=="{}" & month=="{}" & period=="{}"'.format(location, month, period))
    queried_food['foods'] = queried_food['foods'].apply(lambda x: literal_eval(str(x)))
    return queried_food.to_json(orient="records")