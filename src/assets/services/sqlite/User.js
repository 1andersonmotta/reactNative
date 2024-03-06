import db from "./SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    // tx.executeSql("DROP TABLE users;");
    //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, service TEXT, phone TEXT);"
    );
});

function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
    // Função para padronizar a formatação dos campos
    const formattedObj = {
        name: capitalizeFirstLetter(obj.name),
        password: obj.password.toLowerCase(), // Convertendo para minúsculas
        service: obj.service.toUpperCase(), // Convertendo para maiúsculas
        phone: obj.phone // Mantendo o telefone sem formatação
    };

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "INSERT INTO users (name, password, service, phone) values (?, ?, ?, ?);",
                [formattedObj.name, formattedObj.password, formattedObj.service, formattedObj.phone],
                //-----------------------
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = (id, obj) => {
    const formattedObj = {
        name: capitalizeFirstLetter(obj.name),
        password: obj.password.toLowerCase(), // Convertendo para minúsculas
        service: obj.service.toUpperCase(), // Convertendo para maiúsculas
        phone: obj.phone // Mantendo o telefone sem formatação
    };

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "UPDATE users SET name=?, password=?, service=?, phone=? WHERE id=?;",
                [formattedObj.name, formattedObj.password, formattedObj.service, formattedObj.phone, id],
                //-----------------------
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) resolve(rowsAffected);
                    else reject("Error updating obj: id=" + id); // nenhum registro alterado
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM users WHERE id=?;",
                [id],
                //-----------------------
                (_, { rows }) => {
                    if (rows.length > 0) resolve(rows._array[0]);
                    else reject("Obj not found: id=" + id); // nenhum registro encontrado
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * BUSCA UM REGISTRO POR MEIO DA MARCA (name)
 * - Recebe a marca do carro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByname = (name) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM users WHERE name LIKE ?;",
                [name],
                //-----------------------
                (_, { rows }) => {
                    if (rows.length > 0) resolve(rows._array);
                    else reject("Obj not found: name=" + name); // nenhum registro encontrado
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM users;",
                [],
                //-----------------------
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "DELETE FROM users WHERE id=?;",
                [id],
                //-----------------------
                (_, { rowsAffected }) => {
                    resolve(rowsAffected);
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

export default {
    create,
    update,
    find,
    findByname,
    all,
    remove,
};
