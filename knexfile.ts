import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')  
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
}

//Arquivo de configuração que será passado como parâmetro para os comandos do knex.
//Para rodar as migrations, por exemplo, usaremos o comando: yarn knex --knexfile knexfile.ts migrate:latest 
//o comando acima pode ser colocado nos scripts do package.json
//Ao rodar as migrations pela primeira vez, o arquivo com o banco de dados será criado. 