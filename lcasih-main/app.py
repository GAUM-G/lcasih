from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes.signup import signup_bp
from routes.login import login_bp
from routes.index import index_bp 
from routes.logout import logout_bp
from routes.formdata import formdata_bp

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # ADD THIS LINE FOR SESSIONS
CORS(app)

# MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/lcasih_db"
mongo = PyMongo(app)
app.config["MONGO"] = mongo

# Register blueprints
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(index_bp)  
app.register_blueprint(logout_bp)
app.register_blueprint(formdata_bp)

if __name__ == "__main__":
    app.run(debug=True)