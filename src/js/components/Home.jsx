import React, { useState } from "react";
import Input from "./Input";
import List from "./List";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");

  const url = "https://playground.4geeks.com/todo"; //URL base de la API que se usa para las peticiones

  function getTasks(user) { //llamar a las tareas de usuario
    if (!user) return;

    fetch(url + "/users/" + user) //petición fetch para obtener los datos de esse usuario a la API.
      .then((res) => {
        if (!res.ok) { // Si el usuario no existe o hay error no guardamos usuario ni tareas
          setUsername("");
          setTasks([]);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUsername(user);//Guardar nombre usuario
          setTasks(data.todos || []);
        }
      })
      .catch(() => { //por si ocurre cualquier error en la peticion limpiamos el estado para evitar datos incorrectos
        setUsername("");
        setTasks([]);
      });
  }

  function addTask(label) {
    if (label === "" || username === "") { // No permite agregar tarea si no hay usuario válido
      return;
    }

    let task = {
      label: label,
      is_done: false,
    };

    fetch(url + "/todos/" + username, {//eEnviar tarea con post
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())//converison a json
      .then((newTask) => {
        setTasks([...tasks, newTask]); //actualizaciion de estado de tareas añadiendo nueva tarea al array
      });
  }

  function deleteTask(id) { //Llamar a API para borrar tarea por id
    fetch(url + "/todos/" + id, { method: "DELETE" }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  function deleteAllTasks() { //Para borrar todas las funciones
    const deletePromises = tasks.map((task) =>
      fetch(url + "/todos/" + task.id, { method: "DELETE" })
    );

    Promise.all(deletePromises).then(() => { //Una vez terminadas las peticiones se limpia el estado de tareas
      setTasks([]);
    });
  }

  return (
    <div className="container py-5">
      <h1 className="text-center">Xander's ToDo List</h1>
      <input className="form-control my-3" placeholder="Escribe tu nombre de usuario"
        onKeyDown={(e) => {
          if (e.key === "Enter") { // al presionar enter cargar las tareas de ese usuario
            getTasks(e.target.value.trim());
          }
        }}
      />

      <Input onAddTask={addTask} disabled={username === ""}//Mostrar Input pero desactivado si no hay usuario
      /> 
      <List tasks={tasks} onDeleteTask={deleteTask} />

      {tasks.length > 1 && ( //si hay mas de una tarea mostramos un boton para eliminar todas
        <button className="btn btn-outline-danger mt-3" onClick={deleteAllTasks}>
          Eliminar todas las tareas
        </button>
      )}
    </div>
  );
};

export default Home;
