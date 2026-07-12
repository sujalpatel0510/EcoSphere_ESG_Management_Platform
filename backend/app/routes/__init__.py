from flask import Blueprint
from .health import health_bp
from .social_bp import social_bp

def register_blueprints(app):
    app.register_blueprint(health_bp, url_prefix='/api')
    app.register_blueprint(social_bp, url_prefix='/api/social')
