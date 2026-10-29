/**App.jsx es, actualmente, el componente principal que Vite nos ha creado. */
/** NOTA SOBRE LOS ESTADOS: El estado cambia en el componente que lo posee y los componentes que dependen de ese estado se actualizan. */

import './App.css'
import { useState, useEffect } from 'react' //useEffect nos permitirá ejecutar una petición a FastAPI cuando se cargue el componente 
import { eliminarGastoAPI, eliminarIngresoAPI, editarGastoAPI, editarIngresoAPI } from './api.jsx'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Summary } from './Summary.jsx'
import { ExpenseList } from './ExpenseList.jsx'
import { ExpenseForm } from './ExpenseForm.jsx'
import { IncomeForm } from './IncomeForm.jsx'
import { IncomeList } from './IncomeList.jsx'

function App() {

  const [gastos, setGastos] = useState([]); // estado para almacenar los gastos obtenidos del backend. Inicialmente es un array vacío.
  const [ingresos, setIngresos] = useState([]); // estado para almacenar los ingresos obtenidos del backend. 

  // Estados compartidos para filtrar el resumen y los históricos por mes y año.
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1)
  const [añoSeleccionado, setAñoSeleccionado] = useState(new Date().getFullYear())

  //Con useEffect() hacemos una petición HTTP al backend para obtener los gastos y los ingresos cuando se carga el componente.
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

  //useEffect() para cargar los ingresos
  useEffect(() => {
    fetch('http://127.0.0.1:8000/ingresos') //fetch solicita los ingresos al backend
      .then(respuesta => respuesta.json())
      .then(datos => {
        setIngresos(datos);
      })
      .catch(error => {
        console.error('Error al cargar los ingresos:', error);
      });
  }, []);

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

  const categoriasIngresos = [
    'Nómina',
    'Otros'
  ]

  // función que permite eliminar un gasto mediante el id con el uso de DELETE para conectar con el backend y actualizar la base de datos
  const eliminarGasto = async (id) => {
    try {

      await eliminarGastoAPI(id)

      // setGastos() elimina el gasto de la interfaz solo después de recibir una respuesta satisfactoria.
      setGastos(prevGastos =>
        prevGastos.filter((gasto) => gasto.id !== id)
      )

    } catch (error) {
      console.error('Error al eliminar el gasto:', error)
      alert('No se ha podido eliminar el gasto')
    }
  }

  const eliminarIngreso = async (id) => {
    try {

      await eliminarIngresoAPI(id)

      // setIngreso() elimina el gasto de la interfaz solo después de recibir una respuesta satisfactoria.
      setIngresos(prevIngreso =>
        prevIngreso.filter((ingreso) => ingreso.id !== id)
      )

    } catch (error) {
      console.error('Error al eliminar el ingreso:', error)
      alert('No se ha podido eliminar el ingreso')
    }
  }


  // función que permite editar el importe de un gasto mediante el id con el uso de PUT para conectar con el backend y actualizar la base de datos
  const editarGasto = async (id, nuevoImporte) => { //async y await permiten esperar la respuesta del backend.
    try {
      const gastoActual = gastos.find((gasto) => gasto.id === id)

      if (!gastoActual) {
        return
      }

      const gastoActualizado = await editarGastoAPI(id, {
        concepto: gastoActual.concepto,
        importe: nuevoImporte,
        fecha: gastoActual.fecha,
        categoria: gastoActual.categoria
      })

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

  const editarIngreso = async (id, nuevoImporte) => { //async y await permiten esperar la respuesta del backend.
    try {
      const ingresoActual = ingresos.find((ingreso) => ingreso.id === id)

      if (!ingresoActual) {
        return
      }

      const ingresoActualizado = await editarIngresoAPI(id, {
        concepto: ingresoActual.concepto,
        importe: nuevoImporte,
        fecha: ingresoActual.fecha,
        categoria: ingresoActual.categoria
      })

      setIngresos((ingresosAnteriores) =>
        ingresosAnteriores.map((ingreso) =>
          ingreso.id === id ? ingresoActualizado : ingreso
        )
      )

    } catch (error) {
      console.error('Error al editar el ingreso:', error)
      alert('No se ha podido guardar el cambio')
    }
  }


  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <section className="dashboard-section">
          <Summary
            ingresos={ingresos}
            gastos={gastos}
            categorias={categorias}
            mesSeleccionado={mesSeleccionado}
            setMesSeleccionado={setMesSeleccionado}
            añoSeleccionado={añoSeleccionado}
            setAñoSeleccionado={setAñoSeleccionado}
          />
        </section>

        <section className="transactions-section">
          <div className="transaction-column">
            <IncomeForm setIngresos={setIngresos} />

            <IncomeList
              ingresos={ingresos}
              eliminarIngreso={eliminarIngreso}
              editarIngreso={editarIngreso}
              categorias={categoriasIngresos}
              mesSeleccionado={mesSeleccionado}
              añoSeleccionado={añoSeleccionado}
            />
          </div>

          <div className="transaction-column">
            <ExpenseForm
              setGastos={setGastos}
              categorias={categorias}
            />

            <ExpenseList
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              editarGasto={editarGasto}
              categorias={categorias}
              mesSeleccionado={mesSeleccionado}
              añoSeleccionado={añoSeleccionado}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )

}

export default App
