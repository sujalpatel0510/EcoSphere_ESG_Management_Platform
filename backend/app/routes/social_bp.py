from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.social import CSRInitiative

social_bp = Blueprint('social', __name__)

@social_bp.route('/csr-initiatives', methods=['GET'])
def get_csr_initiatives():
    initiatives = CSRInitiative.query.all()
    return jsonify([init.to_dict() for init in initiatives]), 200

@social_bp.route('/csr-initiatives', methods=['POST'])
def create_csr_initiative():
    data = request.json
    new_initiative = CSRInitiative(
        name=data.get('name'),
        description=data.get('description'),
        impact=data.get('impact'),
        budget=data.get('budget'),
        status=data.get('status', 'Planning'),
        category=data.get('category'),
        start_date=data.get('startDate'),
        team=int(data.get('team', 0))
    )
    db.session.add(new_initiative)
    db.session.commit()
    return jsonify(new_initiative.to_dict()), 201

@social_bp.route('/csr-initiatives/<int:id>', methods=['DELETE'])
def delete_csr_initiative(id):
    initiative = CSRInitiative.query.get_or_404(id)
    db.session.delete(initiative)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'}), 200
