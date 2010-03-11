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

		/*
		"CREATE TABLE linha(numLin integer not null primary key autoincrement," +
		"nomeLin text not null," +
		"numCol integer not null constraint numCol references colecao(numCol) on delete cascade);" +
		"CREATE TABLE modelo(numMod integer not null primary key check( typeof(numMod) = 'integer' AND numMod > 0)," +
		"imggMod blob not null," +
		"imgpMod blob not null," +
		"corNum integer not null," +
		"numLin integer not null constraint numLin references linha(numLin) on delete cascade);" +
		"CREATE TABLE detalhes(numDet integer not null primary key autoincrement,"+
		"nomeDet text not null," +
		"matDet text not null," +
		"numLin integer not null);" +
		"CREATE TABLE tamanho(numTam integer not null primary key autoincrement,"+
		"paisTam varchar(3) not null," +
		"tamInicial integer not null," +
		"tamFinal integer not null," +
		"numLin integer not null constraint numLin references linha(numLin) on delete cascade);" +
		"CREATE TABLE cores(idCor integer not null primary key autoincrement," +
		"numCor integer not null," +
		"nomeCor text not null," +
		"nameCor text not null," +
		"nombreCor text not null);" +
		"COMMIT;";*/

	//inicializa o catalogo principal.
	init();

});//end jquery
