import {
    filtrarGastosPorMes,
    calcularGastosPorCategoria,
    calcularTotalGastos,
    calcularGastoMedio,
    calcularPorcentajeGastos,
    calcularCategoriaMayorGasto,
    calcularPorcentajesPorCategoria,
    calcularGastosPorMes,
    calcularTotalIngresosPorMes
} from "./utils/finanzas";
import { IncomeExpenseChart } from './components/IncomeExpenseChart' //importamos el componente creado para mostrar el gráfico de las barras

export function Summary({ ingresos, gastos, categorias, mesSeleccionado, setMesSeleccionado, añoSeleccionado, setAñoSeleccionado }) {

    const meses = [
        { valor: 1, nombre: 'Enero' },
        { valor: 2, nombre: 'Febrero' },
        { valor: 3, nombre: 'Marzo' },
        { valor: 4, nombre: 'Abril' },
        { valor: 5, nombre: 'Mayo' },
        { valor: 6, nombre: 'Junio' },
        { valor: 7, nombre: 'Julio' },
        { valor: 8, nombre: 'Agosto' },
        { valor: 9, nombre: 'Septiembre' },
        { valor: 10, nombre: 'Octubre' },
        { valor: 11, nombre: 'Noviembre' },
        { valor: 12, nombre: 'Diciembre' }
    ]

    //temporal ya que mas adelante mostraremos los años en función de los registrado en la aplicación
    const añoActual = new Date().getFullYear()
    const años = Array.from(
        { length: añoActual - 2023 + 1 },
        (_, indice) => 2023 + indice
    )

    // funciones resumen financiero mensual
    const gastosDelMes = filtrarGastosPorMes(gastos, mesSeleccionado, añoSeleccionado) //principal - filtro gastos por mes
    //const ingresosDelMes = filtrarIngresosPorMes(ingresos, mesSeleccionado, añoSeleccionado) //principal - filtro ingresos por mes

    // total gastos e ingresos
    const totalGastos = calcularTotalGastos(gastosDelMes)
    const totalIngresos = calcularTotalIngresosPorMes(ingresos, mesSeleccionado, añoSeleccionado)

    const disponible = totalIngresos - totalGastos
    const porcentajeGastos = calcularPorcentajeGastos(totalIngresos, gastosDelMes)
    // funciones gastos categoria, porcentaje sobre gastos y gasto medio transacción
    const gastosPorCategoria = calcularGastosPorCategoria(gastosDelMes, categorias)
    const porcentajesPorCategoria = calcularPorcentajesPorCategoria(gastosPorCategoria, totalGastos)
    const gastoMedioTransaccion = calcularGastoMedio(gastosDelMes)
    const categoriaMayorGasto = calcularCategoriaMayorGasto(gastosPorCategoria, totalGastos)

    const gastosPorMes = calcularGastosPorMes(gastos, añoSeleccionado)

    const ingresosYGastosPorMes = gastosPorMes.map((mes) => ({
        mes: meses.find((mesNombre) => mesNombre.valor === mes.mes).nombre, //obtenemos el nombre del mes con find()
        gastos: mes.gastos,
        ingresos: calcularTotalIngresosPorMes(ingresos, mes.mes, añoSeleccionado)
    }))

    return (
        <div>
            <div className="summary-header">
                <div>
                    <h2>Resumen financiero</h2>
                    <p>Consulta la situación de tus finanzas por período.</p>
                </div>

                <div className="summary-filters">
                    <select
                        value={mesSeleccionado}
                        onChange={(event) => setMesSeleccionado(Number(event.target.value))}
                    >
                        {meses.map((mes) => (
                            <option key={mes.valor} value={mes.valor}>
                                {mes.nombre}
                            </option>
                        ))}
                    </select>

                    <select
                        value={añoSeleccionado}
                        onChange={(event) => setAñoSeleccionado(Number(event.target.value))}
                    >
                        {años.map((año) => (
                            <option key={año} value={año}>
                                {año}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="summary-cards">
                <div className="summary-card">
                    <p>Ingresos totales</p>
                    <h3>{totalIngresos.toFixed(2)} €</h3>
                </div>

                <div className="summary-card">
                    <p>Gastos totales</p>
                    <h3>{totalGastos.toFixed(2)} €</h3>
                    <span><strong>{porcentajeGastos.toFixed(2)} % de los ingresos</strong></span>
                </div>

                <div className="summary-card">
                    <p>Dinero disponible</p>
                    <h3>{disponible.toFixed(2)} €</h3>
                </div>
            </div>
            <div>
                <IncomeExpenseChart //mostramos componente gráfico de las barras
                    ingresosYGastosPorMes={ingresosYGastosPorMes}
                    añoSeleccionado={añoSeleccionado}
                />
            </div>

            <div className="financial-details">
                <section className="detail-card">
                    <h3>Gastos por categoría</h3>
                    <p className="detail-subtitle">
                        Porcentaje sobre el gasto total
                    </p>

                    <div className="category-list">
                        {Object.keys(gastosPorCategoria)
                            .filter((categoria) => gastosPorCategoria[categoria] > 0)
                            .map((categoria) => (
                                <div className="category-item" key={categoria}>
                                    <div className="category-info">
                                        <span>{categoria}</span>
                                        <strong>
                                            {gastosPorCategoria[categoria].toFixed(2)} €
                                        </strong>
                                    </div>

                                    <div className="category-progress">
                                        <div
                                            className="category-progress-fill"
                                            style={{
                                                width: `${porcentajesPorCategoria[categoria]}%`
                                            }}
                                        />
                                    </div>

                                    <span className="category-percentage">
                                        {porcentajesPorCategoria[categoria].toFixed(2)} %
                                    </span>
                                </div>
                            ))}
                    </div>
                </section>

                <div className="detail-indicators">
                    <section className="detail-card">
                        <h3>Gasto medio por transacción</h3>
                        <p className="detail-value">
                            {gastoMedioTransaccion.toFixed(2)} €
                        </p>
                        <p className="detail-subtitle">
                            Importe medio de cada gasto
                        </p>
                    </section>

                    <section className="detail-card">
                        <h3>Categoría de mayor gasto</h3>
                        <p className="detail-value">
                            {categoriaMayorGasto || 'Sin gastos registrados'}
                        </p>
                        <p className="detail-subtitle">
                            Categoría con mayor importe acumulado
                        </p>
                    </section>
                </div>
            </div>
        </div>
        )   
}