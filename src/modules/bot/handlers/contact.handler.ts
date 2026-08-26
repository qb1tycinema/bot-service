import { TelegramCompleteRequest } from "@qb1tycinema/contracts/gen/auth"
import { lastValueFrom } from "rxjs"
import type { Telegraf } from "telegraf"

import { authClient } from "@/infrastructure/grpc"
import type { TelegrafContext } from "@/shared/interfaces"

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
	bot.on("contact", async ctx => {
		const phone = ctx.message.contact.phone_number

		if (!ctx.chat.id || !ctx.session.id) {
			return ctx.reply(
				"Произошла ошибка. Пожалуйста, начните процесс через сайт"
			)
		}

		const request: TelegramCompleteRequest = {
			sessionId: ctx.session.id,
			phone
		}

		const { sessionId } = await lastValueFrom(
			authClient.telegramComplete(request)
		)

		await ctx.reply("Регистрация успешна завершена", {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Вернутся на сайт",
							url: `https://qb1tycinema.kz/auth/tg-finalize?sessionId=${sessionId}`
						}
					]
				]
			}
		})
	})
}
