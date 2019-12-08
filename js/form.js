/* Formulário
	Adicionar uma nova linha na tabela: 
	1) selelcionar o botão, escutar e previnir ação default do botão (html); 
	2) pegar os elementos do formulário que foi preenchido e depois os valores de cada elemento (inputs NAME => value);
	3) criar os elementos TR e TDs que deseja adicionar na nova linhda da tavela;
	4) setar os valores dos inputs nos elementos criados (tds);
	5) vincular os elementos filhos aos pais: TDs no TR, e TR na TABELA;
	6) aplicar a função de cálculo ( do IMC) exites para as outras linhas para a linha criada;
____________________________________________________________________________________________________________*/


/*ações quando se clica no botão add*/

	/* selecionar elemento botão por id*/
var botaoAdicionar = document.querySelector("#adicionar-paciente"); 
	/* escutar a o botão e chamar a função por meio do parâmetro event*/
botaoAdicionar.addEventListener("click", function(event){   
		/*previnir a açao defaut do botão: é enviar */
	event.preventDefault()  

		/*pegar elementos do formulário por id*/
	var form = document.querySelector("#form-adiciona"); 

		/* agora chama função para pegar os valores dos elementos (inputs) do formulário */
	var paciente = obtemPacienteDoFormulario(form);
	
		/*chama função que:  cria a Tr e Tds, usa createElement("..") ; seta nas tds o valor dos inputs do formulário;
		vincula as tds na tr e a tr no form, usando appendChild*/
	var pacienteTr = montaTr(paciente);

		/*armazena na var erro o resultado da função de validação do paciente, 
		essa função retorna string vazia é válido ou uma frase de erro, se inválido*/
	var erros = validaPaciente(paciente);
		/*verifica se há msg de erro atribuida no array ao erro, se vazia é válido, se > 0 então é inválido.
		 daí chama a função que cria o html de erro (spam e ul/li)*/
	
	if (erros.length > 0){
		exibeMensagensDeErro(erros);
		return;
	}

/* Adicionar um paciente na tabela*/
	adicionaPacienteNaTabela(paciente)
	
/*Limpar formulário e mensagens de erro após add*/
	form.reset(); /* limpa (reseta) o formulário após add*/

		/*limpa as mensagens de erro após adiconar com sucesso*/
	var mensagensErro = document.querySelector("#mensagens-erro"); /*pega a <ul> com msg de erro*/
	mensagensErro.innerHTML = ""; /*propriedade  para limpar as msg de erro (armazenadas na <ul>)*/
});



/*-------------------------------- FUNÇÕES ---------------------------------------------------*/

/* Função para  pegar, criando o objeto paciente, os valores dos elementos do formulário (inputs), 
		pegar value usando o name do input */
function obtemPacienteDoFormulario(form) {
	
	var paciente = {        /* cria o objeto paciente, usa {} para passar propriedades do objeto,
							não se usa '='' e ';' */
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}
	return paciente; /*objeto contendo as propriedades: nome, peso ....*/
}

	/*função que:  cria a Tr e Tds,  seta nas tds o valor dos inputs do formulário;
		vincula as tds na tr*/

function montaTr(paciente) {
		/* criar element 'tr' usa a função .createElement()*/
	var pacienteTr = document.createElement("tr"); /*vincula o td a classe original da tabela*/
	pacienteTr.classList.add("paciente"); /*vinvula/atribui a classe Paciente para a Tr criada*/

		/* Uma função dentro da outra pra economizar código:
		1º função interna (montaTd): criar a td; pegar o texto do input do form e seta na td criada; vincula a td respectiva classe da tabela;
		2º função appendChild: colocar os elementos td criados pela montaTd(), filhos, dentro do tr (pai): pacienteTr  */

	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome")); /*o paciente.nome é o input do form retornado do objeto paciente da função obtemPaciente...   o "info-nome" é a classe do Td*/
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

	return pacienteTr;
}

function montaTd(dado, classe) {
	var td = document.createElement("td"); /* cria td usando createElement("..")*/
	td.textContent = dado;   /* pegar os valores do input (armazezados no objeto paciente, trazido pela função obtemPaciente...) 
								e coloca (seta) como conteudo das 'td's criadas*/
	td.classList.add(classe); /*vincula o td a classe original da tabela*/
	return td
}

	/*função de validação do paciente criado no form, aproveita a função
	   de validação existente no arquivo calcula-imc, que valida os dados já existens na tb*/
function validaPaciente(paciente) {  /*parametro paciente obtido pelo form*/
		
	var erros = []; /* como pode haver várias msg de erro, então cria um array de erros que receberá msg de validação*/

		/*validão do conteúdo dos campos peso e altura*/

	if (!validaPeso(paciente.peso)) {  /*se nao valido (false), chama a função de validação do outro arquivo (calcula-imc.js) que retorna true ou false, se true é válido. Usa a propriedade peso do objeto paciente*/
		erros.push("Peso é inválido!"); /*inseri, usando o push, a string no array erros*/
	}

	if (!validaAltura(paciente.altura)) {  
		erros.push("Altura é inválida!");
	}
		/*validão de campos em branco*/

	if( paciente.nome.length == 0){ /*se nome em branco faz:*/
		erros.push("O nome não pode ser em branco!");/*insere, usando push, no array(erros) uma nova strig de erro*/
	}

	if(paciente.peso.length == 0) {
		erros.push("O peso não pode ser em branco!");
	}

	if (paciente.altura.length == 0) {
		erros.push("A altura não pode ser em branco!");
	}

	if(paciente.gordura.length == 0) {
		erros.push("A gordura não pode ser em branco!");
	}

	return erros; /*retorna o array com msg de erro: resultado da função*/
}

		/*Se a validão deu erro, chama função para exibir no html as mensagens de erro da validação.
		   Cria */
function exibeMensagensDeErro(erros){
	var ul = document.querySelector("#mensagens-erro");	/* atribui à var a seleção do elemento <ul id="mensagem-erro">*/
	/*antes de exibir as mensagens de erro, precisa deixar o elemento ul em branco.
		isso é muito importante quando já há mensagem de erro exibida, daí sana o problema, mas se não limpar a mensagem vai continuar exibindo.*/
	ul.innerHTML = "";	/*Apagar o conteúdo das mensagens de erro (<li> da <ul>) já corrigidas, por isso = "" (em branco). 
						Nao faz sentido na primeira validação, mas a partir da segunda tentativa de sumissão: limpas as corridas e, em baixo, chama as novas msg de erros*/
	
		/*vincular as mensagens de erro com o html*/
	erros.forEach(function(erro){   /*para cada item do array erros, faça o que tá na função anonima*/
		var li = document.createElement("li"); /*para cada item cria um elemento li */
		li.textContent = erro; /*a li criada passar a ter como conteúdo o tiem do array em questão (mensagem de erro)*/
		ul.appendChild(li); /*vincula a li a classe ul criada no início da função*/
	});
		
}


function adicionaPacienteNaTabela(paciente){
	var pacienteTr = montaTr(paciente); // pega o TR criado e seus TDs e atribui ao objeto pacienteTr
		/* seleciona a tabela (query) e coloca o Tr (filhos (tds) dentro da tabela (tbody = #tabela-pacientes)*/
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);/*vincula a filha TR no pai Tabela*/
}