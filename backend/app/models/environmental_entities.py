from datetime import datetime

from app.extensions import db


class CarbonTransaction(db.Model):
    __tablename__ = 'carbon_transactions'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))
    department = db.Column(db.String(100))
    source = db.Column(db.String(150))
    quantity = db.Column(db.Float, default=0)
    unit = db.Column(db.String(50))
    co2_equivalent = db.Column(db.Float, default=0)
    factor = db.Column(db.Float, default=0)
    status = db.Column(db.String(50), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'department': self.department,
            'source': self.source,
            'quantity': self.quantity,
            'unit': self.unit,
            'co2Equivalent': self.co2_equivalent,
            'factor': self.factor,
            'status': self.status,
        }


class EmissionFactor(db.Model):
    __tablename__ = 'emission_factors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    unit = db.Column(db.String(50))
    co2_factor = db.Column(db.Float, default=0)
    category = db.Column(db.String(100))
    source = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'unit': self.unit,
            'co2Factor': self.co2_factor,
            'category': self.category,
            'source': self.source,
            'status': self.status,
        }


class AuditRecord(db.Model):
    __tablename__ = 'audit_records'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    audit_type = db.Column(db.String(100))
    scope = db.Column(db.String(200))
    auditor = db.Column(db.String(150))
    start_date = db.Column(db.String(50))
    end_date = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Scheduled')
    findings = db.Column(db.String(150))
    issues = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.audit_type,
            'scope': self.scope,
            'auditor': self.auditor,
            'startDate': self.start_date,
            'endDate': self.end_date,
            'status': self.status,
            'findings': self.findings,
            'issues': self.issues,
        }


class AuditFinding(db.Model):
    __tablename__ = 'audit_findings'

    id = db.Column(db.Integer, primary_key=True)
    audit_name = db.Column(db.String(150), nullable=False)
    finding = db.Column(db.Text)
    severity = db.Column(db.String(50), default='Minor')
    responsible = db.Column(db.String(150))
    due_date = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Open')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'auditName': self.audit_name,
            'finding': self.finding,
            'severity': self.severity,
            'responsible': self.responsible,
            'dueDate': self.due_date,
            'status': self.status,
        }


class DiversityInitiative(db.Model):
    __tablename__ = 'diversity_initiatives'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    target = db.Column(db.String(150))
    current = db.Column(db.String(100))
    status = db.Column(db.String(50), default='In Progress')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'target': self.target,
            'current': self.current,
            'status': self.status,
        }


class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    start_date = db.Column(db.String(50))
    end_date = db.Column(db.String(50))
    participants = db.Column(db.Integer, default=0)
    completed = db.Column(db.Integer, default=0)
    reward = db.Column(db.String(100))
    difficulty = db.Column(db.String(50), default='Medium')
    status = db.Column(db.String(50), default='Active')
    progress = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'startDate': self.start_date,
            'endDate': self.end_date,
            'participants': self.participants,
            'completed': self.completed,
            'reward': self.reward,
            'difficulty': self.difficulty,
            'status': self.status,
            'progress': self.progress,
        }
