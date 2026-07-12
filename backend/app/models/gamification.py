from datetime import datetime

from app.extensions import db


class Badge(db.Model):
    __tablename__ = 'gamification_badges'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    rarity = db.Column(db.String(50), default='Common')
    criteria = db.Column(db.Text)
    color = db.Column(db.String(100), default='bg-gray-100 text-gray-700')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'rarity': self.rarity,
            'criteria': self.criteria,
            'color': self.color,
        }


class Achievement(db.Model):
    __tablename__ = 'gamification_achievements'

    id = db.Column(db.Integer, primary_key=True)
    badge_name = db.Column(db.String(150), nullable=False)
    user = db.Column(db.String(150), nullable=False)
    date = db.Column(db.String(50))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'badgeName': self.badge_name,
            'user': self.user,
            'date': self.date,
            'description': self.description,
        }
