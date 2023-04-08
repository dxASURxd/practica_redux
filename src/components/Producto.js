import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate  } from 'react-router-dom';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto

    const dispatch = useDispatch();
    const navigate = useNavigate (); //habilitar history para redireccion

    // confirmar si quiere eliminar
    const confirmarEliminarProducto = id => {

        // preguntar 
        Swal.fire({
            title: 'Seguro de eliminar?',
            text: "No podras recuperar el producto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, a la chingada!',
            cancelButtonText: 'cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
        })


    }

    // funcion que redirigew de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) )
        navigate(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>$ {precio}</span></td>
            <td className='acciones'>
                <button 
                    onClick={ () => redireccionarEdicion(producto) }
                    to={'/productos/editar/${id}'} className='btn btn-primary mr-2'> 
                    Editar
                </button>
                <button 
                    type='button'
                    className='btn btn-danger'
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>    
    );
}
 
export default Producto;