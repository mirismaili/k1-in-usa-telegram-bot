/**
 * Created on 1399/1/8 (2020/3/27).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const {SocksProxyAgent} = require('socks-proxy-agent')
//*******************************************************************************************/

const env = process.env
//*******************************************************************************************/

const bot = new Telegraf(process.env.BOT_TOKEN, env.IS_ON_REMOTE ? undefined : {
	telegram: {
		agent: new SocksProxyAgent({
			host: '127.0.0.1',
			port: 50001,
		})
	}
})
//*******************************************************************************************/

// managing sessions and scenes:

const {enter, leave} = Stage

const stage = new Stage()
stage.command('cancel', leave())


// register scenes:
const {HelloScene} = require('./scenes/hello')
const {SendLinkScene} = require('./scenes/hello')
const {GetEmailScene} = require('./scenes/hello')
const {GetScreenShot} = require('./scenes/hello')
stage.register(
		new HelloScene(),
		new SendLinkScene(),
		new GetEmailScene(),
		new GetScreenShot(),
)

bot.use(session())
bot.use(stage.middleware())
//*******************************************************************************************/

// log actions + trigger dynamic-actions:
global.dynamicActions = {}
bot.action(/.+/, async (ctx, next) => {
	const action = ctx.match[0]
	console.log(action)

	if (global.dynamicActions[action]) return await global.dynamicActions[action](ctx, next)
	next()
})
//*******************************************************************************************/
// bot.use((ctx)=>{
// 	console.log(ctx)
// });
bot.start(ctx => {
	ctx.scene.enter('hello').then()
})


bot.launch().then(() => console.log('%s: Bot started as @%s',
		new Date().toLocaleString('en-ZA-u-ca-persian'), bot.options.username))
