from flask import Blueprint, request, jsonify, current_app, session
from datetime import datetime

formdata_bp = Blueprint("formdata", __name__)

@formdata_bp.route("/save-form-data", methods=["POST"])
def save_form_data():
    try:
        data = request.json
        
        # Get user email from session (you might need to store email in session during login)
        user_email = session.get('email')
        username = session.get('username')
        
        if not user_email:
            return jsonify({"success": False, "message": "User not logged in"}), 401
        
        # Access MongoDB
        mongo = current_app.config["MONGO"]
        
        # Prepare document to save
        form_document = {
            "user_email": user_email,
            "username": username,
            "form_data": data,
            "submitted_at": datetime.utcnow()
        }
        
        # Insert into MongoDB
        result = mongo.db.user_form_data.insert_one(form_document)
        
        return jsonify({
            "success": True, 
            "message": "Form data saved successfully",
            "inserted_id": str(result.inserted_id)
        })
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500