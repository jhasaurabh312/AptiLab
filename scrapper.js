var firebase = require('firebase');

firebase.initializeApp({
	apiKey: "AIzaSyBcJztuJ-efDvIZ4zYQHkzOyaPEeoEyHvY",
	authDomain: "aptilab-7292e.firebaseapp.com",
	databaseURL: "https://aptilab-7292e.firebaseio.com",
	projectId: "aptilab-7292e",
	storageBucket: "aptilab-7292e.appspot.com",
	messagingSenderId: "1003854819818",
	appId: "1:1003854819818:web:2b8aa87e1421e6909c8293",
	measurementId: "G-D8HE8Q140Q"
})

var db = firebase.database();

var flag = 1;
var count = 0;
while(flag < 8){
	const url = 'https://www.indiabix.com/aptitude/problems-on-trains/03800'+ flag;	    
	flag = flag + 1;

	var axios = require('axios');
	var cheerio = require('cheerio');

	axios(url).then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);
		const questionTable = $('div[class="bix-div-container"]');
		const questions = [];
		

		questionTable.each(function() {       
			const Ques = $(this).find('td[class="bix-td-qtxt"]').text();
			const Cans = $(this).find('input[class="jq-hdnakq"]').val();

			const choices = [];
			const options = $(this).find('td[class="bix-td-option"]');
			options.each(function(){
				const val = $(this).text();
				choices.push(val);
			});

			const optA = choices[0] + choices[1];
			const optB = choices[2] + choices[3];
			const optC = choices[4] + choices[5];
			const optD = choices[6] + choices[7];

			let Explanation = {
				Explain : false,
			}

			let Problem = {
				Question : Ques,
				Answer : Cans,
				Option_A : optA,
				Option_B : optB,
				Option_C : optC,
				Option_D : optD,
			}

			db.ref('/' + 'quantitative/practice/train-problem/' + count).set({Problem,Explanation});	
			count = count + 1;
		});
		
		
	}).catch(console.error);
}

console.log('SUCCESSFULLY DONE !!!')