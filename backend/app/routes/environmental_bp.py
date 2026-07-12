from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models.environmental import EnvironmentalGoal

environmental_bp = Blueprint('environmental', __name__)


@environmental_bp.route('/goals', methods=['GET'])
def get_goals():
    goals = EnvironmentalGoal.query.order_by(EnvironmentalGoal.created_at.desc()).all()
    return jsonify([goal.to_dict() for goal in goals]), 200


@environmental_bp.route('/goals', methods=['POST'])
def create_goal():
    data = request.get_json(silent=True) or {}
    goal = EnvironmentalGoal(
        name=data.get('name') or 'Untitled Goal',
        target=data.get('target') or 'TBD',
        current=float(data.get('current') or 0),
        baseline=float(data.get('baseline') or 0),
        current_value=float(data.get('currentValue') or data.get('current') or 0),
        unit=data.get('unit') or '',
        status=data.get('status') or 'Planning',
        department=data.get('department') or 'All',
        start_date=data.get('startDate') or data.get('start_date'),
        deadline=data.get('deadline'),
    )
    db.session.add(goal)
    db.session.commit()
    return jsonify(goal.to_dict()), 201


@environmental_bp.route('/goals/<int:id>', methods=['PUT'])
def update_goal(id):
    goal = EnvironmentalGoal.query.get_or_404(id)
    data = request.get_json(silent=True) or {}

    for field in ['name', 'target', 'unit', 'status', 'department', 'startDate', 'deadline']:
        if field in data:
            setattr(goal, {'startDate': 'start_date', 'deadline': 'deadline'}.get(field, field), data[field])
    if 'current' in data:
        goal.current = float(data['current'])
    if 'baseline' in data:
        goal.baseline = float(data['baseline'])
    if 'currentValue' in data:
        goal.current_value = float(data['currentValue'])
    if 'start_date' in data:
        goal.start_date = data['start_date']

    db.session.commit()
    return jsonify(goal.to_dict()), 200


@environmental_bp.route('/goals/<int:id>', methods=['DELETE'])
def delete_goal(id):
    goal = EnvironmentalGoal.query.get_or_404(id)
    db.session.delete(goal)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'}), 200
