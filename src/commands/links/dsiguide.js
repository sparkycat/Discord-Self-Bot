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
	commando = require('discord.js-commando');

module.exports = class dsiGuideCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'dsiguide',
			'aliases': ['dsi'],
			'group': 'links',
			'memberName': 'dsiguide',
			'description': 'A link to a Nintendo DSi Guide',
			'guildOnly': false
		});
	}

	deleteCommandMessages (msg) {
		if (msg.deletable && this.client.provider.get('global', 'deletecommandmessages', false)) {
			msg.delete();
		}
	}

	run (msg) {
		const dsiGuideEmbed = new Discord.MessageEmbed();

		dsiGuideEmbed
			.setColor(msg.member !== null ? msg.member.displayHexColor : '#FF0000')
			.setTitle('A one stop guide for DSI')
			.setDescription('Dusting off your DSi? Need instructions on how to set up DSi hacks? Follow this guide')
			.addField('\u200b', 'http://cfw.guide/dsi/')
			.setThumbnail('https://silento.s-ul.eu/1RKVHclC');

		this.deleteCommandMessages(msg);

		return msg.embed(dsiGuideEmbed, 'http://cfw.guide/dsi/');
	}
};