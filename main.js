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
;['start', 'cancel'].map(command => stage.command(command, async (ctx, next) => {
	//userRegistrationMiddleware(ctx, () => { /* things to be run only if the registration succeed. */ }).then()

	// run anyway:
	leave()(ctx).then()
//	await global.mainMenu.rootMenu.renderWith.reply(ctx)
}))


// // register scenes:
// const {UsernameScene, PasswordScene} = require('./scenes/add-user')
// const {QuestionsScene} = require('./scenes/bashgah-competitions')
// stage.register(
// 		new UsernameScene(),
// 		new PasswordScene(),
// 		new QuestionsScene(),
// )

bot.use(session())
bot.use(stage.middleware())
//*******************************************************************************************/
bot.use((ctx,next)=>{
	console.log('Hello');
	ctx.reply('Hello');
});

bot.launch().then(() => console.log('%s: Bot started as @%s',
		new Date().toLocaleString('en-ZA-u-ca-persian'), bot.options.username))
