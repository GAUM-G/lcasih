from flask import Blueprint, render_template, request, jsonify, current_app, session

login_bp = Blueprint("login", __name__, template_folder="../templates")

@login_bp.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")

@login_bp.route("/login", methods=["POST"])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    mongo = current_app.config["MONGO"]
    
    # Find user with matching email and password
    user = mongo.db.users.find_one({"email": email, "password": password})

    if user:
        # Check if username exists, otherwise use email or a default
        username = user.get('username')
        
        if not username:
            # If no username field, use the email (without @domain) as username
            username = email.split('@')[0]
        
        session['username'] = username
        session['email'] = email  # ADD THIS LINE to store email in session
        
        return jsonify({
            "message": "Login successful", 
            "username": username,
            "success": True
        }), 200
    else:
        return jsonify({"message": "Invalid email or password", "success": False}), 401