from flask import Blueprint, render_template, session  # Add session here

index_bp = Blueprint("index", __name__, template_folder="../templates")

@index_bp.route("/index")
def index_page():
    # Get username from session
    username = session.get('username')
    return render_template("index.html", username=username)  # Pass username to template