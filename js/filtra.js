/* Arquivo para criação da funcionalidade de friltragem de nomes na tabela de pacientes
	- Filtrar conforme o usuário vai digitando o nome, ou seja, dinâmico

----- no final, tem um exemplo comentado de como criar um contador de campo text aréa pra limite de caracteres
*/

// 1° Cria no Html o imput acima da tabela

// 2° Pega os elementos da tabela
var campoFiltro = document.querySelector("#filtrar-tabela");

//3° Escutar cada caracter digitado no campo filtro 
campoFiltro.addEventListener("input", function(){   //Evento de INPUT de dados, escuta a cada caracter digitado
	//console.log(this.value);

	//4° Conforme digita, compara o nome com todos pacientes da tabela e mostra somente os iguais
	var pacientes = document.querySelectorAll(".paciente");// pega todos os pacientes (tr com suas Tds)
	
	//5° Verifica se tem algo digitado, se tem, então implementa lógica de ocultar o que for diferente do digitado
	if( this.value.length > 0){  // verifica se tem algo digitado no input, se tem, então tem quer ficar invisel enquanto o nome for diferente do que estiver digitado
		for( var i = 0; i < pacientes.length ; i++){  // percorrer todo o array de paciente
		//6° pega o nome de cada paciente	
			var paciente = pacientes[i]; // paciente no indice i
			var tdNome = paciente.querySelector(".info-nome"); //pega a td nome do paciente no indíce i
			var nome = tdNome.textContent;
			// função e expressão regular, vai buscar o texto que digita que é o .this
			var expressao = new RegExp(this.value,"i"); // 1º parametro é o valor digitado (campoFiltro), 
														//o 2° = "i" refere a INsensitive , case insensitive, não diferencia mais e minusculo.

		// 7° Agora que já tem o conteudo do input e do paciente, so esconder os nomes (tr) que não for igual ao digitado(input)
			//Se for diferente cria uma classe pra esconder
			if( !expressao.test(nome)){ // se a expressão (escutada/digitada) for DIFERENTE do nome, usa a função .teste que testa o que colocar como parametro, = nome
				paciente.classList.add("invisivel"); //quando começa digitar tudo fica com a classe invisivel
			} else{
				paciente.classList.remove("invisivel"); // quando o digitado fica igual a um nome da tab, então exclui o invisivel
			}
		}
	}else{    // se não tem algo digitado então nada fica invisivel 
		for( var i = 0; i < pacientes.length; i++) {  // percorrer todo o array de paciente
			var paciente = pacientes[i]; // paciente no indice i
			paciente.classList.remove("invisivel");
		}
	}
})


/* Verificando o tamanho da postagem: conta a qtd de caractesres digitado. 
	Exemplo o campo só pode ter 500 caracteres
	
		-------html ----
			<body>
			    <textarea id="corpo-postagem" cols="40" rows="5"></textarea>
			    <p>Caracteres: <span id="numero-caracteres">0</span> caracteres.</p>
			    <script src="contador.js"></script>
			</body>
		----------------

		--------JS-----
			// contador.js
			var campoPostagem = document.querySelector("#corpo-postagem");
			campoPostagem.addEventListener("input", atualizaCaracteres);



			function atualizaCaracteres() {
			    var postagem = document.querySelector("#corpo-postagem").value;
			    var caracteres = postagem.value.length;

			    var contador = document.querySelector("#numero-caracteres");
			    contador.innerHTML = caracteres;
			}

*/