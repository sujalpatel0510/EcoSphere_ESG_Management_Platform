from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models.governance import GovernancePolicy

governance_bp = Blueprint('governance', __name__)


@governance_bp.route('/policies', methods=['GET'])
def get_policies():
    policies = GovernancePolicy.query.order_by(GovernancePolicy.created_at.desc()).all()
    return jsonify([policy.to_dict() for policy in policies]), 200


@governance_bp.route('/policies', methods=['POST'])
def create_policy():
    data = request.get_json(silent=True) or {}
    policy = GovernancePolicy(
        name=data.get('name') or 'Untitled Policy',
        category=data.get('category') or 'Compliance',
        status=data.get('status') or 'Pending Approval',
        version=data.get('version') or 'v1.0',
        last_updated=data.get('lastUpdated') or data.get('last_updated'),
        next_review=data.get('nextReview') or data.get('next_review'),
        coverage=data.get('coverage') or '0%',
    )
    db.session.add(policy)
    db.session.commit()
    return jsonify(policy.to_dict()), 201


@governance_bp.route('/policies/<int:id>', methods=['PUT'])
def update_policy(id):
    policy = GovernancePolicy.query.get_or_404(id)
    data = request.get_json(silent=True) or {}

    for field in ['name', 'category', 'status', 'version', 'coverage']:
        if field in data:
            setattr(policy, field, data[field])
    if 'lastUpdated' in data:
        policy.last_updated = data['lastUpdated']
    if 'nextReview' in data:
        policy.next_review = data['nextReview']

    db.session.commit()
    return jsonify(policy.to_dict()), 200


@governance_bp.route('/policies/<int:id>', methods=['DELETE'])
def delete_policy(id):
    policy = GovernancePolicy.query.get_or_404(id)
    db.session.delete(policy)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'}), 200
