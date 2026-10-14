import { useState } from 'react'

export function ExpenseForm({ setGastos, categorias }) {

    const [concepto, setConcepto] = useState('')
    const [importe, setImporte] = useState('')
    const [fecha, setFecha] = useState('')
    const [categoria, setCategoria] = useState('')

    const handleSubmit = async () => { // async => función asíncrona: controlar el tiempo de respuesta de la petición HTTP a fastapi

        if (!concepto) {
            alert('Introduce un concepto')
            return
        }
        if (!importe) {
            alert('Introduce un importe')
            return
        } else if (importe <= 0) {
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
        * Registramos un gasto mediante una petición HTTP POST a la ruta /gastos del backend.
        */
        try {
            const respuesta = await fetch('http://127.0.0.1:8000/gastos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // JSON.stringify(...) convierte los datos del formulario a JSON para enviarlos a FastAPI
                    concepto,
                    importe: Number(importe),
                    fecha,
                    categoria
                })
            })

            if (!respuesta.ok) {
                throw new Error('No se ha podido guardar el gasto')
            }

            const nuevoGasto = await respuesta.json()

            setGastos(prevGastos => [...prevGastos, nuevoGasto]) // setGastos(...) añade a la interfaz el registro devuelto por el backend, no un identificador inventado por React.

            //Limpiamos los estados concepto e importe para que los inputs queden vacíos después de añadir un gasto
            setConcepto('')
            setImporte('')
            setFecha('')
            setCategoria('')

        } catch (error) {
            console.error('Error al registrar el gasto:', error)
            alert('No se ha podido guardar el gasto')
        }
    }

    return (
        <div>
            <h3>Histórico de gastos</h3>
            <label>Concepto: </label>

            <input placeholder="ej: Compra Mercadona" value={concepto} onChange={(event) => {
                //Creamos un input controlado para el concepto del gasto. El valor del input es el estado concepto y cada vez que el usuario escribe algo en el input, se actualiza el estado concepto con el valor del input.
                setConcepto(event.target.value)
            }} />

            <label>Importe: </label>
            <input type="number" placeholder="ej: 100" value={importe} onChange={(event) => {
                setImporte(event.target.value)
            }} />

            <label>Fecha: </label>
            <input type="date" value={fecha} onChange={(event) => {
                setFecha(event.target.value)
            }} />

            <label>Categoría: </label>
            <select value={categoria} onChange={(event) => {
                setCategoria(event.target.value)
            }}>
                <option value="">Selecciona una categoría</option>
                {categorias.map((nombreCategoria) => (
                    <option key={nombreCategoria} value={nombreCategoria}>
                        {nombreCategoria}
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit}>
                Añadir gasto
            </button>
        </div>
    )
}

