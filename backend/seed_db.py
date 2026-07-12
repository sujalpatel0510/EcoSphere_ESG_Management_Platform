from app import create_app
from app.extensions import db
from app.models.social import CSRInitiative

app = create_app()

csr_initiatives = [
  {
    "name": 'Community Health Outreach',
    "description": 'Free health camps in underserved communities',
    "impact": 'Reached 5,000+ people',
    "budget": '$50,000',
    "status": 'Active',
    "category": 'Healthcare',
    "start_date": '2024-01-15',
    "team": 12,
  },
  {
    "name": 'Education Scholarship Program',
    "description": 'Scholarships for underprivileged students',
    "impact": '150 students funded',
    "budget": '$75,000',
    "status": 'Active',
    "category": 'Education',
    "start_date": '2024-02-01',
    "team": 8,
  },
  {
    "name": 'Environmental Clean-up Drive',
    "description": 'Monthly beach and forest cleanups',
    "impact": '25 tons of waste collected',
    "budget": '$15,000',
    "status": 'Active',
    "category": 'Environment',
    "start_date": '2024-01-20',
    "team": 30,
  },
  {
    "name": 'Women Empowerment Initiative',
    "description": 'Skills training for rural women',
    "impact": '500 women trained',
    "budget": '$60,000',
    "status": 'Planning',
    "category": 'Social',
    "start_date": '2024-04-01',
    "team": 6,
  },
]

with app.app_context():
    # Only seed if empty
    if CSRInitiative.query.count() == 0:
        for init in csr_initiatives:
            item = CSRInitiative(**init)
            db.session.add(item)
        db.session.commit()
        print("Database seeded with mock CSR initiatives!")
    else:
        print("Database already has data, skipping seed.")
