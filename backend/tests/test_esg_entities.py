import unittest

from app import create_app
from app.extensions import db


class TestESGEntitiesAPI(unittest.TestCase):
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

    def test_goals_policies_and_badges_crud(self):
        goal_response = self.client.post('/api/environmental/goals', json={
            'name': 'Reduce Emissions',
            'target': '40% by 2030',
            'current': 32,
            'baseline': 5000,
            'currentValue': 3400,
            'unit': 'tons CO2e',
            'status': 'On Track',
            'department': 'Operations',
            'startDate': '2024-01-01',
            'deadline': '2030-12-31',
        })
        self.assertEqual(goal_response.status_code, 201)

        policy_response = self.client.post('/api/governance/policies', json={
            'name': 'Data Privacy Policy',
            'category': 'Compliance',
            'status': 'Approved',
            'version': 'v2.1',
            'lastUpdated': '2024-04-20',
            'nextReview': '2024-10-20',
            'coverage': '95%',
        })
        self.assertEqual(policy_response.status_code, 201)

        badge_response = self.client.post('/api/gamification/badges', json={
            'name': 'Carbon Champion',
            'description': 'Reduced emissions by 30%',
            'rarity': 'Rare',
            'criteria': 'Achieve 30% carbon reduction',
            'color': 'bg-green-100 text-green-600',
        })
        self.assertEqual(badge_response.status_code, 201)

        achievement_response = self.client.post('/api/gamification/achievements', json={
            'badgeName': 'Carbon Champion',
            'user': 'Sarah Chen',
            'date': '2024-06-10',
            'description': 'Reduced emissions by 35%',
        })
        self.assertEqual(achievement_response.status_code, 201)

        goals = self.client.get('/api/environmental/goals').get_json()
        policies = self.client.get('/api/governance/policies').get_json()
        badges = self.client.get('/api/gamification/badges').get_json()
        achievements = self.client.get('/api/gamification/achievements').get_json()

        self.assertEqual(len(goals), 1)
        self.assertEqual(len(policies), 1)
        self.assertEqual(len(badges), 1)
        self.assertEqual(len(achievements), 1)


if __name__ == '__main__':
    unittest.main()
