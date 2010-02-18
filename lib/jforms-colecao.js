jQuery(function($){
		
	//getters
	function getCampos(){
		var campos = [], tabela = $('form').attr('id'), sql;
		
		$('form').find('input[type=text]').each( function(i){
			campos[i] = $(this).val();
		});
		
		if($('select :selected').text()){
			campos[(campos.length) + 1] = $('select option:selected').text();	
		}
		
		sql = new Banco();
		sql.insert(campos, tabela);
	}
	
    //quando clicar nos botões com id #enviar, vai gerar este evento.
	$('#enviar').live('click', function(e){
		e.preventDefault();
 		getCampos();
	});
	
}); //fim do main
