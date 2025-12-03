// @ts-nocheck
// Primero, desactivamos el chequeo de tipos de TypeScript en archivos .js para evitar advertencias en VS Code.

/**
 * Función princpal que agrega una nueva tarea a la lista.
 * - Lee el texto del input.
 * - Crea el elemento <li> con su contenido.
 * - Añade botones de editar y borrar con sus acciones.
 * - Inserta el <li> en la lista.
 */
function agregarTarea() {
  // Referencias a los elementos del DOM: input de texto y lista de tareas
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  // Crea el contenedor de la tarea: un <li>.
  const li = document.createElement("li");
  // Clases de Tailwind para estilo: distribución, fondo, padding, bordes y sombra
  li.className =
    "flex justify-between items-center bg-gray-50 p-2 rounded shadow mt-2";

  // Crea el elemento que muestra el texto de la tarea
  const span = document.createElement("span");
  span.textContent = taskText; // Asignamos el txto.
  span.className = "flex-1"; // ocupa el espacio disponible en la fila

  // ----- Botón EDITAR -----
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️Editar";
  editBtn.className = "ml-2 text-yellow-600 hover:text-yellow-800";

  // Al hacer clic en "Editar", cambiamos el span por un input para editar inline
  editBtn.onclick = () => {
    // Crea un input de edición y le pone el texto actual de la tarea
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = span.textContent;
    inputEdit.className = "border px-2 py-1 flex-1";

    // Crea el botón "Guardar" que confirmará la edición
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "💾Guardar";
    saveBtn.className = "ml-2 text-green-600 hover:text-green-800";

    // Al guardar:
    // - Si el texto no está vacío, actualizamos el contenido del span
    // - Restauramos la vista original (span + botón Editar)
    saveBtn.onclick = () => {
      if (inputEdit.value.trim() !== "") {
        span.textContent = inputEdit.value.trim();
      }
      // Reemplaza el input por el span original.
      li.replaceChild(span, inputEdit);
      // Reemplaza el botón Guardar por el botón Editar
      li.replaceChild(editBtn, saveBtn);
    };

    // Intercambia temporalmente:
    // - Muestra el input en lugar del texto (span)
    // - Muestra "Guardar" en lugar de "Editar"
    li.replaceChild(inputEdit, span);
    li.replaceChild(saveBtn, editBtn);
  };

  // ---- Botón BORRAR --
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️Borrar";
  deleteBtn.className = "ml-2 text-red-600 hover:text-red-800";

  // Al hacer clic en "Borrar", elimina este <li> de la lista
  // Usa la referencia 'li' (esta tarea específica) y la remueve del DOM
  deleteBtn.onclick = () => li.remove();

  // Inserta los elementos dentro del <li> en el orden: texto, editar, borrar
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  // Finalmente, agrega el <li> completo a la lista de tareas
  taskList.appendChild(li);

  // Limpia el input para que se pueda escribir otra tarea
  taskInput.value = "";
}
