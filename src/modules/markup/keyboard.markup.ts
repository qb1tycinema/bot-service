import { Markup } from "telegraf"

export function getKeyboardMarkup() {
	return Markup.keyboard([
		[Markup.button.contactRequest("Поделиться номером")]
	])
}

export function getInlineKeyboardMarkup() {
	return Markup.inlineKeyboard([
		Markup.button.url(
			"Перейти к авторизации",
			"https://qb1tycinema.kz/auth/login"
		)
	])
}
