import { useState } from 'react'
import { ExpenseItem } from './ExpenseItem.jsx'

export function ExpenseList({ gastos, eliminarGasto, editarGasto, categorias, mesSeleccionado, añoSeleccionado }) {

    //Creamos un estado para la categoría de filtro, que es una cadena vacía por defecto. Cuando el usuario seleccione una categoría, este estado se actualizará y se usará para filtrar los gastos.
    const [categoriaFiltro, setCategoriaFiltro] = useState('')
    // Filtramos los gastos por el mes y año seleccionados en el resumen.
    const gastosDelMes = gastos.filter((gasto) => {
        const fechaGasto = new Date(`${gasto.fecha}T12:00:00`)

        return (
            fechaGasto.getMonth() + 1 === mesSeleccionado &&
            fechaGasto.getFullYear() === añoSeleccionado
        )
    })

    // Ordenamos los gastos del mes, del más reciente al más antiguo.
    const gastosOrdenados = [...gastosDelMes].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
    )

    // Aplicamos el filtro por categoría a los gastos del mes seleccionado.
    const gastosFiltrados = gastosOrdenados.filter(
        (gasto) => categoriaFiltro === '' || gasto.categoria === categoriaFiltro
    )

    return (
        <section className="transaction-card">
            <div className="transaction-header">
                <div>
                    <h3>
                        Histórico de gastos - {new Date(añoSeleccionado, mesSeleccionado - 1)
                            .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </h3>
                    <p>Consulta y gestiona tus movimientos</p>
                </div>

                <span className="transaction-count">
                    {gastosFiltrados.length}
                    {gastosFiltrados.length === 1 ? ' gasto' : ' gastos'}
                </span>
            </div>

            <div className="transaction-filter">
                <label htmlFor="filtro-gastos">Filtrar por categoría</label>

                <select
                    id="filtro-gastos"
                    value={categoriaFiltro}
                    onChange={(event) => setCategoriaFiltro(event.target.value)}
                >
                    <option value="">Todas las categorías</option>

                    {categorias.map((nombreCategoria) => (
                        <option key={nombreCategoria} value={nombreCategoria}>
                            {nombreCategoria}
                        </option>
                    ))}
                </select>
            </div>

            {gastosFiltrados.length === 0 ? (
                <p className="transaction-empty">
                    No hay gastos registrados para esta categoría.
                </p>
            ) : (
                //Iteramos sobre el array de gastos y renderizamos un componente ExpenseItem para cada gasto
                <div className="transaction-items">
                    {gastosFiltrados.map((gasto) => ( //Return implicito (...)
                        <ExpenseItem
                            key={gasto.id} // identificador que React usa internamente
                            id={gasto.id} //prop que tú pasas a ExpenseItem
                            concepto={gasto.concepto}
                            importe={gasto.importe}
                            fecha={gasto.fecha}
                            categoria={gasto.categoria}
                            eliminarGasto={eliminarGasto}
                            editarGasto={editarGasto}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
