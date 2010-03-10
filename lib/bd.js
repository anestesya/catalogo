/**
 * @author anestesya
 * Classe que faz a conexão com o banco de dados Sqlite usando a API do Adobe AIR.
 */

function Banco(){
	//variáveis do objeto.
	var cnx = new air.SQLConnection();
	var db = air.File.applicationStorageDirectory.resolvePath('catalogo_bical.db');
	
	this.dbError = function(e){
		alert('Database Error - msg: ' + e.message + ", details: " + e.details + ", operation: " + e.operation);
	}//fim dbError()
	
	this.criaBanco = function(){
		var conn = cnx;
		conn.open(db, air.SQLMode.CREATE);
		
		var cria = new air.SQLStatement();
		cria.sqlConnection = conn;
		
		cria.text = "CREATE TABLE colecao(numCol integer not null primary key autoincrement," +
							"anoCol integer not null check(typeof(anoCol) = 'integer' AND (anoCol > 2000))," +
							"nomeCol text not null,"+
							"mesCol text not null);";
		
		try {
			cria.execute();
			alert('Sucessfull: Database has been created!');
			conn.close();
		} 
		catch (e) {
			this.dbError(e);
		}
	}//fim do criaBanco()
	
	//busca pela ID de uma coleção
	this.buscaColecao = function(valor, stmt, mode){
		var st = stmt;
		if(mode == 0){
			st.text = "SELECT numCol FROM colecao WHERE nomeCol='"+valor+"'";
		}else if( (valor == null) && (mode == 1) ){
			st.text = "SELECT * FROM colecao ORDER BY numCol";
		}
		
		try{
			alert(st.text);
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
		
		colecoes = st.getResult();
		$.each(colecoes.data, function(i){
			colecoes[colecoes.data[i].numCol] = {'colName':colecoes.data[i].nomeCol};
		});	
		alert(colecoes);
		return colecoes;
		
	}
	
	//busca id de uma linha
	this.buscaLinha = function(stmt){
		stmt.text = "SELECT numLin FROM linha;";
		try{
			stmt.execute();
		}catch(e){
			this.dbError(e);
		}
	
		var linID = stmt.getResult(), linhaID;
		$.each(linID.data, function(i){
			linhaID[i] = linID.data[i].numLin;
		});
		
		return linhaID;
	}
	
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
					alert(sql.text);
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'cores':
				try {
					sql.text = "INSERT INTO cores values(null, @numCor, @nomeCor, @nameCor, @nombreCor)";
					sql.parameters['@numCor'] = parseInt(valores[1]);
					sql.parameters['@nomeCor'] = valores[0];
					sql.parameters['@nameCor'] = valores[2];
					sql.parameters['@nombrCor'] = valores[2];
					sql.execute();										
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'detalhes':
				try {
					sql.text = "INSERT INTO detalhes values(null, @nomeDet, @matDet, @numLinDet)";
					sql.parameters['@nomeDet'] = valores[1];
					sql.parameters['@matDet'] = valores[0];
					sql.parameters['@numLinDet'] = parseInt(valores[2]);
					sql.execute();					
				}catch(e) {
					this.dbError(e);
				}
			break;
			
			case 'tamanho':
				try {
					sql.text = "INSERT INTO tamanho values(null, @paisTa, @tamIni, @tamFini, @numLinTa)";
					sql.parameters['@paisTa'] = valores[1];
					sql.parameters['@tamIni'] = parseInt(valores[0]);
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
