# Memoria Técnica del Proyecto: Portal de Gestión de Incidencias de Flota

**Autor:** Iván Ruz Carrasco[cite: 1]  
**Perfil Profesional:** Técnico de Proyecto / Desarrollo Web  
**Entorno de Evaluación:** Estándares de Competencia Profesional (ECP0950_2, ECP0951_2, ECP2817_2, ECP0952_2)  

---

## 1. Contexto Profesional y Operativo
El diseño y la lógica de este portal nacen de la traslación a código de operativas reales de mantenimiento y gestión de flotas. La arquitectura de la información, el flujo de reporte de averías y la escalabilidad del sistema están directamente fundamentados en operativas ejecutadas durante la etapa como Project Technical Manager en Etralux para el proyecto de la EMT Málaga, así como en la gestión integral de vehículos en Muving. Esta experiencia asegura que la herramienta responda a las exigencias reales de los técnicos y de la administración central, priorizando la rapidez y la trazabilidad de los datos.

## 2. Entorno de Desarrollo y Herramientas (ECP0950_2 - UC1)
Para garantizar un desarrollo ágil, se ha implementado un entorno de trabajo con las siguientes herramientas:
* **IDE (Visual Studio Code / Notepad++):** Empleado para la redacción limpia del código.
* **Navegadores de Pruebas:** Validación en Google Chrome, Mozilla Firefox y Microsoft Edge para asegurar compatibilidad.
* **Infraestructura de Red:** Despliegue en el servidor de alojamiento InfinityFree mediante el cliente FTP FileZilla.

## 3. Arquitectura HTML y Estructura Semántica (ECP0950_2 - UC2)
El documento principal (`index.html`) se ha construido priorizando la accesibilidad y el rendimiento, utilizando metaetiquetas descriptivas (descripción, palabras clave y autoría) para su correcta indexación[cite: 1].
* **Estructura Semántica:** Se han empleado etiquetas HTML5 puras (`<header>`, `<main>`, `<section>`, `<footer>`) para delimitar el contenido[cite: 1].
* **Formulario de Captura (`<form id="incidenciaForm">`):** Diseñado para evitar la introducción de datos erróneos. Incluye:
    * Un campo de texto obligatorio para el ID del Vehículo con el marcador de posición "Ej: B-1234"[cite: 1].
    * Un selector desplegable (`<select>`) para tipificar la avería (Mecánica, Eléctrica, Carrocería), con una opción inicial deshabilitada que fuerza la acción del usuario[cite: 1].
    * Una casilla de verificación (`<input type="checkbox">`) obligatoria para la aceptación de la política de privacidad[cite: 1].
* **Inclusión de Recursos:** Vinculación a hojas de estilo externas (`css/estilos.css`) y a la librería CDN de SweetAlert2 en la cabecera del documento para garantizar una carga asíncrona eficiente[cite: 1].

## 4. Maquetación y Hojas de Estilo CSS (ECP2817_2)
El diseño visual se controla desde `css/estilos.css`, prescindiendo de frameworks pesados para maximizar la velocidad de carga.
* **Diseño Fluido y Centrado:** Se ha configurado un ancho máximo de 450px para el formulario con márgenes automáticos (`margin: 20px auto`) para asegurar una interfaz compacta y proporcionar una experiencia de usuario focalizada[cite: 2].
* **Flexbox:** Implementación del modelo de caja flexible en el contenedor de la LOPD (`.lopd-container`) usando `display: flex; align-items: center; justify-content: center;`, garantizando una alineación perfecta entre el *checkbox* y el texto legal[cite: 2].
* **Diseño Adaptativo (*Responsive*):** Uso de *Media Queries* (`@media (max-width: 600px)`) que ajustan el ancho del formulario al 95% en dispositivos móviles, asegurando operatividad en las PDAs de los técnicos a pie de calle[cite: 2].
* **Identidad Visual:** Empleo de una paleta cromática limpia con fondo claro (`#f4f4f4`) y elementos de acción en azul corporativo (`#0056b3`) que reaccionan al estado *hover* (`#004494`) para dar retroalimentación visual al usuario[cite: 2].

## 5. Lógica del Sistema e Integración de Terceros (ECP0951_2)
El archivo `js/app.js` orquesta el comportamiento del portal, interceptando el evento `submit` del formulario para procesar los datos sin recargar la página (`event.preventDefault()`)[cite: 3].
* **Validación Personalizada:** Uso del método `setCustomValidity` para alertar al usuario si intenta enviar el parte sin seleccionar un tipo de avería válido[cite: 3].
* **Persistencia en LocalStorage:** El sistema guarda el último parte introducido convirtiendo el objeto de la incidencia a formato JSON (`localStorage.setItem('ultimaIncidencia', JSON.stringify(incidencia))`), asegurando que los datos sobrevivan a recargas accidentales[cite: 3].
* **Manipulación del DOM:** Las incidencias validadas se insertan dinámicamente en pantalla creando elementos de lista (`lista.appendChild(li)`) en tiempo real[cite: 3].
* **Componente Externo (SweetAlert2):** Para mejorar la experiencia interactiva, se sustituyen las alertas nativas del navegador por ventanas modales de SweetAlert2 (`Swal.fire`), confirmando visualmente el éxito de la operación[cite: 3].

## 6. Aseguramiento Legal de la Información (ECP0950_2.3.2)
* **Cumplimiento LOPDGDD:** El proyecto integra el documento `privacidad.html` (actualizado a 26 de junio de 2026) que especifica la finalidad del tratamiento de datos (coordinación de reparaciones), los tiempos de conservación y las vías para el ejercicio de derechos por parte de los usuarios, cumpliendo estrictamente con la normativa vigente[cite: 4]. El enlace a este documento se abre en una pestaña nueva (`target="_blank"`) para no interrumpir el proceso de registro del operario[cite: 1].

## 7. Sistema de Copias de Seguridad y Control de Versiones (ECP0952_2)
Para garantizar la integridad del código ante cualquier eventualidad en el servidor de producción (InfinityFree), se ha implementado un sistema de doble respaldo utilizando Git:
* **Entorno Local:** Cada avance funcional se empaqueta mediante comandos en consola (`git add .` y `git commit -m "..."`), generando huellas criptográficas que documentan el historial completo del proyecto.
* **Repositorio Remoto (GitHub):** Todos los cambios confirmados se sincronizan en la nube (`git push`), estableciendo un sistema de recuperación instantánea (CI/CD manual) que protege el trabajo frente a pérdidas locales o caídas del hosting.