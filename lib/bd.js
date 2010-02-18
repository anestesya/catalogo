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
			valores[i] = valores[i].replace(/'/g, "''");
			alert(valores[i]);	
		});
		
		switch(tabela){
			case 'colecao':
				try {
					sql.text = "INSERT INTO colecao values(null, @ano, @nome, @mes)";
					sql.parameters['@ano'] = valores[1];
					sql.parameters['@nome'] = valores[0];
					sql.parameters['@mes'] = valores[2];
					alert(sql.text);
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
