const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';

async function travelFilter(){
    const config = {
        method: 'post',
        url: `${url}/api/travelslots/all`,
        data: {
            filters : {
                query: {
                    uuid: `${location.href.split('?')[1].split('_')[3]}`,
                    fromCity: `${location.href.split('?')[1].split('_')[1]}`,
                    toCity: `${location.href.split('?')[1].split('_')[2]}`,
                    fromHour: `${location.href.split('?')[1].split('_')[0]}`,
                },
                pagination:{pageNumber:1}
            }
        }
    }
    let res = await axios(config);
    const data = res.data[0];
    console.log(res.data[0]);
    document.querySelector('.evalution').innerHTML = `"Firma: ${data.title.split('-')[0]} Kalkış Yeri : ${data.fromCity} - İniş Yeri : ${data.toCity} - Sefer Saati : ${data.fromHour}:${data.fromMinute} olan sefer hakkında detaylı bilgiyi aşağıda bulabilirsin."`
}


export {travelFilter};