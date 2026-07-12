from datetime import datetime

from app.extensions import db


class EnvironmentalGoal(db.Model):
    __tablename__ = 'environmental_goals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    target = db.Column(db.String(150))
    current = db.Column(db.Float, default=0)
    baseline = db.Column(db.Float, default=0)
    current_value = db.Column(db.Float, default=0)
    unit = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Planning')
    department = db.Column(db.String(100))
    start_date = db.Column(db.String(50))
    deadline = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'target': self.target,
            'current': self.current,
            'baseline': self.baseline,
            'currentValue': self.current_value,
            'unit': self.unit,
            'status': self.status,
            'department': self.department,
            'startDate': self.start_date,
            'deadline': self.deadline,
        }
