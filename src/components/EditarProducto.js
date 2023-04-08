import React, { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // nuevo state del producto
  const [ producto, guardarProducto ] = useState({
    nombre: '',
    precio: '' 
  });

  // producto a editar
  const productoeditar = useSelector(state => state.productos.productoeditar);

  // llenar el state automaticamente
  useEffect( () => {
    guardarProducto(productoeditar);
  }, [productoeditar])

  // leer los datos del formulario
  const onChangeFormulario = e =>{
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const { nombre, precio} = producto;

  const submitEditarProducto = e => {
    e.preventDefault();

    dispatch( editarProductoAction(producto) );
    navigate('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar el producto
            </h2>
            <form
              onSubmit={submitEditarProducto}
            >
              <div className="form-group">
                <input
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={onChangeFormulario}
                  placeholder="Nombre del producto"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  name="precio"
                  type="number"
                  value={precio}
                  onChange={onChangeFormulario}
                  placeholder="precio del producto"
                  className="form-control"
                />
              </div>
              <input
                type="submit"
                value={"Guardar cambios"}
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;