/**
 * @author anestesya
 * Classe que faz a conexão com o banco de dados Sqlite usando a API do Adobe AIR.
 * Tem as funções basicas que de conexão com o banco de dados.
 * 
 */


function Banco(){
	//variáveis do objeto.
	var cnx = new air.SQLConnection();
	var db = air.File.applicationStorageDirectory.resolvePath('catalogo_bical.db');
	
	this.dbError = function(e){
		alert('Database Error - msg: ' + e.message + ", details: " + e.details + ", operation: " + e.operation);
	}//fim dbError()
	
	//############################################################################
	//cria banco de dados.
	this.criaBanco = function(){
		var conn = cnx;
		conn.open(db, air.SQLMode.CREATE);
		
		var cria = new air.SQLStatement();
		cria.sqlConnection = conn;
		
		cria.text = "CREATE TABLE sqlite_sequence(name,seq); CREATE TABLE linha(numLin integer not null primary key autoincrement, "+
					"nomeLin text not null, numCol integer not null constraint numCol references colecao(numCol) on delete cascade); "+
					"CREATE TABLE modelo( numMod integer not null primary key check( typeof(numMod) = 'integer' AND numMod > 0), "+ 
					"imggMod blob not null, imgpMod blob not null, corNum integer not null, "+ 
					"numLin integer not null constraint numLin references linha(numLin) on delete cascade); "+
					"CREATE TABLE detalhes(numDet integer not null primary key autoincrement, nomeDet text not null, "+
					"matDet text not null, numLin integer not null); "+
					"CREATE TABLE tamanhos(numTam integer not null primary key autoincrement, paisTam varchar(3) not null, "+
					"tamInicial integer not null, tamFinal integer not null, "+
					"numLin integer not null constraint numLin references linha(numLin) on delete cascade); "+
					"CREATE TABLE cores(IdCor integer not null primary key autoincrement, numCor integer not null, "+
					"nomeCor text not null, nameCor text not null, nombreCor text not null); "+
					"CREATE TABLE colecao(numCol integer not null primary key autoincrement, anoCol integer, "+
					"nomeCol text not null,	mesCol text not null);";					
			
		try {
			cria.execute();
			alert('Sucessfull: Database has been created!');
			conn.close();
		} 
		catch (e) {
			this.dbError(e);
		}
	}//fim do criaBanco()
	
	//###########################################################################################
	//busca pela ID de uma coleção
	this.buscaColecao = function(valor, stmt, mode){
		
		if( (valor == null || valor == 'undefined') && (stmt == null || stmt == 'undefined') && (mode == null || mode == 'undefined') ) {
			var st = new air.SQLStatement();
	        cnx.open(db);
			st.sqlConnection = cnx;
			st.text = "SELECT numCol, nomeCol FROM colecao ORDER BY numCol";
		} else if (mode == 0){
			var st = stmt;
			st.text = "SELECT numCol FROM colecao WHERE nomeCol='"+valor+"'";
		} else if ( (valor == null) && (mode == 1) ){
			var st = stmt;
			st.text = "SELECT nomeCol FROM colecao ORDER BY nomeCol";
		}
		
		try{
			st.execute();
		}catch(e){
			this.dbError("buscaColecao(val, st, mode): "+e);
		}
		
		var colID, colecoes; 
		
		if(mode == 0){
			colID = st.getResult();
			$.each(colID.data, function(i){
				colID = colID.data[i].numCol;
			});
			return colID;	
		}
		
		//gera lista com todas as coleções.
		colecoes = st.getResult();
		return colecoes;	
	}//fim do busca coleções.
	
	
	//########################################################################################	
	//busca id de uma linha
	this.buscaLinha = function(stmt, colecao, mode){
		if( (stmt == null || stmt == 'undefined') && (mode == null || mode == 'undefined') ) {
			var st = new air.SQLStatement();
			stmt = st;
	        cnx.open(db);
			stmt.sqlConnection = cnx;
			col = this.buscaColecao(colecao, stmt, 0);
			stmt.text = "select numLin, nomeLin from linha where colNum="+col+" ORDER BY numLin";
		}else if(mode == 'id'){
			stmt.text = "SELECT numLin FROM linha where nomeLin='"+colecao+"'";
		}else if(mode == 'lista'){
			stmt.text = "select numLin, nomeLin from linha ORDER BY numLin";
		}

		try{
			stmt.execute();
		}catch(e){
			this.dbError(e);
		}
		
		if(mode == 'id'){
			var linID = stmt.getResult(), linhaID;
			$.each(linID.data, function(i){
				linhaID[i] = linID.data[i].numLin;
			});
			return linhaID;
		}else {
			var linhas = stmt.getResult();
			return linhas;
		}		
	}//fim buscaLinha()
	
	
	//###################################################################################
	//monta JSON com os dados usados na apresentação 
	//dos dados na tela.
	this.montaTela = function(linha){
		var colecao = 3, st = new air.SQLStatement();
		
		cnx.open(db);
		st.sqlConnection = cnx;
		idLinha = this.buscaLinha(st, linha, 'id');
		
		var lista_modelos;
			st.text = "select * from modelo where numLin ="+idLinha;
		try{
			st.execute();
			lista_modelos = st.getResult();
			$.each(lista_modelos.data, function(i){
				alert(lista_modelos.data[i]);
			});
		}catch(e){
			this.dbError(e);
		}
	 }//fim  do monta tela.
	
	
	//#################################################################################
	//insere dados no banco.
	this.insert = function(valores, tabela){
		if(!db){
			alert('arquivo do banco não existe');
			criaBanco();	
		}
		cnx.open(db);
		
		var sql = new air.SQLStatement();
		sql.sqlConnection = cnx;
		
		//previne sqlinjection
		$.each(valores, function(i){
			if(typeof valores[i] == 'string'){
				valores[i] = valores[i].replace(/'/g, "''");	
			}else{alert(valores[i]);}	
		});
		
		switch(tabela){
			case 'colecao':
				try {
					sql.text = "INSERT INTO colecao values(null, @ano, @nome, @mes)";
					sql.parameters['@nome'] = valores[0];
					sql.parameters['@ano'] = parseInt(valores[1]);
					sql.parameters['@mes'] = valores[2];
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'linha':		
				try {	
					var idcolecao = parseInt(this.buscaColecao(valores[2], sql, 0));
					sql.text = "INSERT INTO linha values(@numLin, @nomeLin, @numCol)";
					sql.parameters['@numLin'] = parseInt(valores[0]);
					sql.parameters['@nomeLin'] = valores[1];
					sql.parameters['@numCol'] = idcolecao;
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'modelo':
				try {
					sql.text = "INSERT INTO modelo values(@numMod, @imggMod, @imgpMod, @corNumMod, @numLinMod)";
					sql.parameters['@numMod'] = parseInt(valores[0]);
					sql.parameters['@imggMod'] = valores[1];
					sql.parameters['@imgpMod'] = valores[2];
					sql.parameters['@corNumMod'] = parseInt(valores[4]);
					sql.parameters['@numLinMod'] = parseInt(valores[3]);
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'cores':
				try {
					sql.text = "INSERT INTO cores values(null, @numCor, @nomeCor, @nameCor, @nombreCor)";
					sql.parameters['@numCor'] = parseInt(valores[0]);
					sql.parameters['@nomeCor'] = valores[1];
					sql.parameters['@nameCor'] = valores[2];
					sql.parameters['@nombreCor'] = valores[3];
					sql.execute();										
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'detalhes':
				try {
					sql.text = "INSERT INTO detalhes values(@numDet, @nomeDet, @matDet, @numLinDet)";
					sql.parameters['@numDet'] = valores[0]
					sql.parameters['@nomeDet'] = valores[1];
					sql.parameters['@matDet'] = valores[2];
					sql.parameters['@numLinDet'] = parseInt(valores[3]);
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'tamanho':
				try {
					sql.text = "INSERT INTO tamanhos values(null, @paisTa, @tamIni, @tamFini, @numLinTa)";
					sql.parameters['@paisTa'] = valores[0];
					sql.parameters['@tamIni'] = parseInt(valores[1]);
					sql.parameters['@tamFini'] = parseInt(valores[2]);
					sql.parameters['@numLinTa'] = parseInt(valores[3]);
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			default:
				try {
					alert('Vai inserir por default! Campos: ' +valores+ ", na tabela " +tabela);
				}catch(e) {
					this.dbError(e);
				}
		}//fim switch
	}//fim da insert
	
}//fim da classe.