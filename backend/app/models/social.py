from app.extensions import db
from datetime import datetime

class CSRInitiative(db.Model):
    __tablename__ = 'csr_initiatives'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    impact = db.Column(db.String(150))
    budget = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Planning')
    category = db.Column(db.String(100))
    start_date = db.Column(db.String(50))
    team = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'impact': self.impact,
            'budget': self.budget,
            'status': self.status,
            'category': self.category,
            'startDate': self.start_date,
            'team': self.team
        }
