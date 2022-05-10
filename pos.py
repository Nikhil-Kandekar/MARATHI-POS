from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import nltk
import nest_asyncio
from pyngrok import ngrok
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


with open('marathi_pos.pkl', 'rb') as fin:
    model_loaded = pickle.load(fin)
    
@app.get('/getpos')
async def getpos(sentence):
    print(sentence)
    nltk_tokens = nltk.word_tokenize(sentence)
    result=model_loaded.tag(nltk_tokens)
    return {"POS":result}

nest_asyncio.apply()
uvicorn.run(app, port=8765)