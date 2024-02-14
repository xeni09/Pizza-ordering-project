function toggleSelected(button) {
  // Check if the button is for masa or tamaño
  if (button.id.includes('Masa')) {
    let masaButtons = document.querySelectorAll('.masa-button');
    masaButtons.forEach(function(btn) {
      btn.classList.remove('selected');
    });
    
    // Add 'selected' class to the clicked masa button
    button.classList.add('selected');
    
    // Update the selected ingredient in the section2 with the correct class
    updateSelectedIngredients(button.textContent.trim(), 'selected-masa');
  } else if (button.id.includes('tamaño')) {
    // Remove 'selected' class from all buttons in the tamaño section
    let tamañoButtons = document.querySelectorAll('.tamaño-button');
    tamañoButtons.forEach(function(btn) {
      btn.classList.remove('selected');
    });
    
    // Add 'selected' class to the clicked tamaño button
    button.classList.add('selected');
    
    // Update the selected ingredient in the section2 with the correct class
    updateSelectedIngredients(button.textContent.trim(), 'selected-tamaño');
  }
}

function updateSelectedIngredients(ingredientName, className) {
  // Remove previously selected ingredient with the specified class from the section
  let selectedIngredient = document.querySelector(`.${className}`);
  if (selectedIngredient) {
    selectedIngredient.remove();
  }

  // Create a new container div for the selected ingredient
  let selectedContainer = document.createElement('div');
  selectedContainer.classList.add('selected-ingredient'); // Adding the selected-ingredient class
  selectedContainer.classList.add(className); // Adding the specified class

  // Create a button for removing the ingredient
  let removeButton = document.createElement('button');
  removeButton.textContent = 'X';
  removeButton.classList.add('remove-ingredient');
  removeButton.onclick = function() {
    selectedContainer.remove();

    // Get the corresponding button in section1
    let correspondingButton;
    if (className === 'selected-masa') {
      correspondingButton = document.querySelector('.masa-button.selected');
    } else if (className === 'selected-tamaño') {
      correspondingButton = document.querySelector('.tamaño-button.selected');
    }

    // Remove the 'selected' class from the corresponding button in section1
    if (correspondingButton) {
      correspondingButton.classList.remove('selected');
    }
  };

  // Create a span for the ingredient name
  let ingredientSpan = document.createElement('span');
  ingredientSpan.textContent = ingredientName;

  // Append the remove button and ingredient name to the container
  selectedContainer.appendChild(removeButton);
  selectedContainer.appendChild(ingredientSpan);

  // Append the selected ingredient container to the corresponding container based on the class name
  let containerId = className === 'selected-masa' ? 'selectedMasa' : 'selectedTamaño';
  document.getElementById(containerId).appendChild(selectedContainer);
}

// Function to check if both Masa and Tamaño have been selected
function checkSelection() {
  const selectedMasa = document.querySelector('.selected-masa');
  const selectedTamaño = document.querySelector('.selected-tamaño');

  return selectedMasa && selectedTamaño;
}

function removeErrorMessages() {
  let existingMasaErrorMessage = document.querySelector('.error-message-masa');
  if (existingMasaErrorMessage) {
    existingMasaErrorMessage.remove();
  }
  let existingTamañoErrorMessage = document.querySelector('.error-message-tamaño');
  if (existingTamañoErrorMessage) {
    existingTamañoErrorMessage.remove();
  }
}


// Function to append error messages under the corresponding section
function appendErrorMessage(errorMessage, sectionId) {
  let section = document.getElementById(sectionId);
  if (section) {
    let errorContainer = section.querySelector('.error-container');
    if (!errorContainer) {
      // Create a container for error messages if it doesn't exist
      errorContainer = document.createElement('div');
      errorContainer.classList.add('error-container');
      section.appendChild(errorContainer);
    }
    // Append the error message to the container
    errorContainer.appendChild(errorMessage);
  }
}

// Add an event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the masa buttons and add event listener
  const masaButtons = document.querySelectorAll('.masa-button');
  masaButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      toggleSelected(button);
      removeErrorMessages();
    });
  });

  // Get the tamaño buttons and add event listener
  const tamañoButtons = document.querySelectorAll('.tamaño-button');
  tamañoButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      toggleSelected(button);
      removeErrorMessages();
    });
  });

  // Get the order button and add event listener
  const orderButton = document.getElementById('orderPizza');
orderButton.addEventListener("click", function() {
  // Check if both Masa and Tamaño have been selected
  const masaSelected = document.querySelector('.selected-masa');
  const tamañoSelected = document.querySelector('.selected-tamaño');

  // Remove any existing error messages
  removeErrorMessages();

  if (!masaSelected && !tamañoSelected) {
    // If neither Masa nor Tamaño is selected, show separate red messages
    let masaErrorMessage = document.createElement('div');
    masaErrorMessage.textContent = 'Por favor, selecciona una masa.';
    masaErrorMessage.classList.add('error-message-masa', 'error-message', 'jump');

    let tamañoErrorMessage = document.createElement('div');
    tamañoErrorMessage.textContent = 'Por favor, selecciona un tamaño.';
    tamañoErrorMessage.classList.add('error-message-tamaño', 'error-message', 'jump');

    // Append the error messages under the respective buttons in section 1
    document.querySelector('.masa').appendChild(masaErrorMessage);
    document.querySelector('.tamaño').appendChild(tamañoErrorMessage);
  } else if (!masaSelected) {
    // If Masa is not selected, show a red message under the Masa buttons in section 1
    let masaErrorMessage = document.createElement('div');
    masaErrorMessage.textContent = 'Por favor, selecciona una masa.';
    masaErrorMessage.classList.add('error-message-masa', 'error-message', 'jump');
    document.querySelector('.section1').appendChild(masaErrorMessage);
  } else if (!tamañoSelected) {
    // If Tamaño is not selected, show a red message under the Tamaño buttons in section 1
    let tamañoErrorMessage = document.createElement('div');
    tamañoErrorMessage.textContent = 'Por favor, selecciona un tamaño.';
    tamañoErrorMessage.classList.add('error-message-tamaño', 'error-message', 'jump');
    document.querySelector('.section1').appendChild(tamañoErrorMessage);
  } else {
    // Perform actions for placing the order (e.g., submit form)
    alert('Pedido de pizza realizado con éxito!');
  }
});
});




















/* 

function obtenerTopping(categoria) {
  const checkboxes = document.querySelectorAll(
    `input[name=${categoria}]:checked`
  );
  const toppings = Array.from(checkboxes).map((checkbox) => checkbox.value);
  return toppings; // Devolver un array de valores seleccionados
}

function limpiarCheckboxes(categoria) {
  const checkboxes = document.querySelectorAll(
    `input[name=${categoria}]:checked`
  );
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
}

function dibujarTopping(ctx, topping) {
  if (topping) {
    const imgTopping = new Image();
    imgTopping.onload = function () {
      ctx.drawImage(imgTopping, 0, 0);
    };
    imgTopping.src = `img/${topping}.jpg`;
  }
}

function validarCampoObligatorio(input) {
  if (input.value === "") {
    input.classList.add("is-invalid");
    input.classList.add("form-control"); // Agregar clase de Bootstrap
  } else {
    input.classList.remove("is-invalid");
    input.classList.remove("form-control"); // Eliminar clase de Bootstrap
  }
}

function validarCheckboxes(container) {
  const totalSeleccionados = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  // Validar que aparezca el mensaje solo cuando no hay checkboxes seleccionados
  if (totalSeleccionados === 0) {
    mostrarMensajeError(container);
  } else {
    // Si hay al menos un checkbox seleccionado, ocultar el mensaje
    ocultarMensajeError(container);
  }
}

// Función para mostrar el mensaje de error
function mostrarMensajeError(container) {
  limpiarMensajesValidacion();

  const mensaje = document.createElement("p");
  mensaje.classList.add("red");
  mensaje.textContent =
    "Seleccione al menos 1 opción entre las categorías de ingredientes:";
  container.appendChild(mensaje);
}

// Función para ocultar el mensaje de error
function ocultarMensajeError(container) {
  limpiarMensajesValidacion();
}

function limpiarMensajesValidacion() {
  // Limpiar mensajes de validación de checkboxes
  const invalidMessages = document.querySelectorAll(".red");
  invalidMessages.forEach((message) => message.parentNode.removeChild(message));
}

// Funcion que calcula el precio total
function calcularPrecioTotal() {
  let total = 0;

  // Add prices for different products

  total += sumarPreciosCheckbox("carnes");
  total += sumarPreciosCheckbox("mariscos");
  total += sumarPreciosCheckbox("verduras");
  total += obtenerPrecioMasa("masa");
  total += obtenerPrecioTamaño("tamaño");

  return total;
}

// Function to sum prices of selected checkboxes for a category
function sumarPreciosCheckbox(categoria) {
  const checkboxes = document.querySelectorAll(
    `input[name=${categoria}]:checked`
  );
  let totalCategoria = 0;

  checkboxes.forEach((checkbox) => {
    const precio = parseFloat(checkbox.getAttribute("data-price"));
    totalCategoria += precio;
  });

  return totalCategoria;
}

function obtenerPrecioMasa() {
  const select = document.getElementById("masa");
  const selectedOption = select.options[select.selectedIndex];
  const precioMasa = parseFloat(selectedOption.getAttribute("data-price")) || 0;
  return precioMasa;
}

function obtenerPrecioTamaño() {
  const select = document.getElementById("tamaño");
  const selectedOption = select.options[select.selectedIndex];
  const precioTamaño =
    parseFloat(selectedOption.getAttribute("data-price")) || 0;
  return precioTamaño;
}

// Function to update the total price in the HTML
function actualizarPrecioTotal() {
  const total = calcularPrecioTotal();
  const formattedTotal = total + "€"; // Add plus sign
  document.getElementById("totalValue").textContent = formattedTotal;
}

// Add an event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the resultadoPizza element
  const resultadoPizza = document.getElementById("resultadoPizza");
  // Get the section2 element
  const section2 = document.querySelector(".section2");

  // Check if resultadoPizza has content
  if (resultadoPizza.innerHTML.trim() !== "") {
    // If there is content, show section2
    section2.style.display = "block";
  } else {
    // If there is no content, hide section2
    section2.style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const crearButton = document.querySelector("#crearPizza");

  crearButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Obtener los inputs del formulario
    const masaInput = document.getElementById("masa");
    const tamañoInput = document.getElementById("tamaño");

    // Obtener las imágenes de los toppings según las elecciones del usuario
    const toppingCarne = obtenerTopping("carnes");
    const toppingMar = obtenerTopping("mariscos");
    const toppingVerdura = obtenerTopping("verduras");

    const nombrePizzaInput = document.getElementById("nombre-pizza");
    const horaRecogerInput = document.getElementById("hora-recoger");

    // En tu script JavaScript
    const container = document.getElementById("messages-container");

    //Obtener los valores del formualrio
    const masa = masaInput.value;
    const tamaño = tamañoInput.value;
    const nombrePizza = nombrePizzaInput.value;
    const horaRecoger = horaRecogerInput.value;

    // Limpiar mensajes de validación anteriores
    limpiarMensajesValidacion();

    // Validar que los campos obligatorios no estén vacíos
    validarCampoObligatorio(masaInput);
    validarCampoObligatorio(tamañoInput);
    validarCampoObligatorio(nombrePizzaInput);
    validarCampoObligatorio(horaRecogerInput);
    // Agregar escuchadores de eventos "input" para validar los campos obligatorios
    masaInput.addEventListener("change", () =>
      validarCampoObligatorio(masaInput)
    );
    tamañoInput.addEventListener("change", () =>
      validarCampoObligatorio(tamañoInput)
    );

    nombrePizzaInput.addEventListener("input", () =>
      validarCampoObligatorio(nombrePizzaInput)
    );
    horaRecogerInput.addEventListener("input", () =>
      validarCampoObligatorio(horaRecogerInput)
    );

    if (container) {
      container.innerHTML = ""; // Limpiar mensajes anteriores
    }

    validarCheckboxes(container);

    // Agregar escuchador de eventos "change" a todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        // Validar los checkboxes cada vez que cambian
        validarCheckboxes(container);
      });
    });

    // Si hay mensajes de validación o algún campo obligatorio está vacío, detener el proceso
    if (
      container.querySelector(".red") ||
      document.querySelector(".is-invalid")
    ) {
      return;
    }

    // Mostrar los textos y las imágenes
    const tweetContainer = document.querySelector(".tweet-container");
    tweetContainer.innerHTML = `
      <div class="title">
        <div class="info">
          <p><strong>Tu nombre:</strong> ${nombrePizza}</p>
          <p><strong>Hora de recoger:</strong> ${horaRecoger}</p>
          <p><strong>Tipo de Masa:</strong> ${masa}</p>
          <p><strong>Tamaño:</strong> ${tamaño}</p>    
          ${
            toppingCarne.length > 0
              ? `<p><strong>Toppings de Carne:</strong> ${toppingCarne.join(
                  ", "
                )}</p>`
              : ""
          }
        ${
          toppingMar.length > 0
            ? `<p><strong>Toppings de Mar:</strong> ${toppingMar.join(
                ", "
              )}</p>`
            : ""
        }
        ${
          toppingVerdura.length > 0
            ? `<p><strong>Toppings de Verdura:</strong> ${toppingVerdura.join(
                ", "
              )}</p>`
            : ""
        } 
     </div></div>
    `;

    // Mostrar las imágenes solo si las rutas son válidas
    const pizzaImageContainer = document.querySelector("#resultadoPizza");
    pizzaImageContainer.innerHTML = ""; // Limpiar cualquier contenido previo

    // Función para agregar una imagen al contenedor si la ruta es válida
    const agregarImagen = (ruta) => {
      const img = new Image();
      img.src = ruta;
      pizzaImageContainer.appendChild(img);
    };

    // Agregar la imagen base
    agregarImagen(`./assets/img/imagenBase.jpg`);

    // Agregar las imágenes de los toppings solo si las rutas son válidas
    toppingCarne.forEach((topping) =>
      agregarImagen(`./assets/img/${topping}.jpg`)
    );
    toppingMar.forEach((topping) =>
      agregarImagen(`./assets/img/${topping}.jpg`)
    );
    toppingVerdura.forEach((topping) =>
      agregarImagen(`./assets/img/${topping}.jpg`)
    );

    // Limpiar los inputs
    document.getElementById("masa").value = "";
    document.getElementById("tamaño").value = "";
    document.getElementById("nombre-pizza").value = "";
    document.getElementById("hora-recoger").value = "";

    // Limpiar los checkboxes de carne, mariscos y verduras
    limpiarCheckboxes("carnes");
    limpiarCheckboxes("mariscos");
    limpiarCheckboxes("verduras");

    // Scroll to section2

    // Get the resultadoPizza element
    const resultadoPizza = document.getElementById("resultadoPizza");
    // Get the section2 element
    const section2 = document.querySelector(".section2");

    // Check if resultadoPizza has content
    if (resultadoPizza.innerHTML.trim() !== "") {
      // If there is content, show section2
      section2.style.display = "block";
    } else {
      // If there is no content, hide section2
      section2.style.display = "none";
    }

    // Scroll to section2
    section2.scrollIntoView({ behavior: "smooth" });
  });
});

// Añadir precios a los productos.

function createPriceSpan(price) {
  const priceSpan = document.createElement("span");
  priceSpan.textContent = ` - ${price}€`;
  return priceSpan;
}

function addPriceSpansToCheckboxes(checkboxes) {
  checkboxes.forEach(function (checkbox) {
    const price = checkbox.getAttribute("data-price");
    const label = checkbox.parentNode;
    label.appendChild(createPriceSpan(price));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const ingredientCategories = ["carnes", "mariscos", "verduras"];
  ingredientCategories.forEach(function (categoria) {
    const checkboxes = document.querySelectorAll(`input[name=${categoria}]`);
    addPriceSpansToCheckboxes(checkboxes);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Define an array of select element ids
  let selectIds = ["masa", "tamaño"];

  // Loop through each select element
  selectIds.forEach(function (selectId) {
    let select = document.getElementById(selectId);
    select.addEventListener("change", actualizarPrecioTotal);

    // Retrieve the options of the current select element
    let options = select.options;

    // Loop through each option of the current select element
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let price = option.getAttribute("data-price");

      // If the option has a price attribute
      if (price) {
        // Create a span element for the price
        let priceSpan = document.createElement("span");
        priceSpan.className = "price"; // Add a class to style it
        priceSpan.textContent = "    +" + price + "€";

        // Insert the span after the option text
        option.appendChild(priceSpan);
      }
    }
  });

  // Añadir precios a los productos
  document.addEventListener("DOMContentLoaded", function () {
    const ingredientCategories = ["carnes", "mariscos", "verduras"];

    ingredientCategories.forEach(function (categoria) {
      const checkboxes = document.querySelectorAll(`input[name=${categoria}]`);

      checkboxes.forEach(function (checkbox) {
        const price = checkbox.getAttribute("data-price");
        const label = checkbox.parentNode;
        const priceSpan = document.createElement("span");
        priceSpan.textContent = ` - ${price}€`;
        label.appendChild(priceSpan);
      });
    });
  });

  // Event listener for checkboxes to update total price when checked/unchecked
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", actualizarPrecioTotal);
    });
});
 */