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
					callbackBtn.bind(m)('بله', ctx => ctx.answerCbQuery('YES')),
					callbackBtn.bind(m)('خیر', ctx => ctx.answerCbQuery('NO')),
				], {columns: 1})
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

module.exports = {
	HelloScene,
}
