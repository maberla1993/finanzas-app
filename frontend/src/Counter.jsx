import { useState } from 'react'
//Ejemplo para entender el uso de useState. Se puede eliminar si no se va a usar.
export function Counter() {

    const [count, setCount] = useState(0)

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <p>Contador: {count}</p>
        </div>
    )
}