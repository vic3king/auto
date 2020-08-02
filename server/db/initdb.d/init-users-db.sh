#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER auto;
    CREATE DATABASE auto_db ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE auto_db TO auto;

    ALTER USER auto WITH PASSWORD 'password123';
    ALTER USER auto WITH SUPERUSER;
EOSQL
