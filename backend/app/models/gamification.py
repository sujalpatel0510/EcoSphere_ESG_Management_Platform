from app.extensions import db
from datetime import datetime

class LeaderboardEntry(db.Model):
    __tablename__ = 'leaderboard'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    department = db.Column(db.String(100))
    points = db.Column(db.Integer, default=0)
    badges = db.Column(db.Integer, default=0)
    avatar = db.Column(db.String(10), default='🌱')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'department': self.department,
                'points': self.points, 'badges': self.badges, 'avatar': self.avatar}

class Challenge(db.Model):
    __tablename__ = 'challenges'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    points = db.Column(db.Integer, default=0)
    category = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Active')
    deadline = db.Column(db.String(50))
    participants = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'description': self.description,
                'points': self.points, 'category': self.category, 'status': self.status,
                'deadline': self.deadline, 'participants': self.participants}

class Badge(db.Model):
    __tablename__ = 'badges'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(10), default='🏆')
    category = db.Column(db.String(100))
    points_required = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'description': self.description,
                'icon': self.icon, 'category': self.category,
                'pointsRequired': self.points_required}

class Reward(db.Model):
    __tablename__ = 'rewards'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    points_cost = db.Column(db.Integer, default=0)
    category = db.Column(db.String(100))
    available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'description': self.description,
                'pointsCost': self.points_cost, 'category': self.category,
                'available': self.available}
