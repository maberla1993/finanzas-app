// Fichero que unifica los calculos que utilizaremos para mostrar los resultados en Summary.jsx

/**
* reduce() → calcula el gasto total. filter() → selecciona los gastos de una categoría. reduce() → suma esos gastos.
* El reduce nos devuelve un objeto tipo { Alimentación: 300,Transporte: 100,Vivienda: 500, ...}
*/
export function calcularGastosPorCategoria(gastos, categorias) {
    const resultado = categorias.reduce(
        (resultado, categoria) => {
            resultado[categoria] = gastos
                .filter(gasto => gasto.categoria === categoria)
                .reduce((total, gasto) => total + gasto.importe, 0)

            return resultado
        },
        {}
    )
    return resultado
}

/**
* reduce() -> nos permite calcular la categoria con mayor gasto
* Si hay gastos, busco la categoría con mayor gasto. Si no hay gastos, no existe una categoría mayor y devuelvo null.
* Si el gasto de la categoría actual es mayor que el gasto de la categoría mayor, devuelve la categoría actual; si no, devuelve la categoría mayor.
*/
export function calcularCategoriaMayorGasto(gastosPorCategoria, totalGastos) {

    if (totalGastos > 0) {
        return Object.keys(gastosPorCategoria).reduce(
            (mayor, categoria) => {
                return gastosPorCategoria[categoria] > gastosPorCategoria[mayor]
                    ? categoria
                    : mayor
            }
        )
    }

    return null
}

//Calculamos sumando el importe de cada gasto en el array de gastos
export function calcularTotalGastos(gastos) {

    const resultado = gastos.reduce((total, gasto) => total + gasto.importe, 0)

    return resultado
}

/**
* Evitamos división por cero. 
* Si el número de gastos en el array es > 0 hace el calculo del gasto medio
*/
export function calcularGastoMedio(gastos) {
    const totalGastos = calcularTotalGastos(gastos)

    if (gastos.length > 0) {
        return totalGastos / gastos.length
    }

    return 0
}

/**
* Porcentaje de gastos sobre ingresos. Si ingresos es mayor que 0, calcula el porcentaje; si no, asigna 0.
*/
export function calcularPorcentajeGastos(ingresos, gastos) {

    const totalGastos = calcularTotalGastos(gastos)

    if (ingresos > 0) {
        return (totalGastos / ingresos) * 100
    }

    return 0

}

/**
 * 
 * Porcentaje gastos de cada categoria 
 */
export function calcularPorcentajesPorCategoria(gastosPorCategoria, totalGastos) {

    const categorias = Object.keys(gastosPorCategoria)

    const resultado = categorias.reduce(
        (resultado, categoria) => {

            const porcentaje = totalGastos > 0
                ? (gastosPorCategoria[categoria] / totalGastos) * 100
                : 0

            resultado[categoria] = porcentaje

            return resultado
        },
        {}

    )
    return resultado

}

/**
 * Calcular gastos en un mes concreto
 */
export function filtrarGastosPorMes(gastos, mes, año) {

    return gastos.filter((gasto) => {
        const fecha = new Date(gasto.fecha)

        return fecha.getMonth() + 1 === mes &&
            fecha.getFullYear() === año
    })

}

export function calcularTotalGastosPorMes(gastos, mes, año) {

    const gastosPorMes = filtrarGastosPorMes(gastos, mes, año)

    return calcularTotalGastos(gastosPorMes)
}

/////////////////////////////////

/**
 * Desglose gastos por cada categoria por mes
 */
export function calcularGastosPorCategoriaPorMes(gastos, mes, año, categorias) {

    const gastosCategoriaPorMes = filtrarGastosPorMes(gastos, mes, año)

    return calcularGastosPorCategoria(gastosCategoriaPorMes, categorias)
}

/**
 * Calcula gastos en 12 meses de un año. Comparación entre ingresos/gastos
 */
export function calcularGastosPorMes(gastos, año) {

    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return meses.map((mes) => {
        return {
            mes: mes,
            gastos: calcularTotalGastosPorMes(gastos, mes, año)
        }
    })

}