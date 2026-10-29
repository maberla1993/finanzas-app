/**
 * Representación gráfica de los ingresos vs gastos mensuales mediante barras
 * Libreria Recharts permite la creación de gráficos en React
 */


import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'

export function IncomeExpenseChart({ ingresosYGastosPorMes, añoSeleccionado }) {
    return (
        <section className="chart-card">
            <div className="chart-header">
                <h3>Gráfico anual de ingresos y gastos</h3>
                <p>Comparativa mensual de {añoSeleccionado}</p>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={ingresosYGastosPorMes}
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="mes"
                        interval={0}
                        angle={-35}
                        textAnchor="end"
                        height={60}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tickFormatter={(valor) => `${valor} €`}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        width={75}
                    />

                    <Tooltip
                        formatter={(valor) => [
                            `${Number(valor).toFixed(2)} €`
                        ]}
                        contentStyle={{
                            borderRadius: '10px',
                            border: '1px solid #e5e7eb'
                        }}
                    />

                    <Legend />

                    <Bar
                        dataKey="ingresos"
                        name="Ingresos"
                        fill="#16a34a"
                        radius={[5, 5, 0, 0]}
                    />

                    <Bar
                        dataKey="gastos"
                        name="Gastos"
                        fill="#dc2626"
                        radius={[5, 5, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
}
