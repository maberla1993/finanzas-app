from sqlalchemy import Column, Integer, String, Float
from database import Base

# modelo para gastos
class GastoDB(Base):
    __tablename__ = "gastos"

    id = Column(Integer, primary_key=True, index=True)
    concepto = Column(String, index=True, nullable=False)
    importe = Column(Float, nullable=False)
    fecha = Column(String, nullable=False)
    categoria = Column(String, nullable=False)
    
# modelo para ingresos    
class IngresoDB(Base):
    __tablename__ = "ingresos"

    id = Column(Integer, primary_key=True, index=True)
    concepto = Column(String, index=True, nullable=False)
    importe = Column(Float, nullable=False)
    fecha = Column(String, nullable=False)
    categoria = Column(String, nullable=False)