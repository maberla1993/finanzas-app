import { useState } from 'react'
import {
    filtrarGastosPorMes,
    calcularGastosPorCategoria,
    calcularTotalGastos,
    calcularGastoMedio,
    calcularPorcentajeGastos,
    calcularCategoriaMayorGasto,
    calcularPorcentajesPorCategoria,
    calcularGastosPorMes
} from "./utils/finanzas";
import { IncomeExpenseChart } from './components/IncomeExpenseChart' //importamos el componente creado para mostrar el gráfico de las barras

export function Summary({ ingresos, gastos, categorias }) {

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

    //estados para manejar fechas a la hora de filtrar gastos por mes, con valores actuales por defecto
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1)
    const [añoSeleccionado, setAñoSeleccionado] = useState(new Date().getFullYear())

    // funciones resumen financiero mensual
    const gastosDelMes = filtrarGastosPorMes(gastos, mesSeleccionado, añoSeleccionado) //principal - filtro gastos por mes
    const totalGastos = calcularTotalGastos(gastosDelMes)
    const disponible = ingresos - totalGastos
    const porcentajeGastos = calcularPorcentajeGastos(ingresos, gastosDelMes)
    // funciones gastos categoria, porcentaje sobre gastos y gasto medio transacción
    const gastosPorCategoria = calcularGastosPorCategoria(gastosDelMes, categorias)
    const porcentajesPorCategoria = calcularPorcentajesPorCategoria(gastosPorCategoria, totalGastos)
    const gastoMedioTransaccion = calcularGastoMedio(gastosDelMes)
    const categoriaMayorGasto = calcularCategoriaMayorGasto(gastosPorCategoria, totalGastos)

    const gastosPorMes = calcularGastosPorMes(gastos, añoSeleccionado)
    const ingresosYGastosPorMes = gastosPorMes.map((mes) => ({
        mes: meses.find((mesNombre) => mesNombre.valor === mes.mes).nombre, //obtenemos el nombre del mes con find()
        gastos: mes.gastos,
        ingresos: ingresos
    }))

    return (
        <div>
            <h3>Selecciona mes y año</h3>
            <select
                value={mesSeleccionado}
                onChange={(event) => setMesSeleccionado(Number(event.target.value))} //nos interesa pasar el número del mes
            >
                <option value="" disabled>
                    Selecciona un mes
                </option>
                {meses.map((mes) => (
                    <option key={mes.valor} value={mes.valor}>
                        {mes.nombre}
                    </option>
                ))}
            </select>
            <select
                value={añoSeleccionado}
                onChange={(event) => 
                    setAñoSeleccionado(Number(event.target.value))
                }
            >
                <option value="" disabled>
                    Selecciona un año
                </option>
                {años.map((año) => (
                    <option key={año} value={año}>
                        {año}
                    </option>
                ))}
            </select>

            <h3>Resumen financiero del período seleccionado</h3>
            <p>Ingreso total: {ingresos} €</p>
            <p>Gasto total: {totalGastos} € - {porcentajeGastos.toFixed(2)} %</p>
            <p>Disponible: {disponible} €</p>

            <IncomeExpenseChart //mostramos componente gráfico de las barras
                ingresosYGastosPorMes={ingresosYGastosPorMes}
                añoSeleccionado={añoSeleccionado}
            />

            <h3>Gastos por categoría y % sobre el gasto total</h3>
            {
                /**
                 * Object.keys() → convierte las categorías del objeto en un array. filter() → elimina las categorías con 0 €. map() → genera el HTML.
                 * La línea {((gastosPorCategoria[categoria] / totalGastos) * 100).toFixed(2)} % añade el porcentaje con dos decimales sobre los gastos para cada categoría
                 */
                Object.keys(gastosPorCategoria)
                    .filter((categoria) => gastosPorCategoria[categoria] > 0)
                    .map((categoria) => {
                        //return explícito
                        return (
                            <p key={categoria}>
                                {categoria}: {gastosPorCategoria[categoria]} € - {porcentajesPorCategoria[categoria].toFixed(2)} %
                            </p>
                        )
                    })
            }
            <br />
            <h3>Gasto medio por transacción</h3> {gastoMedioTransaccion.toFixed(2)} €
            <br />
            <h3>Categoría de mayor gasto</h3> {categoriaMayorGasto}
            <br />
        </div>
    )
}