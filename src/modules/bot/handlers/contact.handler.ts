import type { Telegraf } from "telegraf"

import type { TelegrafContext } from "@/shared/interfaces"

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
	bot.on("contact", async ctx => {
		const phone = ctx.message.contact.phone_number

		console.log("Result: ", ctx.message.contact)
	})
}
