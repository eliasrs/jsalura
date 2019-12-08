var botaoAdicionar = document.querySelector("#buscar-pacientes"); //seleciona elemento botão

botaoAdicionar.addEventListener("click", function(){  //escutando o evento (click) no botão buscar paciente
	//requisição em uma urla para ir buscar os dados no endereço
	var xhr = new XMLHttpRequest(); // XMLHttpRequest = objeto do js para fazer requisição HTTP assíncronas,transporta xml e outros tipos de dados, mas precisar configurar com alguns funções;
	xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); // abre a conexao do tipo get para o endereço heroku.. (servidor)
	
	xhr.addEventListener("load", function(){  // escutar se a resposta já foi carregada
		//antes de tratar a requisição, colocou o if para depois que carregou a requisição vazer verificação de erros
		var erroAjax = document.querySelector("#erro-ajax"); // cria a var e seta o elemento <span> para futuramente receber msg de erro
		if(xhr.status == 200) { //verifica o status da requisição, se o endereço está disponível, ==200 é quando OK.
			erroAjax.classList.add("invisivel"); // como status da requisição esta OK, então add class invisivel para a msg de erro <spam>
			var resposta = xhr.responseText; //texto de resposta da requisição
			var pacientes = JSON.parse(resposta);// transformar o JSON em objeto java scritp, nesse caso em um objeto array
			
			pacientes.forEach(function(paciente){   // para cada paciente, add na tabela, aproveita a função do formulário add
				adicionaPacienteNaTabela(paciente);
			});
		} else {
			console.log(xhr.status); //mostra o número do status, nesse caso de erro
			console.log(xhr.responseText);// resposta do erro
			
			erroAjax.classList.remove("invisivel");
		}
	});
	xhr.send();// função para envivar requisição da conexao que foi criada	
});



/*
------ Tratando a resposta da requisição------------------
técnica de fazer requisções assincrona usando JS, ou seja, sem travar o navegador


JSON (java script objeto notetion) = transpostar objetos js pela WEB em 

var resposta = xhr.responseText;
console.log(typeof resposta); // texto STRING em JSON

var pacientes = JSON.parse(resposta);
console.log(typeof pacientes) // objeto array de js

*/