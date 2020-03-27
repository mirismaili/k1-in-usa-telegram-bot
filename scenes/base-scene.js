const Scene = require('telegraf/scenes/base')

/**
 * Created on 1398/12/1 (2020/2/20).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
'use strict'

class BaseScene extends Scene {
	constructor(name) {
		super(name)
		this.name = name

		this.enter(this.onEnter.bind(this))
		this.leave(this.onLeave.bind(this))
		this.on('text', (ctx, next) => this.onText.bind(this)(ctx.message.text, ctx, next))
		this.on('photo', (ctx, next) => {
			let photos = ctx.message.photo;
			this.onPhoto.bind(this)(photos[ctx.message.photo.length-1].file_id, ctx, next);
		})
		this.on('document', (ctx, next) => this.onDocument.bind(this)(ctx.message.document, ctx, next))

		for (const onHear of this.getOnHears()) this.hears(onHear.message, onHear.callback)
	}

	onEnter(ctx, next) {
		console.log('Entered scene:', this.name)
	}

	onLeave(ctx, next) {
		console.log('Left scene:', this.name)
	}

	getOnHears() {
		return []
	}

	onText(text, ctx, next) {
	}
	onPhoto(photo, ctx, next) {
	}
	onDocument(document, ctx, next) {
	}
}

module.exports = {
	BaseScene,
}
