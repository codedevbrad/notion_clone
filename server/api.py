from flask_restful import Api , Resource
from routes.module_bookmark.bookmark import API_Bookmark
from routes.image import API_Images

from flask import Flask
from dotenv import load_dotenv
import os
import cloudinary

load_dotenv()

cloudinary.config.update = ({
    "cloud_name":  os.environ.get('cloud_name') ,
    "api_key":     os.environ.get('cloud_key')  ,
    "api_secret":  os.environ.get('cloud_secret')
})

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)
api = Api( app )
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class Home( Resource ):
        def get(self):
            variable = os.environ.get('api_token')
            return {
                "data" : variable
            }
        def post( self):
            return {
                "data" : "posting data"
            }


api.add_resource( Home           , "/" )
api.add_resource( API_Images     , '/image' )
api.add_resource( API_Bookmark   , '/bookmark' )

if __name__ == "__main__":
    app.run( debug=True )
