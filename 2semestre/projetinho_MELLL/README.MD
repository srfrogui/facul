isso deve ser executado em um celular :)
com termux rodando o ubuntu

ESTA DANDO UM ERRO E NAO tenho ideia como resolve segue o erro:

omar@sapiuter:~/Documents/facul/2semestre/projetinho_MEEELLLLLL$ node botzin_main.js 
Erro ao conectar ao banco de dados: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
    at Handshake.ErrorPacket (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/sequences/Handshake.js:123:18)
    at Protocol._parsePacket (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/Protocol.js:291:23)
    at Parser._parsePacket (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/Parser.js:433:10)
    at Parser.write (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/Parser.js:43:10)
    at Protocol.write (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/Protocol.js:38:16)
    at Socket.<anonymous> (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/Connection.js:88:28)
    at Socket.<anonymous> (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/Connection.js:526:10)
    at Socket.emit (events.js:314:20)
    at addChunk (_stream_readable.js:297:12)
    at readableAddChunk (_stream_readable.js:272:9)
    at Socket.Readable.push (_stream_readable.js:213:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:188:23)
    --------------------
    at Protocol._enqueue (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/Protocol.js:144:48)
    at Protocol.handshake (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/protocol/Protocol.js:51:23)
    at Connection.connect (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/node_modules/mysql/lib/Connection.js:116:18)
    at Object.<anonymous> (/home/omar/Documents/facul/2semestre/projetinho_MEEELLLLLL/botzin_main.js:12:4)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47 {
  code: 'ER_NOT_SUPPORTED_AUTH_MODE',
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
  sqlState: '08004',
  fatal: true
}

