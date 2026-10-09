/**
 * Representación gráfica de los ingresos vs gastos mensuales mediante barras
 * Libreria Recharts permite la creación de gráficos en React
 */

import {
    ResponsiveContainer,//adapta el gráfico al ancho disponible
    BarChart,//define el gráfico de barras
    Bar,//representa una serie de datos, en nuestro caso ingresos o gastos
    XAxis,//muestra los meses en el eje horizontal
    YAxis,//muestra los importes en el eje vertical
    CartesianGrid,//dibuja las líneas de referencia
    Tooltip,//muestra información al pasar el cursor por una barra
    Legend //identifica las series del gráfico
} from 'recharts'

export function IncomeExpenseChart({ ingresosYGastosPorMes, añoSeleccionado }) {

    return (
        <div>
            <h3>Ingresos vs. gastos mensuales - {añoSeleccionado} </h3>
            {
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ingresosYGastosPorMes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis tickFormatter={(valor) => `${valor} €`}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ingresos" name="Ingresos" fill="#16a34a" />
                        <Bar dataKey="gastos" name="Gastos" fill="#dc2626" />
                    </BarChart>
                </ResponsiveContainer>
            }
        </div>
    )
}