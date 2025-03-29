// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Capturo elementos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// Genera números aleatorios para cada tarjeta
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);

// Función para cuenta regresiva
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer === 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
    }
  }, 1000);
}

// Función que bloquea tarjetas al finalizar el tiempo
function bloquearTarjetas() {
  for (let i = 0; i < 16; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i]; // Muestra los números
    tarjetaBloqueada.disabled = true; // Bloquea las tarjetas
  }
}

// Función principal para revelar tarjetas
function destapar(id) {
  let tarjetaSeleccionada = document.getElementById(id);

  // Si ya está destapada, no hacer nada
  if (tarjetaSeleccionada.innerHTML !== "") return;

  // Iniciar el temporizador solo en la primera tarjeta
  if (!temporizador) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;

  if (tarjetasDestapadas === 1) {
    // Mostrar primera tarjeta
    tarjeta1 = tarjetaSeleccionada;
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    // Mostrar segunda tarjeta
    tarjeta2 = tarjetaSeleccionada;
    segundoResultado = numeros[id]; 
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;

    // Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    // Verificar si son iguales
    if (primerResultado === segundoResultado) {
      tarjetasDestapadas = 0;
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      // Si gana el juego
      if (aciertos === 8) {
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
        mostrarTiempo.innerHTML = `¡Excelente! Tardaste: ${timerInicial - timer} segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
      }
    } else {
      // Si no son iguales, ocultarlas de nuevo después de 800ms
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}
