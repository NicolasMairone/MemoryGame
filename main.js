//Iniciliazacion de variables
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

//Capturo elementos HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Genera numeros aleatorios para cada tarjeta
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(function(){return Math.random()-0.5});

//Funcion para cuenta regresiva
function contarTiempo(){
	tiempoRegresivoId = setInterval(()=>{
		timer--;
		mostrarTiempo.innerHTML = 'Tiempo: '+timer+' segundos';
		if(timer == 0){
			clearInterval(tiempoRegresivoId);
			bloquearTarjetas();
		}
	},1000);
}

//Funcion que bloquea tarjetas
function bloquearTarjetas(){
	for(let i=0; i<=15; i++){
		let tarjetaBloqueada = document.getElementById('i');
		tarjetaBloqueada.innerHTML = numeros[i];
		tarjetaBloqueada.disabled = true;
	}
}

//Funcion principal para revelar tarjetas
function destapar(id){
	if(temporizador == false){
		contarTiempo();
		temporizador = true;
	}
	
	tarjetasDestapadas++;
	
	if(tarjetasDestapadas == 1){
		//Mostrar primera tarjeta
		tarjeta1 = document.getElementById(id);
		primerResultado = numeros[id];
		tarjeta1.innerHTML = primerResultado;
		
		//Deshabilitar la primera tarjeta revelada
		tarjeta1.disabled = true;
	}else if(tarjetasDestapadas == 2){
		//Mostrar segunda tarjeta
		tarjeta2 = document.getElementById(id);
		segundoResultado = numeros[id];
		tarjeta2.innerHTML = segundoResultado;
		
		//Deshabilitar segunda tarjeta revelada
		tarjeta2.disabled = true;
		
		//Incrementar movimientos
		movimientos++;
		mostrarMovimientos.innerHTML = 'Movimientos: '+movimientos;
		
		//Cuando son iguales las tarjetas reveladas
		if(primerResultado == segundoResultado){
			tarjetasDestapadas = 0;
			//Incremento en uno los aciertos
			aciertos++;
			mostrarAciertos.innerHTML = 'Aciertos: '+aciertos;
			
			//Cuando completa el juego
			if(aciertos == 8){
				clearInterval(tiempoRegresivoId);
				mostrarAciertos.innerHTML = 'Aciertos: '+aciertos+' 😱';
				mostrarTiempo.innerHTML = 'Excelente! Solo tardaste: '+(timerInicial-timer)+' segundos';
				mostrarMovimientos.innerHTML = 'Movimientos: '+movimientos+' 😎';
			}
		}else{
			//Cuando no son iguales las tarjetas reveladas
			setTimeout(()=>{
				tarjeta1.innerHTML = ' ';
				tarjeta2.innerHTML = ' ';
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetasDestapadas = 0;
			},800);
		}
	}
}
