import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERRORR,

    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERRORR
} from '../types'

// crear
export function crearNuevoProducto(producto){
    return async (dispatch) =>{
        dispatch( agregarProducto() );

        try {
            // insertar en el API
            await clienteAxios.post('/productos', producto);
            // si todo sale OK, actualiza el state
            dispatch( agregarProductoExito(producto) );
            // aslerta
            Swal.fire(
                'correcto',
                'el producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch( agregarProductoError(true) );
            // alerta de error
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// si el producto se guarda en la BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// si hay un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// funcion que descarga de la BD
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            // console.log(respuesta.data)
            dispatch( descargaProductosExitosa(respuesta.data) )
        } catch (error) {
            dispatch( descargaProductosError() );
            console.log('error xd');
        }
    }
}

const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            // si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'Eliminado correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERRORR,
    payload: true
})

// colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({
    type:OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// editar registro en el API y el state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto() )
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto) );
        } catch (error) {
            
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})