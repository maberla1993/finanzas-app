/**Partimos de ExpenseList para la creacion de IncomeList */

import { useState } from 'react'
import { IncomeItem } from './IncomeItem.jsx'

export function IncomeList({ ingresos, categorias, editarIngreso, eliminarIngreso, mesSeleccionado, añoSeleccionado }) {

    const [categoriaFiltro, setCategoriaFiltro] = useState('')

    // Filtramos los ingresos por el mes y año seleccionados en el resumen.
    const ingresosDelMes = ingresos.filter((ingreso) => {
        const fechaIngreso = new Date(`${ingreso.fecha}T12:00:00`)

        return (
            fechaIngreso.getMonth() + 1 === mesSeleccionado &&
            fechaIngreso.getFullYear() === añoSeleccionado
        )
    })

    // Ordenamos los ingresos por fecha, del más reciente al más antiguo.
    const ingresosOrdenados = [...ingresosDelMes].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
    )

    // Mostramos todos los ingresos o solo los de la categoría seleccionada.
    const ingresosFiltrados = ingresosOrdenados.filter(
        (ingreso) => categoriaFiltro === '' || ingreso.categoria === categoriaFiltro
    )

    return (
        <section className="transaction-card">
            <div className="transaction-header">
                <div>
                    <h3>
                        Histórico de ingresos - {new Date(añoSeleccionado, mesSeleccionado - 1)
                            .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </h3>
                    <p>Consulta y gestiona el dinero que recibes</p>
                </div>

                <span className="transaction-count">
                    {ingresosFiltrados.length}
                    {ingresosFiltrados.length === 1 ? ' ingreso' : ' ingresos'}
                </span>
            </div>

            <div className="transaction-filter">
                <label htmlFor="filtro-ingresos">Filtrar por categoría</label>

                <select
                    id="filtro-ingresos"
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

            {ingresosFiltrados.length === 0 ? (
                <p className="transaction-empty">
                    No hay ingresos registrados para esta categoría.
                </p>
            ) : (
                <div className="transaction-items">
                    {ingresosFiltrados.map((ingreso) => (
                        <IncomeItem
                            key={ingreso.id} // identificador que React usa internamente
                            id={ingreso.id} // prop que pasamos a IncomeItem
                            concepto={ingreso.concepto}
                            importe={ingreso.importe}
                            fecha={ingreso.fecha}
                            categoria={ingreso.categoria}
                            eliminarIngreso={eliminarIngreso}
                            editarIngreso={editarIngreso}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}