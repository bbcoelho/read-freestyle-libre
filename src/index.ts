import figlet from "figlet";

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const body = figlet.textSync("Brunão");
        return new Response(body);
        return new Response("Bun!");
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);