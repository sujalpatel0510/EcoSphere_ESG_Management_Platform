from app.extensions import db
from datetime import datetime

class Policy(db.Model):
    __tablename__ = 'policies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Draft')
    description = db.Column(db.Text)
    effective_date = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'category': self.category,
                'status': self.status, 'description': self.description,
                'effectiveDate': self.effective_date}

class Risk(db.Model):
    __tablename__ = 'risks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100))
    likelihood = db.Column(db.String(50))
    impact = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Open')
    mitigation = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'category': self.category,
                'likelihood': self.likelihood, 'impact': self.impact,
                'status': self.status, 'mitigation': self.mitigation}

class BoardMember(db.Model):
    __tablename__ = 'board_members'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(100))
    committee = db.Column(db.String(100))
    tenure = db.Column(db.String(50))
    independent = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'role': self.role,
                'committee': self.committee, 'tenure': self.tenure,
                'independent': self.independent}

class Audit(db.Model):
    __tablename__ = 'audits'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    type = db.Column(db.String(100))
    auditor = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Scheduled')
    date = db.Column(db.String(50))
    findings = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'type': self.type,
                'auditor': self.auditor, 'status': self.status,
                'date': self.date, 'findings': self.findings}
