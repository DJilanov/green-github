const cron = require('node-cron');
const exec = require('child_process').exec;
const fs = require('fs');
 
cron.schedule('0 1 * * *', () => {
	const times = Math.floor(Math.random() * Math.floor(13));
	const long = Math.floor(1e13 + Math.random() * 9e13) + '';
	const charArray = long.split('');
	for(let counter = 0; counter < times; counter++) {
		fs.readFile('../spam/spam.txt', 'utf-8', (err, data) => {
			fs.writeFile('../spam/spam.txt', Math.random() + '', 'utf-8', (err) => {
				setTimeout(() => {
					console.log('Activated at ' + 10 + +charArray[counter] + +charArray[counter]/10);
					exec('git --git-dir ../spam/.git --work-tree=../spam add .', () => {
						exec(`git --git-dir ../spam/.git --work-tree=../spam commit -m"Push at ${Math.floor(Math.random() * Math.floor(13))}"`, () => {
							exec('git --git-dir ../spam/.git --work-tree=../spam push', () => {
								console.log('Done');
							});
						});
					});
				}, (6e5 + +charArray[counter] + +charArray[counter]/10) * 6e4);
			});
		});
	}

}, {
	scheduled: true,
	timezone: "America/Sao_Paulo"
});