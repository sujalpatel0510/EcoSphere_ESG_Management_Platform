import unittest

from app import create_app
from app.extensions import db


class TestOperationsAPI(unittest.TestCase):
    def setUp(self):
        class TestConfig:
            TESTING = True
            SECRET_KEY = 'test-secret'
            SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
            SQLALCHEMY_TRACK_MODIFICATIONS = False

        self.app = create_app(config_class=TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_operations_crud_endpoints(self):
        transaction_response = self.client.post('/api/operations/carbon-transactions', json={
            'date': '2024-07-15',
            'department': 'Operations',
            'source': 'Electricity',
            'quantity': 5000,
            'unit': 'kWh',
            'co2Equivalent': 1165,
            'factor': 0.233,
            'status': 'Pending',
        })
        self.assertEqual(transaction_response.status_code, 201)

        factor_response = self.client.post('/api/operations/emission-factors', json={
            'name': 'Electricity',
            'unit': 'kWh',
            'co2Factor': 0.233,
            'category': 'Energy',
            'source': 'EPA',
            'status': 'Active',
        })
        self.assertEqual(factor_response.status_code, 201)

        audit_response = self.client.post('/api/operations/audits', json={
            'name': 'Q3 Audit',
            'type': 'Internal',
            'scope': 'ESG',
            'auditor': 'Team',
            'startDate': '2024-07-01',
            'endDate': '2024-07-31',
            'status': 'Scheduled',
            'findings': 'N/A',
            'issues': 0,
        })
        self.assertEqual(audit_response.status_code, 201)

        findings_response = self.client.post('/api/operations/audit-findings', json={
            'auditName': 'Q3 Audit',
            'finding': 'Documentation gap',
            'severity': 'Minor',
            'responsible': 'Ops',
            'dueDate': '2024-07-15',
            'status': 'Open',
        })
        self.assertEqual(findings_response.status_code, 201)

        diversity_response = self.client.post('/api/operations/diversity-initiatives', json={
            'name': 'Gender Inclusion',
            'target': '50% representation',
            'current': '45%',
            'status': 'In Progress',
        })
        self.assertEqual(diversity_response.status_code, 201)

        challenge_response = self.client.post('/api/operations/challenges', json={
            'name': 'Sustainability Sprint',
            'description': 'Complete 5 ESG tasks',
            'startDate': '2024-07-01',
            'endDate': '2024-07-31',
            'participants': 120,
            'completed': 64,
            'reward': '500 points',
            'difficulty': 'Hard',
            'status': 'Active',
            'progress': 53,
        })
        self.assertEqual(challenge_response.status_code, 201)

        transactions = self.client.get('/api/operations/carbon-transactions').get_json()
        factors = self.client.get('/api/operations/emission-factors').get_json()
        audits = self.client.get('/api/operations/audits').get_json()
        findings = self.client.get('/api/operations/audit-findings').get_json()
        diversity = self.client.get('/api/operations/diversity-initiatives').get_json()
        challenges = self.client.get('/api/operations/challenges').get_json()

        self.assertEqual(len(transactions), 1)
        self.assertEqual(len(factors), 1)
        self.assertEqual(len(audits), 1)
        self.assertEqual(len(findings), 1)
        self.assertEqual(len(diversity), 1)
        self.assertEqual(len(challenges), 1)


if __name__ == '__main__':
    unittest.main()
