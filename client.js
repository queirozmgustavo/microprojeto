const net = require('net');

const socket = net.Socket();

function handleConnection() {
    //console.log("Conectado!");

    // LISTAR CARDÁPIO
    //socket.write("1");

    // ADICIONAR ITEM AO CARDÁPIO
    //socket.write("2 CALABRESA 20.00");

    // EXCLUIR ITEM DO CARDÁPIO
    //socket.write("3 0");

    // ADICIONAR ITEM À SACOLA
    //socket.write("4 1");

    // SOLICITAR ENTREGA
    socket.write("5 AVENIDA DOS HOLANDESES, 1000 CALHAU");

    socket.on('data', function(data) {
        // ADICIONAR OU EXCLUIR ITEM
        //console.log(data.toString());

        /*
        // LISTAR CARDÁPIO
        const cardapio = JSON.parse(data.toString());
        console.log("\n=============== CARDÁPIO ===============\n");
        for (var itemCardapio in cardapio) {
            console.log(itemCardapio+". "+cardapio[itemCardapio][0]+" ............... R$ "+cardapio[itemCardapio][1]+"\n");
        };
        */

        
        // SOLICITAR ENTREGA
        const sacola = JSON.parse(data.toString());
        var total = 0;
        console.log("\n=============== RESUMO ===============\n");
        for (var i = 0, l = sacola.length; i < l-1; i++) {
          console.log("- "+sacola[i][0]+" ............... R$ "+sacola[i][1]+"\n");
          var valor = parseFloat(sacola[i][1]);
          total = total + valor;
        }
        console.log("--------------------------------------\n")
        console.log("ENDEREÇO DE ENTREGA: \n\n"+ sacola[sacola.length-1]+"\n");
        console.log("--------------------------------------\n")
        console.log("TOTAL: R$ "+total+".00\n");
        
       
        socket.end();
    });
};

socket.connect(2000, '127.0.0.1', handleConnection);
