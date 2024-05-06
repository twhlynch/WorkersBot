const nacl = require("tweetnacl");
import { Buffer } from 'node:buffer';

export default {
    async fetch(request, env, ctx) {

        // Handle invalid requests
        const signature = request.headers.get("x-signature-ed25519");
        const timestamp = request.headers.get("x-signature-timestamp");
        const body = await request.text();
        const isVerified = signature && timestamp && nacl.sign.detached.verify(
            Buffer.from(timestamp + body),
            Buffer.from(signature, "hex"),
            Buffer.from(env.PUBLIC_KEY, "hex")
        );

        if (!isVerified) {
            return new Response("invalid request signature", {status: 401});
        }

        // Handle ping requests
        const json = JSON.parse(body);
        if (json.type == 1) {
            return Response.json({
                type: 1
            });
        }

        // Handle command requests
        if (json.type == 2) {
            const command_name = json.data.name;

            if (command_name === "basic") {

                return Response.json({
                    type: 4,
                    data: {
                        tts: false,
                        content: "Success",
                        embeds: [],
                        allowed_mentions: { parse: [] }
                    }
                });

            } else if (command_name === "embed") {

                const embed = {
                    "type": "rich",
                    "title": "Basic embed",
                    "description": "This is a description",
                    "color": 0x5865F2,
                    "fields": [
                        {
                            "name": "Field 1",
                            "value": "Value 1",
                            "inline": true
                        },
                        {
                            "name": "Field 2",
                            "value": "Value 2",
                            "inline": false
                        }
                    ],
                    "url": "https://discord.com"
                };

                return Response.json({
                    type: 4,
                    data: {
                        tts: false,
                        content: '',
                        embeds: [embed],
                        allowed_mentions: { parse: [] }
                    }
                });

            } else if (command_name === "input") {

                const input = json.data.options[0].value;

                return Response.json({
                    type: 4,
                    data: {
                        tts: false,
                        content: `You entered: ${input}`,
                        embeds: [],
                        allowed_mentions: { parse: [] }
                    }
                });

            }
        }

        // Handle other requests
        return new Response("invalid request type", {status: 400});

    },
};