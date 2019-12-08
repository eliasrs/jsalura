var titulo = document.querySelector(".titulo"); /**/
titulo.textContent = "Aparecida Nutricionista"; /**/

var pacientes = document.querySelectorAll(".paciente"); /**/
for(var i = 0; i < pacientes.length; i++) {    /**/

	var paciente = pacientes[i];  /**/
		/**/
	var tdPeso = paciente.querySelector(".info-peso");
	var peso = tdPeso.textContent;

	var tdAltura = paciente.querySelector(".info-altura");
	var altura = tdAltura.textContent;

	var tdImc = paciente.querySelector(".info-imc");
		/**/
		
		/**/
	var pesoEhValido = validaPeso(peso);
	var alturaEhValida = validaAltura(altura);
		/**/
	if (!pesoEhValido) {
		console.log("Peso inválido");
		pesoEhValido = false;
		tdImc.textContent = "Peso inválido!";
		paciente.classList.add("paciente-invalido");
	}
		/**/
	if (!alturaEhValida) {
		console.log("Altura inválido");
		alturaEhValida = false;
		tdImc.textContent = "altura inválida";
		paciente.classList.add("paciente-invalido");
	}
		/*se peso e válidos, calcula o imc e cola no td, se não, coloca msg invalido*/
	if (pesoEhValido && alturaEhValida) {
		var imc = calculaImc(peso, altura); /*chama a função do imc, passa altura e peso*/
		tdImc.textContent = imc;  
	} else {
		tdImc.textContent = "Altura ou peso Inválidos";   /**/
	}

}
/*----------------------------------------------------*/
	/* função para calcular IMC*/
function calculaImc(peso, altura) {
	var imc = 0;
	imc = peso / (altura * altura);
	return imc.toFixed(2);  /*retorna com formataçao decimal em 2 casas*/
}

function validaPeso(peso) {
	if(peso>= 0 && peso < 1000) {
		return true;
	} else{
		return false;
	}
}

function validaAltura(altura) {
	if(altura>= 0 && altura < 3) {
		return true;
	} else{
		return false;
	}
}

