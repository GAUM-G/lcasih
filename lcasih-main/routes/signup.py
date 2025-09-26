from flask import Blueprint, request, jsonify, render_template, current_app
import datetime

signup_bp = Blueprint("signup", __name__, template_folder="../templates")

@signup_bp.route("/", methods=["GET"])
def signup_page():
    return render_template("signup.html")

@signup_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    mongo = current_app.config["MONGO"]  # <-- get PyMongo from app

    # Insert into MongoDB
    user_id = mongo.db.users.insert_one({
        "name": name,
        "email": email,
        "password": password,
        "created_at": datetime.datetime.utcnow()
    }).inserted_id

    return jsonify({"message": "User created successfully", "id": str(user_id)}), 201
