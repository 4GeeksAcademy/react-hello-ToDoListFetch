import React, { useState } from "react";

function Input(props) {
  const [input, setInput] = useState("");

  function handleInputChange(event) { //Actualizacion del texto actual
    setInput(event.target.value);
  }

  function handleKeyPress(event) { //Al presionar enter llama a funcion onAddTask para pasar el texto escrito
    if (event.key === "Enter") {
      props.onAddTask(input);
      setInput(""); //Luego limpia el campo
    }
  }

  return (
    <input
      className="form-control"
      type="text"
      placeholder="Escribe una tarea y presiona Enter"
      value={input}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      disabled={props.disabled}
    />
  );
}

export default Input;
