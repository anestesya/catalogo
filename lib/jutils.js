jQuery(function($){
	//gera catalogo
	var init = function(){
		bd = new Banco();
		//bd.montaTela('Papagaio');
		$("select").live('click', function(){
			if($(this).is('#colId')){
				$(this).html(getColecoes());	
			}else if ($(this).is('#listaLinhas')){
				if( $(this).parents().find('#colId')[0] ){
					var idColecao = $('#colId').val();
					$(this).html(getLinhas(idColecao, null));
				} else{
					$(this).html(getLinhas(null, 'lista'));
				}
			}else if( $(this).is('#corNum')){
				$(this).html(listaCores());
			}
			
    	 });
	}//fim do init();
	
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
	
	//gera lista de linhas de determinada coleção.
	var getLinhas = function(col, id){
		var db = new Banco();
		if(col == null){
			var listaLinhas = db.buscaLinha(null, null, id);
		}else if(id == null){
			var listaLinhas = db.buscaLinha(null, col, null);
		}
		
		var linhas = "";
		$.each(listaLinhas.data, function(i){
			linhas +='<option value="'+listaLinhas.data[i].numLin+'">'+listaLinhas.data[i].nomeLin+"</option>";
		});
		return linhas;
	}//fim getLinhas()
	
	//getCores, gera a lista de cores.
	var listaCores = function(){
		var db = new Banco();
		var cores = db.getCores();
		
		listaDeCores = "";
		$.each(cores.data, function(i){
			listaDeCores +='<option value="'+cores.data[i].numCor+'">'+cores.data[i].nomeCor+"</option>";
		});
		
		return listaDeCores;
	};//fim getCores
	
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
