const axios = require('axios').default

const userCredientals = async () => {
    const config = {
        method : 'get',
        url : 'http://127.0.0.1:9999/api/users/profile'
    }
    try {
    let res = await axios(config);
    console.log(res.data);
    } catch(error) {
        console.log(error);
    }
}

export {userCredientals};