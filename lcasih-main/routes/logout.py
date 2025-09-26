from flask import Blueprint, session, jsonify

logout_bp = Blueprint("logout", __name__)

@logout_bp.route("/logout", methods=["POST"])
def logout_user():
    # Clear both username and email from session
    session.pop('username', None)
    session.pop('email', None)  # ADD THIS LINE
    return jsonify({"success": True, "message": "Logged out successfully"})