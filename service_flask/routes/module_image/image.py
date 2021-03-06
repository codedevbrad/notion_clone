from flask_restful import Resource
from flask import request , flash, request, redirect, url_for , send_from_directory
from werkzeug.utils import secure_filename
import os
from flask import current_app as app

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
basedir = os.path.abspath( os.path.dirname(__file__))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class API_Images( Resource ):
        def get( self ):
            filename = request.args.get('url')
            return send_from_directory(  app.config['UPLOAD_FOLDER'] , filename )

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
