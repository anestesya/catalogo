/*
 * autor: tadeu luis.
 * email: anestesya@gmail.com
 * data: 28/04/09
 */

jQuery(function($){
	$('li a').live('click', function(){ 
		$.load($(this).attr('href'));
	});
	
	$('li a[rel="lightbox"]').lightBox();
	
	$('#buscador').hover(function(){
			if ($(this).offset().left > 80) {
				//setTimeout(volta_busca($(this)), 5000);
			}
			else {
				$(this).animate({left:0}, 300);		
			}		
	});
	
	function volta_busca($el){
			$el.animate({left:'-212px'}, 300);
	};
	
	//BUSCA AS COISAS NA BANCO.
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
	});
	
}); /* fim do main*/