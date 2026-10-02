export function Summary({ ingresos, gastos, categorias }) {

    const totalGastos = gastos.reduce(
        (total, gasto) => total + gasto.importe, 0); //Calculamos sumando el importe de cada gasto en el array de gastos
    
    const disponible = ingresos - totalGastos;

    /**
     * reduce() → calcula el gasto total. filter() → selecciona los gastos de una categoría. reduce() → suma esos gastos.
     * El reduce nos devuelve un objeto tipo { Alimentación: 300,Transporte: 100,Vivienda: 500, ...}
     */
    const gastosPorCategoria = categorias.reduce(
        (resultado, categoria) => {
            resultado[categoria] = gastos
                .filter(gasto => gasto.categoria === categoria)
                .reduce((total, gasto) => total + gasto.importe, 0)
            return resultado
        }, 
        {}
    )

    /**
     * reduce() -> nos permite calcular la categoria con mayor gasto
     * operador ternario -> compara los valores de las categorias y nos quedamos con la de mayor valor.
     */
    const categoriaMayorGasto = Object.keys(gastosPorCategoria).reduce(
        (mayor, categoria) => {
            return mayor == null
                ? categoria : gastosPorCategoria[categoria] > gastosPorCategoria[mayor]
                    ? categoria
                    : mayor
        },
        null
    )

    /**
    * Aqui evitamos división por cero con operador ternario. 
    * Si el núermo de gastos en el array es > 0 hace el calculo del gasto medio
    */
    const gastoMedio = gastos.length > 0
        ? totalGastos / gastos.length
        : 0

    return (
        <div>
            <br />
            <p>Resumen Financiero</p>
            <p>--------------------------</p>
            <p>Ingresos: {ingresos} €</p>
            <p>Gastos: {totalGastos} €</p>
            <p>Disponible: {disponible} €</p>
            <br />
            <p>Gastos por categoría y porcentaje sobre el gasto total</p>
            <p>-------------------------------------------------------------</p>
            {
                /**
                 * Object.keys() → convierte las categorías del objeto en un array. filter() → elimina las categorías con 0 €. map() → genera el HTML.
                 * La línea {((gastosPorCategoria[categoria] / totalGastos) * 100).toFixed(2)} % añade el porcentaje con dos decimales sobre los gastos para cada categoría
                 */
                Object.keys(gastosPorCategoria)
                    .filter((categoria) => gastosPorCategoria[categoria] > 0)
                    .map((categoria) => {

                        /**
                         * Aqui evitamos división por cero con operador ternario. 
                         * Crea una constante llamada porcentaje. Si totalGastos es mayor que 0, calcula el porcentaje; si no, asigna 0.
                         */
                        const porcentaje = totalGastos > 0
                            ? (gastosPorCategoria[categoria] / totalGastos) * 100
                            : 0

                        //return explícito
                        //toFixed(2) doble decimal
                        return (
                            <p key={categoria}>
                                {categoria}: {gastosPorCategoria[categoria]} € - {porcentaje.toFixed(2)} %
                            </p>
                        )
                    })
            }
            <br />
            <p>Gasto medio por categoría</p>
            <p>------------------------------</p>
            <p>{gastoMedio.toFixed(2)} €</p>
            <br />
            <p>Categoría de mayor gasto</p>
            <p>------------------------------</p>
            <p>{categoriaMayorGasto}</p>
        </div>
    )
}