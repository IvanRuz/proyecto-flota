document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('incidenciaForm');
    const lista = document.getElementById('listaIncidencias');
    const selectTipo = document.getElementById('tipo');

    // Formateo de los strings para la vista de usuario
    const formatosTipo = {
        'mecanica': 'Mecánica',
        'electrica': 'Eléctrica',
        'carroceria': 'Carrocería'
    };

    // Validación interactiva del select
    selectTipo.addEventListener('change', () => {
        if (selectTipo.value === "") {
            selectTipo.setCustomValidity("Por favor, seleccione un Tipo de Avería");
        } else {
            selectTipo.setCustomValidity("");
        }
    });

    formulario.addEventListener('submit', (event) => {
        if (selectTipo.value === "") {
            selectTipo.setCustomValidity("Por favor, seleccione un Tipo de Avería");
            selectTipo.reportValidity();
            event.preventDefault();
            return;
        }

        event.preventDefault();

        const vehiculo = document.getElementById('vehiculo').value;
        const tipoOriginal = selectTipo.value;
        const tipoFormateado = formatosTipo[tipoOriginal] || tipoOriginal;

        // Guardar en LocalStorage
        const incidencia = { vehiculo, tipo: tipoFormateado };
        localStorage.setItem('ultimaIncidencia', JSON.stringify(incidencia));

// Añadir elemento visible a la lista
        const li = document.createElement('li');
        li.textContent = `Vehículo: ${vehiculo} - Tipo: ${tipoFormateado}`;
        lista.appendChild(li);

        // Uso del componente externo (SweetAlert2) para cumplir ECP0951_2
        Swal.fire({
            title: '¡Incidencia Registrada!',
            text: `El vehículo ${vehiculo} ha sido reportado con éxito.`,
            icon: 'success',
            confirmButtonColor: '#0056b3'
        });

        // Reset completo
        formulario.reset();
        selectTipo.setCustomValidity("");
    });
});