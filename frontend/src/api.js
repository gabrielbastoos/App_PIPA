const axios = require('axios').default;

var testando = null;

async function teste () {
    
	try {
		const url = "https://app-pipa.herokuapp.com/status";
		const response = await axios.get(url);
        testando = (response.data.data.volume);
        } catch (e) {
	  console.log(e);
	};
};

teste();

console.log(testando);