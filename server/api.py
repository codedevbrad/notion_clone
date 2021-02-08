from flask_restful import Api , Resource
from routes.home import HelloWorld
import os
from flask import Flask , request , flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os
import cloudinary
import cloudinary.uploader as cloudUpload
load_dotenv()

cloudinary.config.update = ({
    "cloud_name":  os.environ.get('cloud_name') ,
    "api_key":     os.environ.get('cloud_key')  ,
    "api_secret":  os.environ.get('cloud_secret')
})

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

UPLOAD_FOLDER = './uploads'
basedir = os.path.abspath(os.path.dirname(__file__))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class API_Images( Resource ):
        def post( self):

            file = request.files['file']
            if file.filename == '':
                return {
                  "body":"no file selected"
                }
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join( basedir , app.config['UPLOAD_FOLDER'] , filename))
                return {
                    "body":"saved"
                }

class Api_cloudinary( Resource ):
      def post( self ):
          file = request.files['file']
          if file.filename == '':
              return {
                "body":"no file selected"
              }
          if file and allowed_file(file.filename):
              filename = secure_filename(file.filename)
              print( file , filename )
              cloudinary.uploader.upload( file )
              return {
                "data": "hey"
              }

app = Flask(__name__)
api = Api( app )
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

api.add_resource( HelloWorld     , "/" )
api.add_resource( API_Images     , '/image' )
api.add_resource( Api_cloudinary , '/cloudinary' )

if __name__ == "__main__":
    app.run( debug=True )
