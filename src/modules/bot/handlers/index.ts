import { Telegraf } from "telegraf"

import { registerContactHandler } from "./contact.handler"
import { registerStartHandler } from "./start.handler"
import type { TelegrafContext } from "@/shared/interfaces"

export function registerBotHandlers(bot: Telegraf<TelegrafContext>) {
	registerStartHandler(bot)
	registerContactHandler(bot)
}
