from flask_restful import Resource
import os
class HelloWorld( Resource ):
        def get(self):
            variable = os.environ.get('api_token')
            return {
                "data" : variable
            }
        def post( self):
            return {
                "data" : "posting data"
            }
