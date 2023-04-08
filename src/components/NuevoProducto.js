import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { crearNuevoProducto } from '../actions/productoActions';

const NuevoProducto = ({history}) => {
    let navigate = useNavigate();

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // usar dispatch para devocvler una funcion
    const dispatch = useDispatch();

    // acceder al state del store
    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state => state.productos.error)

    // mandar llamar la action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProducto(producto) );
    
    // cuando se hace onSubmit
    const subirNuevoProducto = e =>{ 
        e.preventDefault();

        // validar el formulario
        if(nombre.trim() === '' || precio <= 0){
            return;
        }
        // si no hay errores

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });
        // redireccionar la home
        navigate("/");
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar nuevo producto
                        </h2>
                        <form
                            onSubmit={subirNuevoProducto}
                        >
                            <div className='form-group'>
                                <input
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                    type='text'
                                    placeholder='Nombre del producto'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    name='precio'
                                    value={precio}
                                    onChange={e => guardarPrecio( Number(e.target.value) )}
                                    type='number'
                                    placeholder='precio del producto'
                                    className='form-control'
                                />
                            </div>
                            <input 
                                type='submit'
                                value={"Agregar"}
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            />
                        </form>
                        { cargando ? <p className=''>Cargando...</p> : null }
                        { error ? <p className='alert alert-danger p2 mt-2 text-center'>Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;