import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import ButtonLogout from "./ButtonLogout";

const TodosAutores = () => {

    const [autores, setAutores] = useState([]);

    const history = useHistory();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/autores", {withCredentials: true})
            .then(res => setAutores(res.data))
            .catch(err => {
                if(err.response.status === 401){
                    history.push("/login");
                }
            });
    }, [])

    const borrarAutor = idAutor => {
        // bootbox.dialog({
        //     message:"¿Desea eliminar el autor?",
        //     buttons: {
        //         aceptar:{
        //             label: "Aceptar",
		// 			className: "btn-primary",
		// 			callback: function() {
        //                 //DELETE
        //             }
        //         },
        //         cancelar: {
        //             label: "Cancelar",
		// 			className: "btn-danger",
		// 			callback: function() {
		// 				$('.modal-dialog').modal('hide');
		// 			}
        //         }
        //     }
        // });
        axios.delete("http://localhost:8000/api/autores/"+idAutor, {withCredentials: true})
            .then(res => {
                let nuevaLista = autores.filter(autor => autor._id !== idAutor);
                setAutores(nuevaLista);
                
            })
    }

    return (
        <div>
            <h1>Autores</h1>
            <Link to="/nuevo" className="btn btn-success">Nuevo Autor</Link>
            <ButtonLogout />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Libros</th>
                        <th>Artículos</th>
                        <th>Novela Gráfica</th>
                        <th>Cuentos</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor, index) => (
                            <tr key={index}>
                                <td>{autor.nombre}</td>
                                <td><img className="img-fluid" src={autor.imagen} alt="imagen"/></td>
                                <td>
                                    { autor.libros ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>
                                    { autor.articulos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>
                                    { autor.novelagrafica ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>
                                    { autor.cuentos ? <span className="glyphicon glyphicon-ok text-success"></span> : <span className="glyphicon glyphicon-remove text-danger"></span>}
                                </td>
                                <td>{autor.createdAt}</td>
                                <td>
                                    <Link to={`/autor/editar/${autor._id}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-danger" onClick={() => borrarAutor(autor._id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default TodosAutores;