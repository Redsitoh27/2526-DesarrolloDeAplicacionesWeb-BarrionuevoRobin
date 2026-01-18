// Obtener referencias a los campos del formulario
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");
const btnEnviar = document.getElementById("btnEnviar");
const form = document.getElementById("registroForm");

/**
 * Muestra un error en un campo
 * @param {HTMLElement} input Campo a validar
 * @param {string} mensaje Mensaje de error
 */
function mostrarError(input, mensaje) {
    input.classList.add("is-invalid"); // Bootstrap inválido
    input.classList.remove("is-valid");
    input.nextElementSibling.textContent = mensaje;
}

/**
 * Marca un campo como válido
 * @param {HTMLElement} input Campo validado
 */
function mostrarValido(input) {
    input.classList.add("is-valid"); // Bootstrap válido
    input.classList.remove("is-invalid");
    input.nextElementSibling.textContent = "";
}

/**
 * Valida el nombre (mínimo 3 caracteres)
 */
function validarNombre() {
    if (nombre.value.trim().length >= 3) {
        mostrarValido(nombre);
        return true;
    } else {
        mostrarError(nombre, "El nombre debe tener al menos 3 caracteres");
        return false;
    }
}

/**
 * Valida el correo usando expresión regular
 */
function validarCorreo() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(correo.value)) {
        mostrarValido(correo);
        return true;
    } else {
        mostrarError(correo, "Formato de correo inválido");
        return false;
    }
}

/**
 * Valida la contraseña:
 * - mínimo 8 caracteres
 * - al menos un número
 * - al menos un carácter especial
 */
function validarPassword() {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    const valor = password.value.trim();

    if (regex.test(valor)) {
        mostrarValido(password);
        return true;
    } else {
        mostrarError(
            password,
            "La contraseña debe tener mínimo 8 caracteres, una letra, un número y un carácter especial"
        );
        return false;
    }
}

/**
 * Verifica que las contraseñas coincidan
 */
function validarConfirmacion() {
    if (confirmPassword.value === password.value && confirmPassword.value !== "") {
        mostrarValido(confirmPassword);
        return true;
    } else {
        mostrarError(confirmPassword, "Las contraseñas no coinciden");
        return false;
    }
}

/**
 * Valida que la edad sea mayor o igual a 18
 */
function validarEdad() {
    if (edad.value >= 18) {
        mostrarValido(edad);
        return true;
    } else {
        mostrarError(edad, "Debes ser mayor de 18 años");
        return false;
    }
}

/**
 * Verifica todo el formulario
 * Si todos los campos son válidos, habilita el botón Enviar
 */
function validarFormulario() {
    const formularioValido =
        validarNombre() &&
        validarCorreo() &&
        validarPassword() &&
        validarConfirmacion() &&
        validarEdad();

    btnEnviar.disabled = !formularioValido;
}

/* Validaciones en tiempo real */
nombre.addEventListener("input", validarFormulario);
correo.addEventListener("input", validarFormulario);
password.addEventListener("input", validarFormulario);
confirmPassword.addEventListener("input", validarFormulario);
edad.addEventListener("input", validarFormulario);

/**
 * Evento submit
 * Muestra mensaje si el formulario es válido
 */
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página
    alert("✅ Formulario validado correctamente");
});

/**
 * Evento reset
 * Limpia estilos y deshabilita el botón
 */
form.addEventListener("reset", () => {
    btnEnviar.disabled = true;
    document.querySelectorAll(".form-control").forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
        input.nextElementSibling.textContent = "";
    });
});
