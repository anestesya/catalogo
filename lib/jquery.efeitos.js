/*
 * autor: tadeu luis.
 * email: anestesya@gmail.com
 * data: 28/04/09
 */
jQuery(function($){
	
	//#######################
	// login
	if ($('#login')[0]) {
		$.facebox({
			div : '#login',
			loading_image: '../images/lightbox-ico-loading.gif',
			close_image: '../images/lightbox-btn-close.gif' 
	    });
	}
	
	$('.login_btn').click(function() {
		if ($('.username:eq(1)').val() == 'vendas' && $('.password:eq(1)').val() == '123456' ) {
			$(document).trigger('close.facebox');			
		} else if($('.username:eq(1)').val() == 'admin' && $('.password:eq(1)').val() == 'admin'){
			$(document).trigger('close.facebox');
			document.location = "bical.html";
		} else {
			alert('Dados de acesso não conferem');
		}
	});
	
	
	//#######################
	// chama tela de login com o teclado.
	$(document).keypress(function(e) {
 		 if (e.keyCode == '123') {
		 	$('body').load('login.html');
         }
    });

	
	//#######################
	// carrega as páginas referentes a cada linha da coleção.
	$('li a').live('click', function(e){
		$.load($(this).attr('href'));
	});
	

	//#####################
	// adiciona lightbox.
	//if($('#bical')[0]){
	//	$('li a[rel="lightbox"]').lightBox();
	//}
	
	
	//#####################
	//anima elemento de busca.
	$('#buscador').hover(function(){
			if ($(this).offset().left > 80) {
				//setTimeout(volta_busca($(this)), 5000);
			}
			else {
				$(this).animate({left:0}, 300);		
			}		
	});
	
	//#####################
	// faz o elemento de buscar esconder-se.
	function volta_busca($el){
			$el.animate({left:'-212px'}, 300);
	};
	
	
	//#####################
	// BUSCA AS COISAS NA BANCO.
	$('#buscador #pesquisa ul li').click(function(){
		var codigo = $(this).find('.codigo_calcado').text();
		var linha = $(this).find('.nome_linha').text();
		
		$('#imagens li span.numero_modelo').each(function(i){
			var busca = $(this).text();
				if(busca == codigo){
					$(this).parent().css('border', '1px solid black');
				}
		 });
		
		return false;
	}); //fim do busca coisas.
	
}); /* fim do main*/