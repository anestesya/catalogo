jQuery(function($){
		
	//getters
	function getCampos(){
		var campos = [], tabela = $('form').attr('id');
		
		$('form').find('input[type=text]').each( function(i){
			campos[i] = $(this).val();
		});
		campos[(campos.length) + 1] = $('select option:selected').text();
		
		sql.insert(campos, tabela);
		return campos;
	}
	
    //quando clicar nos botões com id #enviar, vai gerar este evento.
	$('#enviar').live('click', function(e){
		e.preventDefault();
 		getCampos();
	});
	
}); //fim do main
