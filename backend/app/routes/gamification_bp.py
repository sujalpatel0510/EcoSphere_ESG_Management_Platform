from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models.gamification import Achievement, Badge

gamification_bp = Blueprint('gamification', __name__)


@gamification_bp.route('/badges', methods=['GET'])
def get_badges():
    badges = Badge.query.order_by(Badge.created_at.desc()).all()
    return jsonify([badge.to_dict() for badge in badges]), 200


@gamification_bp.route('/badges', methods=['POST'])
def create_badge():
    data = request.get_json(silent=True) or {}
    badge = Badge(
        name=data.get('name') or 'Untitled Badge',
        description=data.get('description') or '',
        rarity=data.get('rarity') or 'Common',
        criteria=data.get('criteria') or '',
        color=data.get('color') or 'bg-gray-100 text-gray-700',
    )
    db.session.add(badge)
    db.session.commit()
    return jsonify(badge.to_dict()), 201


@gamification_bp.route('/badges/<int:id>', methods=['PUT'])
def update_badge(id):
    badge = Badge.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    for field in ['name', 'description', 'rarity', 'criteria', 'color']:
        if field in data:
            setattr(badge, field, data[field])
    db.session.commit()
    return jsonify(badge.to_dict()), 200


@gamification_bp.route('/badges/<int:id>', methods=['DELETE'])
def delete_badge(id):
    badge = Badge.query.get_or_404(id)
    db.session.delete(badge)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'}), 200


@gamification_bp.route('/achievements', methods=['GET'])
def get_achievements():
    achievements = Achievement.query.order_by(Achievement.created_at.desc()).all()
    return jsonify([achievement.to_dict() for achievement in achievements]), 200


@gamification_bp.route('/achievements', methods=['POST'])
def create_achievement():
    data = request.get_json(silent=True) or {}
    achievement = Achievement(
        badge_name=data.get('badgeName') or data.get('badge_name') or 'Unknown Badge',
        user=data.get('user') or 'Unknown User',
        date=data.get('date') or '',
        description=data.get('description') or '',
    )
    db.session.add(achievement)
    db.session.commit()
    return jsonify(achievement.to_dict()), 201


@gamification_bp.route('/achievements/<int:id>', methods=['PUT'])
def update_achievement(id):
    achievement = Achievement.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    for field in ['badgeName', 'badge_name', 'user', 'date', 'description']:
        if field in data:
            setattr(achievement, 'badge_name' if field == 'badgeName' or field == 'badge_name' else field, data[field])
    db.session.commit()
    return jsonify(achievement.to_dict()), 200


@gamification_bp.route('/achievements/<int:id>', methods=['DELETE'])
def delete_achievement(id):
    achievement = Achievement.query.get_or_404(id)
    db.session.delete(achievement)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'}), 200
