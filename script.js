//Aplica el estilo la opción seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    //Desaparece el menu una vez seleccionada una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//Muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("html");
        habilidades[1].classList.add("css");
        habilidades[2].classList.add("javascript");
        habilidades[3].classList.add("react");
        habilidades[4].classList.add("vue");
        habilidades[5].classList.add("phyton");
        habilidades[6].classList.add("sql");
        habilidades[7].classList.add("django");
        habilidades[8].classList.add("flask");
        habilidades[9].classList.add("scrum");
    }
}


//Detecto el scrolling para aplicar la animación de la barra de habilidades
window.onscroll = function () {
    efectoHabilidades()
};

//Validacion formulario "CONTACTAME"

function validarFormulario() {
    if (document.contactForm.nombreCompleto.value.length == 0) {
        alert("Ingrese su nombre y apellido para poder continuar.")
        document.contactForm.nombreCompleto.focus()
        return 0;
    }

    if (document.contactForm.email.value.length == 0) {
        alert("Ingrese su dirección de email.")
        document.contactForm.email.focus()
        return 0;
    }

    if (document.contactForm.asunto.value.length == 0) {
        alert("Ingrese un asunto para su mensaje.")
        document.contactForm.asunto.focus()
        return 0;
    }

    if (document.contactForm.mensaje.value.length == 0) {
        alert("Debe ingresar un mensaje para poder continuar.")
        document.contactForm.mensaje.focus()
        return 0;
    }

    alert("Tu mensaje ha sido enviado! Le estare respondiendo lo antes posible.");
    document.validarFormulario.submit();
}

/* Georef - API del Servicio de Normalización de Datos Geográficos de Argentina */
/* https://datosgobar.github.io/georef-ar-api/*/
//------------------------------------------------------------------------------//



//Funcion para traer los datos de la API y mostrar el listado de provincias.
function traerProvincia() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")

        .then(data => data.json())
        .then(data => {
            let opt = '<option value="Elige una provincia">Elige una provincia</option>';
            data.provincias.forEach(element => opt += `<option value=${element.nombre}>${element.nombre}</option>)`);
            selectProvincias.innerHTML = opt;
        })

        .catch(error => {
            let message = error.statusText || "<b>-Ocurrió un error-</b></br>";
            selectProvincias.nextElementSibling.innerHTML = `${message}`;
        })
}

//Función para mostrar listado de municipios, previa selección de provincia.
function elegirMunicipio(provincias) {
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincias}&max=1000`)
        .then(data => data.json())
        .then(data => {
            let opt = '<option value="Elige un municipio">Elige un municipio</option>';
            data.municipios.forEach(element => opt += `<option value=${element.id}>${element.nombre}</option>)`);
            selectMunicipio.innerHTML = opt;
        })

        .catch(error => {
            let message = error.statusText || "<b>-Ocurrió un error-</b></br>";
            selectMunicipio.nextElementSibling.innerHTML = `${message}`;
        })
}

selectProvincias.addEventListener("change", e => {
    elegirMunicipio(e.target.value);
    console.log(e.target.value)
})

//Función para mostrar listado de localidades, previa selección de municipio.
function elegirLocalidad(municipios) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipios}&max=1000`)
        .then(data => data.json())
        .then(data => {
            let opt = '<option value="Elige una localidad">Elige una localidad</option>';
            data.localidades.forEach(element => opt += `<option value=${element.id}>${element.nombre}</option>)`);
            selectLocalidad.innerHTML = opt;
        })

        .catch(error => {
            let message = error.statusText || "<b>-Ocurrió un error-</b></br>";
            selectLocalidad.nextElementSibling.innerHTML = `${message}`;
        })
}

selectMunicipio.addEventListener("change", e => {
    elegirLocalidad(e.target.value);
    console.log(e.target.value)
})

//Llamado a la función principal.
traerProvincia();