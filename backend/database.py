# DATABASE_URL,	Indica dónde está la base de datos.
# engine: configura el acceso a SQLite.
# SessionLocal: permite crear sesiones para consultar, insertar, modificar y eliminar registros.
# Base: será la clase de la que heredarán nuestros modelos de base de datos.

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./finanzas.db" 

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

Base = declarative_base()
