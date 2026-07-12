from datetime import datetime

from app.extensions import db


class GovernancePolicy(db.Model):
    __tablename__ = 'governance_policies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Pending Approval')
    version = db.Column(db.String(50))
    last_updated = db.Column(db.String(50))
    next_review = db.Column(db.String(50))
    coverage = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'status': self.status,
            'version': self.version,
            'lastUpdated': self.last_updated,
            'nextReview': self.next_review,
            'coverage': self.coverage,
        }
