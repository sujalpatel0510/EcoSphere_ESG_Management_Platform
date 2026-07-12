import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

load_dotenv()

user = os.environ.get('POSTGRES_USER', 'postgres')
password = os.environ.get('POSTGRES_PASSWORD', '8511')
host = os.environ.get('DB_HOST', 'localhost')
port = os.environ.get('DB_PORT', '5432')
dbname = os.environ.get('POSTGRES_DB', 'ecosphere')

try:
    # Connect to default 'postgres' database to create the new one
    conn = psycopg2.connect(
        dbname='postgres',
        user=user,
        password=password,
        host=host,
        port=port
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Check if database exists
    cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{dbname}'")
    exists = cursor.fetchone()
    
    if not exists:
        print(f"Creating database {dbname}...")
        cursor.execute(f"CREATE DATABASE {dbname}")
        print("Database created successfully!")
    else:
        print(f"Database {dbname} already exists.")
        
    cursor.close()
    conn.close()
except Exception as e:
    print("Error creating database:", e)
