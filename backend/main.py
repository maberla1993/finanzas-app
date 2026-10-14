from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware # comunica el front con el back
from pydantic import BaseModel
from database import engine, Base, SessionLocal
from sqlalchemy.orm import Session
from models import GastoDB, IngresoDB

# BaseModel permite definir un modelo de datos que Pydantic validará automáticamente.
class Gasto(BaseModel):
    concepto: str
    importe: float
    fecha: str
    categoria: str

class Ingreso(BaseModel):
    concepto: str
    importe: float
    fecha: str
    categoria: str

app = FastAPI() # creamos la aplicación

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # autorizamos la url de nuestro frontend
    allow_credentials=True, # permite envío de credenciales
    allow_methods=["*"], # permite GET, POST, PUT y DELETE
    allow_headers=["*"], # permite cabeceras de las peticiones
)

# crea las tablas en la base de datos según los modelos definidos en models.py.
Base.metadata.create_all(bind=engine) 

# esta función permite obtener una sesión de base de datos para realizar operaciones CRUD.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def inicio():
    return {"mensaje": "API de Finanzas funcionando"}

#endpoint para listar gastos
@app.get("/gastos")
def listar_gastos(db: Session = Depends(get_db)):
    gastos = db.query(GastoDB).all()  # consulta todos los registros de la tabla "gastos"

    return gastos

#endpoint para registrar un gasto
@app.post("/gastos")
def registrar_gasto(gasto: Gasto, db: Session = Depends(get_db)):
    
    nuevo_gasto = GastoDB(
        concepto=gasto.concepto,
        importe=gasto.importe,
        fecha=gasto.fecha,
        categoria=gasto.categoria
    )
    
    db.add(nuevo_gasto) # añadir el objeto a la sesión
    db.commit() # confirmar los cambios
    db.refresh(nuevo_gasto) # actualizar el objeto con los datos generados por la base de datos
    
    return nuevo_gasto

#endpoint para eliminar un gasto
@app.delete("/gastos/{gasto_id}")
def eliminar_gasto(gasto_id: int, db: Session = Depends(get_db)):
    
    gasto_eliminado = db.query(GastoDB).filter(GastoDB.id == gasto_id).first()
    
    if gasto_eliminado is None: #si el idem del gasto a eliminar no existe lanzamos excepción
        raise HTTPException(status_code=404, detail="Gasto no encontrado")
    
    db.delete(gasto_eliminado)
    db.commit()
    
    return gasto_eliminado

#endpoint para editar un gasto
@app.put("/gastos/{gasto_id}")
def actualizar_gasto(gasto: Gasto, gasto_id: int, db: Session = Depends(get_db)):
    
    gasto_editado = db.query(GastoDB).filter(GastoDB.id == gasto_id).first()
    
    if gasto_editado is None:
        raise HTTPException(status_code=404, detail="Gasto no encontrado")
    
    gasto_editado.concepto = gasto.concepto
    gasto_editado.importe = gasto.importe
    gasto_editado.fecha = gasto.fecha
    gasto_editado.categoria = gasto.categoria

    db.commit() 
    db.refresh(gasto_editado)
    
    return gasto_editado
    
#####################################
#####################################

#endpoint para registrar un ingreso
@app.post("/ingresos")
def registrar_ingreso(ingreso: Ingreso, db: Session = Depends(get_db)):
    
    nuevo_ingreso = IngresoDB(
            concepto=ingreso.concepto,
            importe=ingreso.importe,
            fecha=ingreso.fecha,
            categoria=ingreso.categoria
        )
    
    db.add(nuevo_ingreso)
    db.commit()
    db.refresh(nuevo_ingreso)
    
    return nuevo_ingreso

#endpoint para listar ingresos
@app.get("/ingresos")
def listar_ingresos(db: Session = Depends(get_db)):
    ingresos = db.query(IngresoDB).all()  # consulta todos los registros de la tabla "ingresos"

    return ingresos

#endpoint para eliminar un ingreso
@app.delete("/ingresos/{ingreso_id}")
def eliminar_ingreso(ingreso_id: int, db: Session = Depends(get_db)):
    
    ingreso_eliminado = db.query(IngresoDB).filter(IngresoDB.id == ingreso_id).first()
    
    if ingreso_eliminado is None: #si el idem del gasto a eliminar no existe lanzamos excepción
        raise HTTPException(status_code=404, detail="Ingreso no encontrado")
    
    db.delete(ingreso_eliminado)
    db.commit()
    
    return ingreso_eliminado

#endpoint para editar un ingreso
@app.put("/ingresos/{ingreso_id}")
def actualizar_ingreso(ingreso: Ingreso, ingreso_id: int, db: Session = Depends(get_db)):
    
    ingreso_editado = db.query(IngresoDB).filter(IngresoDB.id == ingreso_id).first()
    
    if ingreso_editado is None:
        raise HTTPException(status_code=404, detail="Ingreso no encontrado")
    
    ingreso_editado.concepto = ingreso.concepto
    ingreso_editado.importe = ingreso.importe
    ingreso_editado.fecha = ingreso.fecha
    ingreso_editado.categoria = ingreso.categoria

    db.commit() 
    db.refresh(ingreso_editado)
    
    return ingreso_editado