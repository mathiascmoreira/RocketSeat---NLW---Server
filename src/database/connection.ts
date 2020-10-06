 import knex from 'knex';
 import path from 'path';

 const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')  
    },
    useNullAsDefault: true,
 });

 export default connection;

 //Este arquivo serve para configurar a conexão com o banco de dados

 //Ele é utilizado no arquivo de rotas

 //yarn add knex
 //yarn add sqlite3

 //O __dirname retorna o caminho do diretório do arquivo onde foi chamado. 

 //É importante usar o path.resove, pois este método leva em consideração as 
 //particularidades de cada sistema operacional

 //Será criado um arquivo database.sqlite dentro da pasta database. Este arquivo
 //será o banco de dados da aplicação

 //Também será criado o arquivo knexfile.ts na raíz do projeto. Este arquivo conterá
 //algumas configurações que serão passadas nos comandos do knex.

 //Dentro da pasta database, também terá uma pasta migrations, com todas as migrations
 //da aplicação. Ao executar as migrations, através de comandos do knex, será
 //criado um aquivo do tipo sqlite com o banco de dados