package Backend;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class Servidor {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(3001), 0);

        server.createContext("/iniciar", Servidor::handleIniciar);
        server.createContext("/atacar",  Servidor::handleAtacar);

        server.start();
        System.out.println("Servidor rodando em http://localhost:3001");
    }

    // ---------------------------------------------------------------
    // POST /iniciar  —  body: "arkanis,draven"
    // ---------------------------------------------------------------
    private static void handleIniciar(HttpExchange ex) throws IOException {
        addCors(ex);
        if ("OPTIONS".equals(ex.getRequestMethod())) {
            ex.sendResponseHeaders(204, -1);
            return;
        }

        String body    = lerBody(ex);
        String[] nomes = body.split(",");

        if (nomes.length < 2) {
            responder(ex, 400, "{\"erro\":\"Envie dois nomes separados por virgula\"}");
            return;
        }

        Jogo.iniciar(nomes[0].trim(), nomes[1].trim());
        responder(ex, 200, Jogo.getEstado("Combate iniciado!"));
    }

    // ---------------------------------------------------------------
    // POST /atacar  —  body: "ATAQUE_RAPIDO" | "ATAQUE_ESPECIAL" | "ATAQUE_PASSIVA"
    // ---------------------------------------------------------------
    private static void handleAtacar(HttpExchange ex) throws IOException {
        addCors(ex);
        if ("OPTIONS".equals(ex.getRequestMethod())) {
            ex.sendResponseHeaders(204, -1);
            return;
        }

        if (Jogo.p1 == null) {
            responder(ex, 400, "{\"erro\":\"Jogo nao iniciado. Chame /iniciar primeiro.\"}");
            return;
        }

        String acao = lerBody(ex).trim();
        responder(ex, 200, Jogo.atacar(acao));
    }

    // ---------------------------------------------------------------
    // Utilitários
    // ---------------------------------------------------------------
    private static void addCors(HttpExchange ex) {
        ex.getResponseHeaders().add("Access-Control-Allow-Origin",  "*");
        ex.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, OPTIONS");
        ex.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        ex.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
    }

    private static String lerBody(HttpExchange ex) throws IOException {
        return new String(ex.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
    }

    private static void responder(HttpExchange ex, int code, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        ex.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }
}