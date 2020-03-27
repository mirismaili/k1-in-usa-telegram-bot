const Extra = require('telegraf/extra')
const {BaseScene} = require('./base-scene')
const {callbackBtn} = require('../utils')

/**
 * Created on 1399/1/8 (2020/3/27).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

class HelloScene extends BaseScene {
	constructor() {
		super('hello')
	}

	async onEnter(ctx) {
		super.onEnter(ctx)

		ctx.reply('آیا در کانال یوتیوب @K1inUSA عضو شده‌اید؟', Extra.markup(m => m.inlineKeyboard([
					callbackBtn.bind(m)('بله', ctx => {
						ctx.answerCbQuery()
						ctx.scene.enter('get-email').then()
					}),
					callbackBtn.bind(m)('خیر', ctx => {
						ctx.answerCbQuery()
						ctx.scene.enter('send-link').then()
					}),
				])
		))
	}

	// onText(text, ctx) {
	// 	// delete entered username:
	// 	ctx.deleteMessage().then()
	//
	// 	ctx.session.username = text
	// 	ctx.scene.enter('password').then()
	// }
}

class SendLinkScene extends BaseScene {
	constructor() {
		super('send-link')
	}

	async onEnter(ctx) {
		super.onEnter(ctx)
		ctx.replyWithMarkdown('آموزش عضویت در کانال را [اینجا](https://t.me/)‌ ببینید و پس از عضویت، برای ورود به لیست قرعه‌کشی، به این بات بازگردید')
		ctx.secne.leave()

	}

	// onText(text, ctx) {
	// 	// delete entered username:
	// 	ctx.deleteMessage().then()
	//
	// 	ctx.session.username = text
	// 	ctx.scene.enter('password').then()
	// }
}
class GetEmailScene extends BaseScene {
	constructor() {
		super('get-email')
	}

	async onEnter(ctx) {
		super.onEnter(ctx)
		ctx.reply('لطفا آدرس جیمیل خود را وارد نمایید.')

	}

	onText(text, ctx) {
		if(!text.endsWith("@gmail.com"))
			return ctx.reply('آدرس جیمیل شما صحیح نیست')
		ctx.session.gmail = text
		ctx.scene.enter('get-screenshot').then()
	}
}
class GetScreenShot extends BaseScene {
	constructor() {
		super('get-screenshot')
	}

	async onEnter(ctx) {
		super.onEnter(ctx)
		ctx.reply('اسکرین‌شاتی از عضویت خود در کانال بفرستید')

	}
}

module.exports = {
	HelloScene,
	SendLinkScene,
	GetEmailScene,
	GetScreenShot,
}
