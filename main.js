const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const {SocksProxyAgent} = require('socks-proxy-agent')
const {getExternalIP} = require('./utils')
const actions = require('./actions')

/**
 * Created on 1399/1/8 (2020/3/27).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

getExternalIP().then(console.log.bind(console, 'Public IP:')).catch(console.error)
//*******************************************************************************************/

const env = process.env
//*******************************************************************************************/

const bot = new Telegraf(env.BOT_TOKEN, env.SOCKS_PROXY_HOST && {
	telegram: {
		agent: new SocksProxyAgent({
			host: env.SOCKS_PROXY_HOST,
			port: env.SOCKS_PROXY_PORT,
		})
	}
})
//*******************************************************************************************/

// managing sessions and scenes:

const stage = new Stage()
;['start', 'cancel'].map(command => stage.command(command, async (ctx, next) => {
	
	// run anyway:
	await ctx.scene.enter('start').then()
}))

// register scenes:
require('./scenes')(stage)

bot.use(session())
// noinspection JSUnresolvedFunction
bot.use(stage.middleware())
//*******************************************************************************************/

// register actions:

// log all actions:
bot.action(/.+/, async (ctx, next) => {
	const action = ctx.match[0]
	console.log(action)
	next()
})

for (const action in actions) {
	// noinspection JSUnfilteredForInLoop
	bot.action(action, actions[action])
}
//*******************************************************************************************/

bot.launch(env.IS_ON_REMOTE && {
	webhook: {domain: env.REMOTE_HOST, port: env.PORT}
}).then(() => console.log('%s: Bot started as @%s',
		new Date().toLocaleString('en-ZA-u-ca-persian'), bot.options.username))
