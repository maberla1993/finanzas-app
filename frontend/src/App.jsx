/**App.jsx es, actualmente, el componente principal que Vite nos ha creado. */
/** NOTA SOBRE LOS ESTADOS: El estado cambia en el componente que lo posee y los componentes que dependen de ese estado se actualizan. */

import './App.css'
import { useState, useEffect } from 'react' //useEffect nos permitirá ejecutar una petición a FastAPI cuando se cargue el componente 
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Summary } from './Summary.jsx'
import { ExpenseList } from './ExpenseList.jsx'
import { ExpenseForm } from './ExpenseForm.jsx'

function App() {
  const ingresos = 1340;

  //Creamos un estado para los gastos, que es un array de objetos. Cada objeto representa un gasto y tiene las propiedades fecha, concepto e importe.
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/gastos') //fetch solicita los gastos al backend
      .then(respuesta => respuesta.json())
      .then(datos => {
        setGastos(datos);
      })
      .catch(error => {
        console.error('Error al cargar los gastos:', error);
      });
  }, []); // array vacío [] al final es importante: indica que el efecto no debe repetirse en cada renderizado.

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

  // función que permite eliminar un gasto mediante el id con el uso de DELETE para conectar con el backend y actualizar la base de datos
  const eliminarGasto = async (id) => {
    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/gastos/${id}`, {
        method: 'DELETE'
      })

      if (!respuesta.ok) {
        throw new Error('No se ha podido eliminar el gasto')
      }

      // setGastos() elimina el gasto de la interfaz solo después de recibir una respuesta satisfactoria.
      setGastos(prevGastos =>
        prevGastos.filter((gasto) => gasto.id !== id)
      )

    } catch (error) {
      console.error('Error al eliminar el gasto:', error)
      alert('No se ha podido eliminar el gasto')
    }
  }


  // función que permite editar el importe de un gasto mediante el id con el uso de PUT para conectar con el backend y actualizar la base de datos
  const editarImporte = async (id, nuevoImporte) => { //async y await permiten esperar la respuesta del backend.
    try {
      const gastoActual = gastos.find((gasto) => gasto.id === id)

      if (!gastoActual) {
        return
      }

      const respuesta = await fetch(`http://127.0.0.1:8000/gastos/${id}`, { //fetch() envía el nuevo importe a FastAPI.
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          concepto: gastoActual.concepto,
          importe: nuevoImporte,
          fecha: gastoActual.fecha,
          categoria: gastoActual.categoria
        })
      })

      if (!respuesta.ok) {
        throw new Error('No se ha podido actualizar el gasto')
      }

      const gastoActualizado = await respuesta.json()

      // actualizamos el estado de gastos con el gasto actualizado, manteniendo los demás gastos sin cambios
      setGastos((gastosAnteriores) =>
        gastosAnteriores.map((gasto) =>
          gasto.id === id ? gastoActualizado : gasto
        )
      )

    } catch (error) {
      console.error('Error al editar el gasto:', error)
      alert('No se ha podido guardar el cambio')
    }
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
      <Footer />
    </>
  )
}

export default App
