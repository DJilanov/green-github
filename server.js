const cron = require('node-cron');
const exec = require('child_process').exec;
const fs = require('fs');
 
cron.schedule('0 1 * * *', () => {
	const times = Math.floor(Math.random() * Math.floor(13));
	const long = Math.floor(10000000000000 + Math.random() * 90000000000000) + '';
	const charArray = long.split('');
	for(let counter = 0; counter < times; counter++) {
		fs.readFile('../spam/spam.txt', 'utf-8', (err, data) => {
			fs.writeFile('../spam/spam.txt', Math.random() + '', 'utf-8', (err) => {
				setTimeout(() => {
					console.log('Activated at ' + 10 + +charArray[counter] + +charArray[counter]/10);
					exec('git --git-dir ../spam/.git --work-tree=../spam add .', () => {
						exec(`git --git-dir ../spam/.git --work-tree=../spam commit -m"Push at ${Math.floor(Math.random() * Math.floor(13))}"`, () => {
							exec('git --git-dir ../spam/.git --work-tree=../spam push', () => {
								console.log('error: ', error);
								console.log('stdout: ', stdout);
								console.log('stderr: ', stderr);
								console.log('Done');
							});
						});
					});
				}, (600000 + +charArray[counter] + +charArray[counter]/10) * 60000);
			});
		});
	}

}, {
	scheduled: true,
	timezone: "America/Sao_Paulo"
});