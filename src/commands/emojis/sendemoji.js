/*
 *   This file is part of discord-self-bot
 *   Copyright (C) 2017-2018 Favna
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *   Additional Terms 7.b and 7.c of GPLv3 apply to this file:
 *       * Requiring preservation of specified reasonable legal notices or
 *         author attributions in that material or in the Appropriate Legal
 *         Notices displayed by works containing it.
 *       * Prohibiting misrepresentation of the origin of that material,
 *         or requiring that modified versions of such material be marked in
 *         reasonable ways as different from the original version.
 */

const Discord = require('discord.js'),
	commando = require('discord.js-commando'),
	path = require('path');

module.exports = class sendEmojiCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'sendemoji',
			'aliases': ['emoji', 'emo', 'sendemo', 'emosend'],
			'group': 'emojis',
			'memberName': 'sendemoji',
			'description': 'Send an emoji',
			'examples': ['sendemoji {imageName}', 'sendemoji thonk'],
			'guildOnly': false,

			'args': [
				{
					'key': 'emojiName',
					'prompt': 'What emoji do you want send?',
					'type': 'string',
					'label': 'name of the emoji'
				}, {
					'key': 'message',
					'prompt': 'Content to send along with the emoji?',
					'type': 'string',
					'default': '',
					'label': 'Message to send along with the emoji'
				}
			]
		});
	}

	deleteCommandMessages (msg) {
		if (msg.deletable && this.client.provider.get('global', 'deletecommandmessages', false)) {
			msg.delete();
		}
	}

	run (msg, args) {
		this.deleteCommandMessages(msg);
		
		return msg.channel.send(args.message, {'files': [new Discord.MessageAttachment(path.join(__dirname, `images/${args.emojiName.toLowerCase()}.png`), `${args.emojiName}Emoji.png`)]});
	}
};