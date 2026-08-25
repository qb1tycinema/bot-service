import { Telegraf } from "telegraf"

import { getInlineKeyboardMarkup, getKeyboardMarkup } from "@/modules/markup"
import type { TelegrafContext } from "@/shared/interfaces"

export function registerStartHandler(bot: Telegraf<TelegrafContext>) {
	bot.start(async ctx => {
		const sessionId = ctx.startPayload

		if (!sessionId) {
			return ctx.reply(
				"Здравствуйте! Чтобы продолжить, пожалуйста, авторизуйтесь на сайте",
				getInlineKeyboardMarkup()
			)
		}

		ctx.session.id = sessionId

		await ctx.reply(
			"Для завершения регистрации отправьте свой номер телефона",
			getKeyboardMarkup()
		)
	})
}
