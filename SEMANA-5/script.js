const imageUrlInput = document.getElementById("imageUrl");
const addImageBtn = document.getElementById("addImageBtn");
const deleteImageBtn = document.getElementById("deleteImageBtn");
const gallery = document.getElementById("gallery");

let selectedImage = null;

// Agregar imagen
addImageBtn.addEventListener("click", () => {
    const url = imageUrlInput.value.trim();

    if (url === "") {
        alert("Por favor ingrese una URL válida.");
        return;
    }

    const img = document.createElement("img");
    img.src = url;

    img.addEventListener("click", () => {
        selectImage(img);
    });

    gallery.appendChild(img);
    imageUrlInput.value = "";
});

// Seleccionar imagen
function selectImage(img) {
    if (selectedImage) {
        selectedImage.classList.remove("selected");
    }
    img.classList.add("selected");
    selectedImage = img;
}

// Eliminar imagen seleccionada
deleteImageBtn.addEventListener("click", () => {
    if (!selectedImage) {
        alert("No hay ninguna imagen seleccionada.");
        return;
    }

    gallery.removeChild(selectedImage);
    selectedImage = null;
});

// Evento input
imageUrlInput.addEventListener("input", () => {
    console.log("URL ingresada:", imageUrlInput.value);
});

// Atajos de teclado
document.addEventListener("keydown", (event) => {
    if (event.key === "Delete") {
        deleteImageBtn.click();
    }

    if (event.key === "Enter") {
        addImageBtn.click();
    }
});
