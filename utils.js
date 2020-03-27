const uuidV4 = require('uuid').v4

/**
 * Created on 1399/1/8 (2020/3/27).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

const getExternalIP = () => new Promise((resolve, reject) =>
		http.get({host: 'ipv4bot.whatismyipaddress.com', port: 80, path: '/'}, res => {
			if (res.statusCode !== 200) reject(`Not OK status code: ${res.statusCode}`)
			res.on('data', chunk => resolve(chunk.toString()))
		}).on('error', reject)
)

/**
 *
 * @param text
 * @param callback
 * @param action
 * @returns {CallbackButton}
 */
const callbackBtn = function (text, callback, action = null) {
	if (action === null) action = uuidV4()
	global.dynamicActions[action] = callback
	
	return this.callbackButton(text, action)
}

module.exports = {
	getExternalIP,
	callbackBtn,
}
