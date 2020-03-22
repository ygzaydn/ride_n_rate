const axios = require('axios').default;
axios.defaults.withCredentials = true;

async function countNumber() {
    const config = {
        method : 'get',
        url : 'http://127.0.0.1:9999/api/stats/review/count'
    }
    try {
        let res = await axios(config);
        let countNum = res.data.count;
        document.getElementById('checklist').children[2].innerHTML = `Yorum sayısı: ${countNum}`
        
    } catch (err) {
        console.log(err);
    }
}

export {countNumber};