from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.social import CSRInitiative

social_bp = Blueprint('social', __name__)


@social_bp.route('/csr-initiatives', methods=['GET'])
def get_csr_initiatives():
    initiatives = CSRInitiative.query.order_by(CSRInitiative.created_at.desc()).all()
    return jsonify([init.to_dict() for init in initiatives]), 200


@social_bp.route('/csr-initiatives', methods=['POST'])
def create_csr_initiative():
    data = request.get_json(silent=True) or {}
    new_initiative = CSRInitiative(
        name=data.get('name') or 'Untitled Initiative',
        description=data.get('description') or 'No description provided',
        impact=data.get('impact') or 'N/A',
        budget=data.get('budget') or '$0',
        status=data.get('status') or 'Planning',
        category=data.get('category') or 'Social',
        start_date=data.get('startDate') or data.get('start_date'),
        team=int(data.get('team') or 0),
    )
    db.session.add(new_initiative)
    db.session.commit()
    return jsonify(new_initiative.to_dict()), 201


@social_bp.route('/csr-initiatives/<int:id>', methods=['PUT'])
def update_csr_initiative(id):
    initiative = CSRInitiative.query.get_or_404(id)
    data = request.get_json(silent=True) or {}

    if 'name' in data:
        initiative.name = data['name']
    if 'description' in data:
        initiative.description = data['description']
    if 'impact' in data:
        initiative.impact = data['impact']
    if 'budget' in data:
        initiative.budget = data['budget']
    if 'status' in data:
        initiative.status = data['status']
    if 'category' in data:
        initiative.category = data['category']
    if 'startDate' in data:
        initiative.start_date = data['startDate']
    if 'start_date' in data:
        initiative.start_date = data['start_date']
    if 'team' in data:
        initiative.team = int(data['team'])

    db.session.commit()
    return jsonify(initiative.to_dict()), 200


@social_bp.route('/csr-initiatives/<int:id>', methods=['DELETE'])
def delete_csr_initiative(id):
    initiative = CSRInitiative.query.get_or_404(id)
    db.session.delete(initiative)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'}), 200
