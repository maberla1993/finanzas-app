import { useState } from 'react'

export function ExpenseForm({ setGastos, categorias}) {

    const [concepto, setConcepto] = useState('')
    const [importe, setImporte] = useState('')
    const [fecha, setFecha] = useState('')
    const [categoria, setCategoria] = useState('')

    const handleSubmit = () => {

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
        * Añadimos un nuevo gasto al array de gastos. Para ello, usamos la función setGastos que nos ha pasado el componente padre (App.jsx) como prop. 
        * Esta función recibe como argumento una función que recibe el estado anterior (prevGastos) y devuelve el nuevo estado (un array con los gastos anteriores y el nuevo gasto). 
        */
        setGastos(prevGastos => [...prevGastos, {
            id: prevGastos.length + 1,
            fecha,
            concepto,
            importe: Number(importe),
            categoria
        }])

        //Limpiamos los estados concepto e importe para que los inputs queden vacíos después de añadir un gasto
        setConcepto('')
        setImporte('')
        setFecha('')
        setCategoria('')
    }

    return (
        <div>
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

