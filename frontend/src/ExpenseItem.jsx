import { useState } from 'react'

export function ExpenseItem({ id, fecha, concepto, importe, categoria, eliminarGasto, editarImporte }) {

    const [editando, setEditando] = useState(false) //false → mostramos el gasto normalmente, true  → mostramos el formulario de edición
    const [nuevoImporte, setNuevoImporte] = useState(importe) // nuevoImporte tendrá el valor actual del importe del gasto y hasta que no pulsermos en guardar, ese cambio no se va a producir en el nuevoimporte

    return (
        // Cuando hagas clic, ejecuta esta función y pásale este id.
        <div>
            <p>Fecha: {fecha}</p>
            <p>Concepto: {concepto}</p>
            <p>Categoria: {categoria}</p>
            {
                editando ? (
                    //modo edit
                    <p>
                        Importe: <input
                            type="number"
                            value={nuevoImporte}
                            onChange={(event) => {
                                setNuevoImporte(event.target.value)
                            }}
                        />

                        <button onClick={() => {

                            if (Number(nuevoImporte) <= 0) {
                                alert('Introduce un importe válido')
                                return
                            }

                            editarImporte(id, Number(nuevoImporte))
                            setEditando(false)
                        }}>
                            Guardar
                        </button>

                        <button onClick={() => {
                            setNuevoImporte(importe) //mantenemos el importe inicial ya que si no pondemos esto lo cambia aunque cancelemos la modificación
                            setEditando(false)
                        }}>
                            Cancelar
                        </button>
                    </p>
                ) : (
                    //modo normal
                    <p>Importe: {importe} €</p>
                )
            }

            <button onClick={() => eliminarGasto(id)}>
                Eliminar gasto
            </button>

            <button onClick={() => setEditando(true)}>
                Editar importe
            </button>

            <p>--</p>
        </div>
    )
}