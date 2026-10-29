// Separamos responsabilidades para dejar App mas claro

const API_URL = 'http://127.0.0.1:8000'

export async function eliminarGastoAPI(id) {
    const respuesta = await fetch(`${API_URL}/gastos/${id}`, {
        method: 'DELETE'
    })

    if (!respuesta.ok) {
        throw new Error('No se ha podido eliminar el gasto')
    }
}

export async function eliminarIngresoAPI(id) {
    const respuesta = await fetch(`${API_URL}/ingresos/${id}`, {
        method: 'DELETE'
    })

    if (!respuesta.ok) {
        throw new Error('No se ha podido eliminar el ingreso')
    }
}


export async function editarGastoAPI(id, gastoActualizado) {
    const respuesta = await fetch(`${API_URL}/gastos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gastoActualizado)
    })

    if (!respuesta.ok) {
        throw new Error('No se ha podido actualizar el gasto')
    }

    return await respuesta.json()
}

export async function editarIngresoAPI(id, ingresoActualizado) {
    const respuesta = await fetch(`${API_URL}/ingresos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingresoActualizado)
    })

    if (!respuesta.ok) {
        throw new Error('No se ha podido actualizar el ingreso')
    }

    return await respuesta.json()
}
