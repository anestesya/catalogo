jQuery(function($){
		
	//getters
	function getCampos(){
		var campos = [], tabela = $('form').attr('id'), sql;
		
		$('form').find('input[type=text], input[type=file]').each( function(i){
			campos[i] = $(this).val();
		});
		
		if($('select :selected').text()){
			$('select option:selected').each(function(){
				campos[campos.length] = $(this).text();
			});
		}
	
		sql = new Banco();
		sql.insert(campos, tabela);
		$('form')[0].reset();
	}
	
    //quando clicar nos botões com id #enviar, vai gerar este evento.
	$('#enviar').live('click', function(e){
		e.preventDefault();
 		getCampos();
	});
	
}); //fim do main
