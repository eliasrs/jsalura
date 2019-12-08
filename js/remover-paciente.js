/*remoção de paciente - remove uma TR e suas TDS, partindo de um clique duplo na linha*/

/*Para não ter que colocar o evento em cada elemento (tr), coloca-se na tabela, 
	que ele irá escutar de todos os filhos*/


/*quando o pai foi clicado, pergunta para o elemento pai (table) qual do filhos foi clicado?*/

var tabela = document.querySelector("table"); /*seleciona a tabela*/

tabela.addEventListener("dblclick", function(event){    /*escuta o evento double click e chama função anonima abaixo.*/
	/*antes de remover, adicionar efeito de transição do CSS no pai do elemento esscutado*/
	event.target.parentNode.classList.add("fadeOut"); /*pegar o elemnto alvo do double click (event.target), td,
										depois pega o element pai (parentNode), TR, e add a classe fadeOut para efeito de CSS*/ 
	setTimeout(function(){
		event.target.parentNode.remove();/*remove o pai (tr) do elemento alvo do double click (td)*/
	}, 500);  /*espera tempo de 0,5s para remover*/


	/* outra forma de fazer bem detalhada por partes
	var alvoEvento = event.target;  pegar o elemento alvo
	var paiDoAlvo = alvoEvento.parentNode;  pegar o pai do elemento alvo
	paiDoAlvo.remove();  remover o pai do elemento alvo
	*/
	
});