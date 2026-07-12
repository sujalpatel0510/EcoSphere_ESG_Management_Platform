from flask import Blueprint, jsonify
from app.extensions import db
from sqlalchemy import text

health_bp = Blueprint('health', __name__)

@health_bp.route('/health')
def health_check():
    db_status = "connected"
    try:
        db.session.execute(text('SELECT 1'))
    except Exception as e:
        db_status = f"disconnected: {str(e)}"
        
    return jsonify({
        "status": "ok",
        "database": db_status
    }), 200
