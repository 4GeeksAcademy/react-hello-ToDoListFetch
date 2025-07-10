import React from "react";

function List(props) {
  return (
    <ul className="list-group mt-3">
      {props.tasks.map(function (task) { //map para recorrer array de tareas 
        return (//cada tarea mostrada como li
          <li key={task.id} className="list-group-item d-flex justify-content-between"> 
            {task.label}
            <button className="btn btn-sm btn-danger" onClick={function () {//boton rojo para eliminar tarea
                props.onDeleteTask(task.id); //borrar tarea de home
            }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default List;



