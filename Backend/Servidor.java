package Backend;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;

public class Servidor {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(3001), 0);

        // 🔥 INICIAR JOGO
        server.createContext("/iniciar", (HttpExchange exchange) -> {

            InputStream is = exchange.getRequestBody();
            String body = new String(is.readAllBytes());

            // exemplo: "artemis,draven"
            String[] nomes = body.split(",");

            Jogo.iniciar(nomes[0], nomes[1]);

            String response = Jogo.getEstado();

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, response.length());

            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        });

        // 🔥 ATAQUE
        server.createContext("/atacar", (HttpExchange exchange) -> {

            String response = Jogo.atacar();

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, response.length());

            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        });

        server.start();
        System.out.println("🔥 Servidor rodando em http://localhost:3001");
    }
}