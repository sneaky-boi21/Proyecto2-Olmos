const tareaForm = document.getElementById('tareaForm');
const nombreTareaInput = document.getElementById('nombreTarea');
const materiaInput = document.getElementById('materia');
const detallesInput = document.getElementById('detalles');
const fechaEntregaInput = document.getElementById('fechaEntrega');
const tareasList = document.getElementById('tareasList');

// Manejar el evento de envío del formulario
tareaForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const nombreTarea = nombreTareaInput.value.trim();
  const materia = materiaInput.value.trim();
  const detalles = detallesInput.value.trim();
  const fechaEntrega = fechaEntregaInput.value;

  if (nombreTarea === '' || materia === '' || detalles === '' || fechaEntrega === '') {
    alert('Por favor, completa todos los campos');
    return;
  }

  const tareaItem = document.createElement('li');
  tareaItem.innerHTML = `
    <strong>${nombreTarea}</strong>
    <br>
    Materia: ${materia}
    <br>
    Detalles: ${detalles}
    <br>
    Fecha de entrega: ${fechaEntrega}
  `;

  tareasList.appendChild(tareaItem);

  nombreTareaInput.value = '';
  materiaInput.value = '';
  detallesInput.value = '';
  fechaEntregaInput.value = '';
  }
);