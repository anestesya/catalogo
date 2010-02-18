jQuery(function($){
	//chama formulários.
	$('#nav li a').click(function(e){
		e.preventDefault();
		$('#mostruario').empty().load($(this).attr('href'));//fim do load.
		return false;
	});
});//end jquery
