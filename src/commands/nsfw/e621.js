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

const booru = require('booru'),
	commando = require('discord.js-commando');

module.exports = class e621Command extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'e621',
			'group': 'nsfw',
			'aliases': ['eee'],
			'memberName': 'e621',
			'description': 'Find NSFW Content on e621',
			'examples': ['e621 {NSFW Query}', 'e621 Pyrrha Nikos'],
			'guildOnly': false,
			'nsfw': true,

			'args': [
				{
					'key': 'nsfwtags',
					'prompt': 'What do you want to find NSFW for?',
					'type': 'string',
					'label': 'Search query'
				}
			]
		});
	}

	deleteCommandMessages (msg) {
		if (msg.deletable && this.client.provider.get('global', 'deletecommandmessages', false)) {
			msg.delete();
		}
	}

	async run (msg, args) {
		try {
			const booruData = await booru.search('e621', args.nsfwtags.split(' '), {
				'limit': 1,
				'random': true
			}).then(booru.commonfy);

			if (booruData) {
				this.deleteCommandMessages(msg);

				return msg.say(`Score: ${booruData[0].common.score}\nImage: ${booruData[0].common.file_url}`);
			}

			return msg.reply('⚠️ No juicy images found.');
		} catch (booruError) {
			return msg.reply('⚠️ No juicy images found.');
		}
	}
};