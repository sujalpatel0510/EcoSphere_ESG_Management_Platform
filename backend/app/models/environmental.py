from app.extensions import db
from datetime import datetime

class EmissionFactor(db.Model):
    __tablename__ = 'emission_factors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100))
    factor = db.Column(db.Float)
    unit = db.Column(db.String(50))
    source = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'category': self.category,
                'factor': self.factor, 'unit': self.unit, 'source': self.source}

class CarbonTransaction(db.Model):
    __tablename__ = 'carbon_transactions'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    amount = db.Column(db.Float)
    description = db.Column(db.Text)
    date = db.Column(db.String(50))
    status = db.Column(db.String(50), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'type': self.type, 'amount': self.amount,
                'description': self.description, 'date': self.date, 'status': self.status}

class EnvironmentalGoal(db.Model):
    __tablename__ = 'environmental_goals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    target = db.Column(db.String(100))
    current = db.Column(db.String(100))
    progress = db.Column(db.Integer, default=0)
    deadline = db.Column(db.String(50))
    status = db.Column(db.String(50), default='On Track')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'target': self.target,
                'current': self.current, 'progress': self.progress,
                'deadline': self.deadline, 'status': self.status}

class ProductProfile(db.Model):
    __tablename__ = 'product_profiles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(100))
    carbon_footprint = db.Column(db.Float)
    unit = db.Column(db.String(50))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'category': self.category,
                'carbonFootprint': self.carbon_footprint, 'unit': self.unit,
                'description': self.description}
