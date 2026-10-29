import { useState } from 'react'

export function ExpenseItem({ id, fecha, concepto, importe, categoria, eliminarGasto, editarGasto }) {

    const [editando, setEditando] = useState(false) //false → mostramos el gasto normalmente, true → mostramos el formulario de edición
    const [nuevoImporte, setNuevoImporte] = useState(importe) // nuevoImporte tendrá el valor actual del importe del gasto y hasta que no pulsemos en guardar, ese cambio no se va a producir en el nuevoImporte

    return (
        // Cuando hagas clic, ejecuta esta función y pásale este id.
        <article className="expense-item">
            <div className="expense-item-header">
                <div className="expense-item-info">
                    <h4>{concepto}</h4>
                    <span className="expense-category">{categoria}</span>
                </div>

                {/* Mostramos el importe de forma destacada cuando no estamos editando */}
                {!editando && (
                    <p className="expense-amount">
                        -{Number(importe).toFixed(2)} €
                    </p>
                )}
            </div>

            <p className="expense-date">Fecha: {fecha}</p>

            {
                editando ? (
                    //modo edit
                    <div className="expense-edit-form">
                        <label htmlFor={`importe-${id}`}>Nuevo importe (€)</label>

                        <input
                            id={`importe-${id}`}
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={nuevoImporte}
                            onChange={(event) => {
                                setNuevoImporte(event.target.value)
                            }}
                        />

                        <div className="expense-actions">
                            <button
                                className="button-save"
                                onClick={() => {

                                    if (Number(nuevoImporte) <= 0 || nuevoImporte === '') {
                                        alert('Introduce un importe válido')
                                        return
                                    }

                                    editarGasto(id, Number(nuevoImporte))
                                    setEditando(false)
                                }}
                            >
                                Guardar
                            </button>

                            <button
                                className="button-cancel"
                                onClick={() => {
                                    setNuevoImporte(importe) //mantenemos el importe inicial ya que si no lo ponemos, cambia aunque cancelemos la modificación
                                    setEditando(false)
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    //modo normal
                    <div className="expense-actions">
                        <button
                            className="button-edit"
                            onClick={() => {
                                setNuevoImporte(importe)
                                setEditando(true)
                            }}
                        >
                            Editar importe
                        </button>

                        <button
                            className="button-delete"
                            onClick={() => eliminarGasto(id)}
                        >
                            Eliminar gasto
                        </button>
                    </div>
                )
            }
        </article>
    )
}