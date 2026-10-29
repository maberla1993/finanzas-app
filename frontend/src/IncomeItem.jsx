import { useState } from 'react'

export function IncomeItem({ id, fecha, concepto, importe, categoria, eliminarIngreso, editarIngreso }) {

    const [editando, setEditando] = useState(false) //false → mostramos el ingreso normalmente, true → mostramos el formulario de edición
    const [nuevoImporte, setNuevoImporte] = useState(importe) // nuevoImporte guarda temporalmente el importe que estamos editando

    return (
        // Cuando hagas clic, ejecuta esta función y pásale este id.
        <article className="income-item">
            <div className="income-item-header">
                <div className="income-item-info">
                    <h4>{concepto}</h4>
                    <span className="income-category">{categoria}</span>
                </div>

                {/* Mostramos el importe de forma destacada cuando no estamos editando */}
                {!editando && (
                    <p className="income-amount">
                        +{Number(importe).toFixed(2)} €
                    </p>
                )}
            </div>

            <p className="income-date">Fecha: {fecha}</p>

            {
                editando ? (
                    //modo edit
                    <div className="income-edit-form">
                        <label htmlFor={`importe-ingreso-${id}`}>
                            Nuevo importe (€)
                        </label>

                        <input
                            id={`importe-ingreso-${id}`}
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={nuevoImporte}
                            onChange={(event) => {
                                setNuevoImporte(event.target.value)
                            }}
                        />

                        <div className="income-actions">
                            <button
                                className="button-save"
                                onClick={() => {

                                    if (Number(nuevoImporte) <= 0 || nuevoImporte === '') {
                                        alert('Introduce un importe válido')
                                        return
                                    }

                                    editarIngreso(id, Number(nuevoImporte))
                                    setEditando(false)
                                }}
                            >
                                Guardar
                            </button>

                            <button
                                className="button-cancel"
                                onClick={() => {
                                    setNuevoImporte(importe) //mantenemos el importe inicial para descartar los cambios al cancelar
                                    setEditando(false)
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    //modo normal
                    <div className="income-actions">
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
                            onClick={() => eliminarIngreso(id)}
                        >
                            Eliminar ingreso
                        </button>
                    </div>
                )
            }
        </article>
    )
}