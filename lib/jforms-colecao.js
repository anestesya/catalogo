jQuery(function($){
		
	//getters
	function getCampos(){
		var campos = [], tabela = $('form').attr('id'), sql;
		
		$('form').find('input[type=text]').each( function(i){
			campos[i] = $(this).val();
		});
		
		if($('select :selected').text()){
			campos[campos.length] = $('select option:selected').text();	
		}
		
		sql = new Banco();
		//alert('Campos:'+campos+ ":tabela: "+tabela);
		sql.insert(campos, tabela);
		alert('Dados cadastrados.');
		$('form')[0].reset();
	}
	
    //quando clicar nos botões com id #enviar, vai gerar este evento.
	$('#enviar').live('click', function(e){
		e.preventDefault();
 		getCampos();
	});
	
}); //fim do main
