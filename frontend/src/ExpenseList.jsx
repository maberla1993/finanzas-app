import { useState } from 'react'
import { ExpenseItem } from './ExpenseItem.jsx'

export function ExpenseList({ gastos, eliminarGasto, editarImporte, categorias }) {

    //Creamos un estado para la categoría de filtro, que es una cadena vacía por defecto. Cuando el usuario seleccione una categoría, este estado se actualizará y se usará para filtrar los gastos.
    const [categoriaFiltro, setCategoriaFiltro] = useState('')

    //Ordenamos los gastos por fecha de forma descendente (del más reciente al más antiguo) usando el método sort() y la función new Date() para convertir las fechas a objetos Date. Creamos una copia del array de gastos con el operador spread (...) para no modificar el estado original.
    const gastosOrdenados = [...gastos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    //Conserva este gasto si no hay filtro seleccionado O si la categoría del gasto coincide con el filtro y evaluamos la condición OR mostrando un resultado final.
    const gastosFiltrados = gastosOrdenados.filter(
        (gasto) => categoriaFiltro === '' || gasto.categoria === categoriaFiltro
    );

    return (
        <div>
            <p>Lista de gastos</p>
            <p>-------------------</p>
            <select
                value={categoriaFiltro}
                onChange={(event) => setCategoriaFiltro(event.target.value)}
            >
                <option value="">Todas</option>
                {categorias.map((nombreCategoria) => (
                    <option key={nombreCategoria} value={nombreCategoria}>
                        {nombreCategoria}
                    </option>
                ))}
            </select>
            {
                //Iteramos sobre el array de gastos y renderizamos un componente ExpenseItem para cada gasto
                gastosFiltrados.map((gasto) => ( //Return implicito (...)
                    <ExpenseItem
                        key={gasto.id} //// identificador que React usa internamente
                        id={gasto.id} //prop que tú pasas a ExpenseItem
                        concepto={gasto.concepto}
                        importe={gasto.importe}
                        fecha={gasto.fecha}
                        categoria={gasto.categoria}
                        eliminarGasto={eliminarGasto}
                        editarImporte={editarImporte}
                    />
                ))
            }
        </div>
    )
}
