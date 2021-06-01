import axios from 'axios';

async function aue() {
	try {
		const res = await axios.get('http://localhost:3000/items');
		let matchesArr = res.data.results;

		const leaguesObj = matchesArr.reduce(function(objAccum, item) {
			if (!objAccum[item.SportName]) {
				objAccum[item.SportName] = [];
			}
			objAccum[item.SportName].push(item);
			return objAccum;
		}, {});
		console.log(leaguesObj);
		console.log(Object.keys(leaguesObj));
	} catch (err) {
		console.error(err);
	}
}

export default aue;
