from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models.environmental_entities import CarbonTransaction, EmissionFactor, AuditRecord, AuditFinding, DiversityInitiative, Challenge

operations_bp = Blueprint('operations', __name__)


@operations_bp.route('/carbon-transactions', methods=['GET'])
def get_transactions():
    transactions = CarbonTransaction.query.order_by(CarbonTransaction.created_at.desc()).all()
    return jsonify([item.to_dict() for item in transactions]), 200


@operations_bp.route('/carbon-transactions', methods=['POST'])
def create_transaction():
    data = request.get_json(silent=True) or {}
    item = CarbonTransaction(
        date=data.get('date') or '',
        department=data.get('department') or 'Operations',
        source=data.get('source') or '',
        quantity=float(data.get('quantity') or 0),
        unit=data.get('unit') or 'unit',
        co2_equivalent=float(data.get('co2Equivalent') or data.get('co2_equivalent') or 0),
        factor=float(data.get('factor') or 0),
        status=data.get('status') or 'Pending',
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@operations_bp.route('/emission-factors', methods=['GET'])
def get_emission_factors():
    factors = EmissionFactor.query.order_by(EmissionFactor.created_at.desc()).all()
    return jsonify([item.to_dict() for item in factors]), 200


@operations_bp.route('/emission-factors', methods=['POST'])
def create_emission_factor():
    data = request.get_json(silent=True) or {}
    item = EmissionFactor(
        name=data.get('name') or 'Untitled Factor',
        unit=data.get('unit') or 'unit',
        co2_factor=float(data.get('co2Factor') or data.get('co2_factor') or 0),
        category=data.get('category') or 'Energy',
        source=data.get('source') or 'Manual',
        status=data.get('status') or 'Active',
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@operations_bp.route('/audits', methods=['GET'])
def get_audits():
    audits = AuditRecord.query.order_by(AuditRecord.created_at.desc()).all()
    return jsonify([item.to_dict() for item in audits]), 200


@operations_bp.route('/audits', methods=['POST'])
def create_audit():
    data = request.get_json(silent=True) or {}
    item = AuditRecord(
        name=data.get('name') or 'Untitled Audit',
        audit_type=data.get('type') or 'Internal',
        scope=data.get('scope') or '',
        auditor=data.get('auditor') or 'Internal Team',
        start_date=data.get('startDate') or '',
        end_date=data.get('endDate') or '',
        status=data.get('status') or 'Scheduled',
        findings=data.get('findings') or 'N/A',
        issues=int(data.get('issues') or 0),
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@operations_bp.route('/audit-findings', methods=['GET'])
def get_audit_findings():
    findings = AuditFinding.query.order_by(AuditFinding.created_at.desc()).all()
    return jsonify([item.to_dict() for item in findings]), 200


@operations_bp.route('/audit-findings', methods=['POST'])
def create_audit_finding():
    data = request.get_json(silent=True) or {}
    item = AuditFinding(
        audit_name=data.get('auditName') or 'General Audit',
        finding=data.get('finding') or '',
        severity=data.get('severity') or 'Minor',
        responsible=data.get('responsible') or 'Team',
        due_date=data.get('dueDate') or '',
        status=data.get('status') or 'Open',
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@operations_bp.route('/diversity-initiatives', methods=['GET'])
def get_diversity_initiatives():
    initiatives = DiversityInitiative.query.order_by(DiversityInitiative.created_at.desc()).all()
    return jsonify([item.to_dict() for item in initiatives]), 200


@operations_bp.route('/diversity-initiatives', methods=['POST'])
def create_diversity_initiative():
    data = request.get_json(silent=True) or {}
    item = DiversityInitiative(
        name=data.get('name') or 'Untitled Initiative',
        target=data.get('target') or '',
        current=data.get('current') or '',
        status=data.get('status') or 'In Progress',
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@operations_bp.route('/challenges', methods=['GET'])
def get_challenges():
    challenges = Challenge.query.order_by(Challenge.created_at.desc()).all()
    return jsonify([item.to_dict() for item in challenges]), 200


@operations_bp.route('/challenges', methods=['POST'])
def create_challenge():
    data = request.get_json(silent=True) or {}
    item = Challenge(
        name=data.get('name') or 'Untitled Challenge',
        description=data.get('description') or '',
        start_date=data.get('startDate') or '',
        end_date=data.get('endDate') or '',
        participants=int(data.get('participants') or 0),
        completed=int(data.get('completed') or 0),
        reward=data.get('reward') or 'Points',
        difficulty=data.get('difficulty') or 'Medium',
        status=data.get('status') or 'Active',
        progress=int(data.get('progress') or 0),
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201
