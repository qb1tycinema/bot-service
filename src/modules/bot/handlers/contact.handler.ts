import type {
	TelegramCompleteRequest,
	TelegramCompleteResponse
} from "@qb1tycinema/contracts/gen/auth"
import type { Telegraf } from "telegraf"

import { authClient } from "@/infrastructure/grpc"
import type { TelegrafContext } from "@/shared/interfaces"
import { callUnary } from "@/shared/util"

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
	bot.on("contact", async ctx => {
		const contact = ctx.message.contact
		const phone = ctx.message.contact.phone_number

		if (contact.user_id !== ctx.from.id) {
			return ctx.reply(
				"Пожалуйста, отправьте именно ваш номер телефона, используя кнопку ниже."
			)
		}

		if (!ctx.chat.id || !ctx.session.id) {
			return ctx.reply(
				"Произошла ошибка. Пожалуйста, начните процесс через сайт"
			)
		}

		const request: TelegramCompleteRequest = {
			sessionId: ctx.session.id,
			phone
		}

		const { sessionId } = await callUnary<
			TelegramCompleteRequest,
			TelegramCompleteResponse
		>(authClient.telegramComplete.bind(authClient), request)

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
