/**
 * Created on 1399/1/9 (2020/3/28).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

module.exports = {
	'Yes, I have subscribed to youtube channel.': async ctx => {
		ctx.answerCbQuery().then()
		await ctx.scene.enter('get-email').then()
	},
	
	'No, I haven\'t subscribed to youtube channel.': async ctx => {
		ctx.answerCbQuery().then()
		await ctx.replyWithMarkdown(
				'آموزش عضویت در کانال را [اینجا](https://t.me/K1inUSA/6683)‌ ببینید و پس از عضویت، برای ورود به لیست قرعه‌کشی، به این بات بازگردید.')
	},
}
