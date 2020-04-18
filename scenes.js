const Extra = require('telegraf/extra')
const {BaseScene} = require('./base-scene')
const actions = require('./actions')

/**
 * Created on 1399/1/8 (2020/3/27).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

class StartScene extends BaseScene {
	constructor() {
		super('start')
	}
	
	async onEnter(ctx) {
		super.onEnter(ctx)
		
		ctx.scene.leave().then()
		
		await ctx.replyWithMarkdown('آیا در [کانال یوتیوب @K1inUSA](https://youtube.com/c/K1inUSA) عضو شده‌اید؟', Extra.markup(m => m.inlineKeyboard([
			m.callbackButton('خیر', 'No, I haven\'t subscribed to youtube channel.'),
					m.callbackButton('بله', 'Yes, I have subscribed to youtube channel.'),
				])
		))
	}
}

class GetEmailScene extends BaseScene {
	constructor() {
		super('get-email')
	}
	
	async onEnter(ctx) {
		super.onEnter(ctx)
		ctx.reply('آدرس جیمیل خود را وارد نمایید.')
		
	}
	
	onText(text, ctx) {
		ctx.session.gmail = text
		ctx.scene.enter('get-screenshot').then()
	}
}

class GetScreenshotScene extends BaseScene {
	constructor() {
		super('get-screenshot')
	}
	
	async onEnter(ctx) {
		super.onEnter(ctx)
		ctx.reply('اسکرین‌شاتی از عضویت خود در کانال بفرستید.')
	}
	
	async onText(text, ctx, next) {
		ctx.reply('لطفاً تصویر ارسال کنید!')
	}
	
	async onPhoto(photos, ctx, next) {
		ctx.scene.leave().then()
		const photoId = photos[ctx.message.photo.length - 1].file_id
		
		const u = field => ctx.from[field] ? ctx.from[field] : ''
		
		// If destination id (WILL_FORWARDED_TO) didn't exist or was not allowed => Error: 400: Bad Request: chat not found
		await ctx.telegram.sendPhoto(process.env.WILL_FORWARDED_TO, photoId, {
			caption:
					`Gmail: ${ctx.session.gmail}\n\nTelegram: <code>${u('id')}</code> @${u('username')}\n` +
					`<b>${u('first_name')} ${u('last_name')}</b>`,
			parse_mode: 'HTML'
		})
		
		await ctx.reply('ممنون! شما به قرعه‌کشی وارد شدید!')
	}
	
	async onDocument(document, ctx, next) {
		ctx.reply('لطفاً به صورت «تصویر» ارسال کنید، نه به صورت «فایل»!')
	}
}


module.exports = stage => {
	stage.register(
			new StartScene(),
			new GetEmailScene(),
			new GetScreenshotScene(),
	)
}
