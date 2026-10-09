/**App.jsx es, actualmente, el componente principal que Vite nos ha creado. */
/** NOTA SOBRE LOS ESTADOS: El estado cambia en el componente que lo posee y los componentes que dependen de ese estado se actualizan. */

import './App.css'
import { useState } from 'react'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Summary } from './Summary.jsx'
import { ExpenseList } from './ExpenseList.jsx'
import { ExpenseForm } from './ExpenseForm.jsx'

function App() {
  const ingresos = 1340;

  //Creamos un estado para los gastos, que es un array de objetos. Cada objeto representa un gasto y tiene las propiedades fecha, concepto e importe.
  const [gastos, setGastos] = useState([
    {
      id: 1,
      fecha: '2023-06-01',
      concepto: 'Alquiler',
      importe: 500,
      categoria: 'Vivienda'
    },
    {
      id: 2,
      fecha: '2023-06-05',
      concepto: 'Comida',
      importe: 250,
      categoria: 'Alimentación'
    },
    {
      id: 3,
      fecha: '2023-06-10',
      concepto: 'Gasofa',
      importe: 100,
      categoria: 'Transporte'
    }
  ]);

  const categorias = [
        'Alimentación',
        'Transporte',
        'Vivienda',
        'Ocio',
        'Salud',
        'Deporte',
        'Suscripciones',
        'Otros'
    ]

  // función que permite eliminar un gasto por id con la función filter() sin modificar el array original gastos
  const eliminarGasto = (id) => {
    //const gastosMod = gastos.filter((gasto) => gasto.id != id)
    //setGastos(gastosMod)

    setGastos(prevGastos => 
      prevGastos.filter((gasto) => gasto.id != id) // mas robusto que lo anterior
    )
  }

  // función que permite editar el importe de un gasto mediante el id, uso de spread
  const editarImporte = (id, nuevoImporte) => {
    setGastos(
      gastos.map((gasto) => {
        if (gasto.id === id){
          return {...gasto, 
                  importe: nuevoImporte}
        }
        return gasto
      }
    ))
  }

  return (
    <>
      <Header />
      <Summary
        ingresos={ingresos}
        gastos={gastos}
        categorias={categorias}
      />
      <br />
      <ExpenseForm 
        setGastos={setGastos} 
        categorias={categorias}
      />
      <br />
      <ExpenseList 
        gastos={gastos}
        eliminarGasto={eliminarGasto}
        editarImporte={editarImporte}
        categorias={categorias}
      />
      <Footer/>
    </>
  )
}

export default App
