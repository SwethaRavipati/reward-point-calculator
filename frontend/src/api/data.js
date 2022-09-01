
const axios = require('axios').default;

const fetchData = async () =>{
    try {
        const resp = await axios({
            method: 'GET',
            url: 'http://localhost:3000/transactions'
        })
        return resp.data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export default fetchData;
