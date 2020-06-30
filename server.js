const net = require('net');

var cardapio = [];
var sacola = [];

function handleRequests(socket) {
    //console.log("Conexão realizada!\n");
    socket.on('end', function() {
        //console.log("Conexão finalizada!\n");
    });

    socket.on('data', function(data) {
        var instrucao = data.toString().split(" ");

        switch(instrucao[0]) {
            case "1":
                socket.write(JSON.stringify(cardapio));
                break;
            case "2":
                cardapio.push([instrucao[1], instrucao[2]]);
                console.log("\nITEM CADASTRADO COM SUCESSO!\n");
                socket.write("\nITEM CADASTRADO COM SUCESSO!\n");
                console.log(cardapio);
                break;
            case "3":
                cardapio.splice(instrucao[1], 1);
                console.log("\nITEM EXCLUÍDO COM SUCESSO!\n");
                socket.write("\nITEM EXCLUÍDO COM SUCESSO!\n");
                console.log(cardapio);
                break;
            case "4":
                sacola.push(cardapio[instrucao[1]]);
                socket.write("\nITEM ADICIONADO À SACOLA!\n");
                console.log(sacola);
                break;
            case "5":
                var endereco = instrucao.join(" ");
                sacola.push(endereco.slice(1).trim());
                socket.write(JSON.stringify(sacola));
                console.log(sacola);
                break;
            default:
                socket.write("\nOPÇÃO INVÁLIDA!\n");
        };
    });
};

const server = net.createServer(handleRequests);
server.listen(2000, '127.0.0.1');
