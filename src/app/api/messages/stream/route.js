// API Route: /api/messages/stream

let clients = []

export async function GET () {
    let client;
    const stream = new ReadableStream({
        start(controller) {

            // Each connected client have its own controller
            client = {controller}

            // stores the controler in the clients array
            clients.push(client)


            // send initial message to confirm connection
            controller.enqueue(encode(`data: ${JSON.stringify({type: "connected"})}\n\n`)) // \n\n is cruacial, since it stands for the end of the event

        }, cancel() {
            // This run when client disconects. Browser closes connection automatically.
            clients = clients.filter(c => c !== client)
        }
    })
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive"
        }
    })
}

function encode(str) {
    return new TextEncoder().encode(str)
}

export function broadcastMessage(message) {
    const data = `data: ${JSON.stringify(message)}\n\n`
    const encoded = encode(data)

    for (const client of clients) {
        try{

            client.controller.enqueue(encoded)

        } catch(e) {

            // ignore the error

        }
    }
}