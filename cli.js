#!/usr/bin/env node

'use strict';

const meow = require('meow');
const prompts = require('prompts');
const nanoid = require('nanoid');
const makeDir = require('make-dir');

// Meow configuration
const cli = meow(`
	Usage
	  $ pizza <options>
	Options
	  --order, -o   		Order pizza
	Examples
	  $ pizza --order
`, {
	flags: {
		order: {
			type: 'boolean',
			alias: 'o'
		}
	}
});

if (cli.flags.order) {
	(async () => {
		const questions = [
			{
				type: 'select',
				name: 'size',
				message: 'Select size:',
				choices: [
					{title: 'Small', value: 'small'},
					{title: 'Medium', value: 'medium'},
					{title: 'Large', value: 'large'},
					{title: 'Extra Large', value: 'extra large'}
				],
				initial: 1
			},
			{
				type: 'select',
				name: 'dough',
				message: 'Select dough type:',
				choices: [
					{title: 'Thin', value: 'thin'},
					{title: 'Thick', value: 'thick'}
				],
				initial: 1
			},
			{
				type: 'multiselect',
				name: 'ingredients',
				message: 'Pick ingredients:',
				choices: [
					{title: 'Pepperoni', value: 'pepperoni'},
					{title: 'Salami', value: 'salami'},
					{title: 'Bacon', value: 'bacon'},
					{title: 'Beef', value: 'beef'},
					{title: 'Sausage', value: 'sausage'},
					{title: 'Ham', value: 'ham'},
					{title: 'Calamari', value: 'calamari'},
					{title: 'Shrimp', value: 'shrimp'},
					{title: 'Paprika', value: 'paprika'},
					{title: 'Pineapple', value: 'pineapple'},
					{title: 'Jalapeño', value: 'jalapeno'},
					{title: 'Black olive', value: 'black olive'},
					{title: 'Green olive', value: 'green olive'},
					{title: 'Mushroom', value: 'mushroom'}
				],
				max: 5,
				hint: '- Space to select. Return to submit'
			},
			{
				type: 'text',
				name: 'name',
				message: 'What is your name?'
			},
			{
				type: 'number',
				name: 'phone',
				message: 'What is your phone number?'
			},
			{
				type: 'text',
				name: 'time',
				message: 'What time should we deliver your pizza?'
			},
			{
				type: 'text',
				name: 'city',
				message: 'City:'
			},
			{
				type: 'text',
				name: 'street',
				message: 'Street:'
			},
			{
				type: 'text',
				name: 'number',
				message: 'Apartment number:'
			},
			{
				type: 'text',
				name: 'notes',
				message: 'Any additional information?'
			}
		];

		const response = await prompts(questions);

		makeDir('./orders').then(async path => {
			const low = require('lowdb');
			const FileSync = require('lowdb/adapters/FileSync');
			const adapter = await new FileSync(`${path}/${nanoid(10)}.json`);
			const db = low(adapter);

			db.defaults({pizza: [], client: [], address: []}).write();

			db.get('pizza')
				.push({size: response.size, dough: response.dough, ingredients: response.ingredients})
				.write();
			db.get('client')
				.push({name: response.name, phone: response.phone})
				.write();
			db.get('address')
				.push({time: response.time, city: response.city, street: response.street, number: response.number, notes: response.notes})
				.write();
		});
	})();
}
