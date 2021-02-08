from flask import Flask , request , flash, request, redirect, url_for
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS, cross_origin
import os

def saveFavicon( url ):
    imageResponse = requests.get( favicon )
    file = open("sample_image.png" , "wb" )
    file.write( imageResponse.content )
    file.close()

def getFaviconURL(domain):
    if 'http' not in domain:
        domain = 'http://' + domain
    page = requests.get(domain)
    soup = BeautifulSoup(page.text, 'html.parser')
    icon_link = soup.find("link", rel="shortcut icon")
    if icon_link is None:
        icon_link = soup.find("link", rel="icon")
    if icon_link is None:
        return domain + '/favicon.ico'
    return icon_link["href"]

app = Flask(__name__ )
CORS(app)

@app.route('/' , methods=["GET"])
def home():
    bookmark_URL = request.args.get('url')

    page = requests.get( bookmark_URL )
    soup = BeautifulSoup( page.content, 'html.parser' )

    title   = soup.find('meta' , property="og:title" )
    favicon = getFaviconURL( bookmark_URL )
    desc    = soup.find('meta' , property="og:description" )

    return {
    "title": title["content"] ,
    "favicon": favicon ,
    "description": desc["content"]
    } , 200

@app.route('/image/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

app.run( debug=True )
