jQuery(function($){
	//gera catalogo
	var init = function(){
		bd = new Banco();
		//bd.montaTela('Papagaio');
		$("select").live('click', function(){
			
			$(this).html(getColecoes());
    	 });
		
	}
	
	// gera lista de coleções cadastradas.
	var getColecoes = function(){
		var db = new Banco();
		var listaColecoes = db.buscaColecao();
		
		var lista_colecoes = "";
		$.each(listaColecoes.data, function(i){
			lista_colecoes += '<option value="'+listaColecoes.data[i].numCol+'">'+listaColecoes.data[i].nomeCol+"</option>"; 
		});
		 
	    return lista_colecoes;
	}//fim getColecoes();
	
	//chama formulários.
	$('#nav li a').click(function(e){
		e.preventDefault();
		if( $(this).attr('class') == 'sair') {
			document.location = "index.html";
		}
		$('#mostruario').empty().load($(this).attr('href'));//fim do load.
		return false;
	});

	//inicializa o catalogo principal.
	init();

});//end jquery
