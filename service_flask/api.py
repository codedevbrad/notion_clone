from flask_restful import Api, Resource
from flask_cors import CORS 
from routes.module_bookmark.bookmark import API_Bookmark
from routes.module_image.image import API_Images

from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

api = Api( app )
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class Home( Resource ):
        def get(self):
            variable = os.environ.get('api_token')
            return {
                "data" : 'variable'
            }
        def post( self):
            return {
                "data" : "posting data"
            }


api.add_resource( Home           , "/" )
api.add_resource( API_Images     , '/api/v0/image' )
api.add_resource( API_Bookmark   , '/api/v0/bookmark' )

if __name__ == "__main__":
    app.run( debug=True , port=5002 , host='0.0.0.0' )
