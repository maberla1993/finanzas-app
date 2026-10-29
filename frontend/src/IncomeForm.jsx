
import { useState } from 'react'

export function IncomeForm({ setIngresos }) {

    const [concepto, setConcepto] = useState('')
    const [importe, setImporte] = useState('')
    const [fecha, setFecha] = useState('')
    const [categoria, setCategoria] = useState('')

    const handleSubmit = async () => { // async => función asíncrona: controlar el tiempo de respuesta de la petición HTTP a fastapi

        if (!concepto.trim()) {
            alert('Introduce un concepto')
            return
        }
        if (!importe) {
            alert('Introduce un importe')
            return
        } else if (Number(importe) <= 0) {
            alert('Introduce un importe válido')
            return
        }
        if (!fecha) {
            alert('Introduce una fecha')
            return
        }
        if (!categoria) {
            alert('Introduce una categoría')
            return
        }

        /*
        * Registramos un ingreso mediante una petición HTTP POST a la ruta /ingresos del backend.
        */
        try {
            const respuesta = await fetch('http://127.0.0.1:8000/ingresos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // JSON.stringify(...) convierte los datos del formulario a JSON para enviarlos a FastAPI
                    concepto: concepto.trim(),
                    importe: Number(importe),
                    fecha,
                    categoria
                })
            })

            if (!respuesta.ok) {
                throw new Error('No se ha podido guardar el ingreso')
            }

            const nuevoIngreso = await respuesta.json()

            setIngresos(prevIngresos => [...prevIngresos, nuevoIngreso])

            //Limpiamos los estados concepto e importe para que los inputs queden vacíos después de añadir un ingreso
            setConcepto('')
            setImporte('')
            setFecha('')
            setCategoria('')

        } catch (error) {
            console.error('Error al registrar el ingreso:', error)
            alert('No se ha podido guardar el ingreso')
        }
    }

    return (
        <section className="income-form-card">
            <div className="form-header">
                <h3>Añadir ingreso</h3>
                <p>Registra el dinero que recibes</p>
            </div>

            <div className="form-fields">
                <div className="form-field">
                    <label htmlFor="ingreso-concepto">Concepto</label>
                    <input
                        id="ingreso-concepto"
                        type="text"
                        placeholder="Ej.: Nómina"
                        value={concepto}
                        onChange={(event) => {
                            //Creamos un input controlado para el concepto del gasto. El valor del input es el estado concepto y cada vez que el usuario escribe algo en el input, se actualiza el estado concepto con el valor del input.
                            setConcepto(event.target.value)
                        }}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="ingreso-importe">Importe (€)</label>
                    <input
                        id="ingreso-importe"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="Ej.: 100"
                        value={importe}
                        onChange={(event) => {
                            setImporte(event.target.value)
                        }}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="ingreso-fecha">Fecha</label>
                    <input
                        id="ingreso-fecha"
                        type="date"
                        value={fecha}
                        onChange={(event) => {
                            setFecha(event.target.value)
                        }}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="ingreso-categoria">Categoría</label>
                    <select
                        id="ingreso-categoria"
                        value={categoria}
                        onChange={(event) => {
                            setCategoria(event.target.value)
                        }}
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Nómina">Nómina</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
            </div>

            <button
                className="income-submit-button"
                onClick={handleSubmit}
            >
                Añadir ingreso
            </button>
        </section>
    )
}
