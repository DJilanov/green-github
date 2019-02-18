const cron = require('node-cron');
const exec = require('child_process').exec;
const fs = require('fs');
 
cron.schedule('0 1 * * *', () => {
	const times = Math.floor(Math.random() * 13);
	const randomCharArray = (Math.floor(1e5 + Math.random() * 9e5) + '' + Math.floor(1e5 + Math.random() * 9e5)).split(''); // you must use 32 bit integers in NodeJS
	for(let counter = 0; counter < times; counter++) {
		fs.readFile('../spam/spam.txt', 'utf-8', (err, data) => {
			fs.writeFile('../spam/spam.txt', Math.random() + '', 'utf-8', (err) => {
				setTimeout(() => {
					console.log('Activated at ' + 10 + +randomCharArray[counter] + +randomCharArray[counter]/10);
					exec('git --git-dir ../spam/.git --work-tree=../spam add .', () => {
						exec(`git --git-dir ../spam/.git --work-tree=../spam commit -m"Push at ${Math.floor(Math.random() * Math.floor(13))}"`, () => {
							exec('git --git-dir ../spam/.git --work-tree=../spam push', () => {
								console.log('Done');
							});
						});
					});
				}, 
					36e6 + // 10 hours
					+randomCharArray[counter] * 36e5 + // the random num as hours
					+randomCharArray[counter]/10 // second number min as minutes
				);
			});
		});
	}

}, {
	scheduled: true,
	timezone: "America/Sao_Paulo"
});