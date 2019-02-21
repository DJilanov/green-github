const cron = require('node-cron');
const exec = require('child_process').exec;
const fs = require('fs');

let gitPusher = () => {
	const times = Math.floor(Math.random() * 13);
	console.log('Times: ', times);
	const randomCharArray = (Math.floor(1e7 + Math.random() * 9e7) + '' + Math.floor(1e7 + Math.random() * 9e7)).split(''); // you must use 32 bit integers in NodeJS
	console.log('Char array: ', randomCharArray);
	for(let counter = 0; counter < times; counter++) {
		fs.readFile('../spam/spam.txt', 'utf-8', () => {
			fs.writeFile('../spam/spam.txt', Math.random() + '', 'utf-8', () => {
				setTimeout(() => {
					console.log('Activated at: ', (new Date()));
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
}
 
cron.schedule('0 1 * * *', () => {
	gitPusher();
	console.log('Activate the pushed by the cron');
}, {
	scheduled: true,
	timezone: "America/Sao_Paulo"
});

// Run the pusher on start 
gitPusher();

console.log('Green github launched');