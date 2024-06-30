import { Hono } from 'hono'

type Env = {
	AI: Ai
}

const app = new Hono<{ Bindings: Env }>()

// GET /?query='How is your day today?'
app.get('/', async (c) => {
	const content = c.req.query('query') || 'What is the origin of the phrase Hello, World?'

	// cast model to BaseAiTextGenerationModels
	const model: BaseAiTextGenerationModels = '@hf/thebloke/mistral-7b-instruct-v0.1-awq'

	const messages: RoleScopedChatInput[] = [
		{ role: 'system', content: 'You are a freindly assistant.' },
		{ role: 'user', content },
	]

	const inputs = { messages, stream: false }

	const res = await c.env.AI.run(model, inputs)

	return c.json(res)
})

export default app

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		console.log(JSON.stringify(request.cf)); // Lots of info about where the request came from
// 		return new Response(JSON.stringify({ hello: 'World' }), {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 	},
// } satisfies ExportedHandler<Env>;
