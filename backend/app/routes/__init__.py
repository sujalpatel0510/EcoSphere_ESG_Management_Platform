from flask import Blueprint
from .health import health_bp
from .social_bp import social_bp
from .environmental_bp import environmental_bp
from .governance_bp import governance_bp
from .gamification_bp import gamification_bp
from .operations_bp import operations_bp


def register_blueprints(app):
    app.register_blueprint(health_bp, url_prefix='/api')
    app.register_blueprint(social_bp, url_prefix='/api/social')
    app.register_blueprint(environmental_bp, url_prefix='/api/environmental')
    app.register_blueprint(governance_bp, url_prefix='/api/governance')
    app.register_blueprint(gamification_bp, url_prefix='/api/gamification')
    app.register_blueprint(operations_bp, url_prefix='/api/operations')
