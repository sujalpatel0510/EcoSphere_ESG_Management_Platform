import unittest

from app import create_app
from app.extensions import db


class TestCSRInitiativeAPI(unittest.TestCase):
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

    def test_create_update_and_delete_csr_initiative(self):
        create_payload = {
            'name': 'Community Health Drive',
            'description': 'Mobile clinic outreach',
            'category': 'Healthcare',
            'impact': '500 families',
            'budget': '$25,000',
            'status': 'Active',
            'startDate': '2026-07-01',
            'team': 8,
        }

        create_response = self.client.post('/api/social/csr-initiatives', json=create_payload)
        self.assertEqual(create_response.status_code, 201)
        created = create_response.get_json()
        self.assertEqual(created['name'], 'Community Health Drive')

        list_response = self.client.get('/api/social/csr-initiatives')
        self.assertEqual(list_response.status_code, 200)
        initiatives = list_response.get_json()
        self.assertEqual(len(initiatives), 1)

        update_payload = {
            'name': 'Community Health Drive Updated',
            'description': 'Expanded mobile clinic outreach',
            'status': 'Planning',
            'budget': '$30,000',
            'team': 10,
        }

        update_response = self.client.put(f"/api/social/csr-initiatives/{created['id']}", json=update_payload)
        self.assertEqual(update_response.status_code, 200)
        updated = update_response.get_json()
        self.assertEqual(updated['name'], 'Community Health Drive Updated')
        self.assertEqual(updated['budget'], '$30,000')

        delete_response = self.client.delete(f"/api/social/csr-initiatives/{created['id']}")
        self.assertEqual(delete_response.status_code, 200)

        final_list_response = self.client.get('/api/social/csr-initiatives')
        self.assertEqual(final_list_response.get_json(), [])


if __name__ == '__main__':
    unittest.main()
