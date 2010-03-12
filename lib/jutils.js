jQuery(function($){
	//gera catalogo
	var init = function(){
		bd = new Banco();
		//bd.montaTela('Papagaio');
	}
	
	//chama formulários.
	$('#nav li a').click(function(e){
		e.preventDefault();
		$('#mostruario').empty().load($(this).attr('href'));//fim do load.
		return false;
	});

	//inicializa o catalogo principal.
	init();

});//end jquery
