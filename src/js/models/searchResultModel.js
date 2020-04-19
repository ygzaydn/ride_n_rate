const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';

async function travelFilter(){
    const travelSlotUUID = location.href.split('?')[1];
    const companyUUID = location.href.split('?')[2];
    const config = {
        method: 'get',
        url: `${url}/api/travelslots/${travelSlotUUID}`,
    }
    let res = await axios(config);
    const data = res.data;
    //console.log(data);

    async function companyFilter(){
        const configComp = {
            method: 'get',
            url: `${url}/api/companies/${companyUUID}`
        }
    let resCompany = await axios(configComp);
    const dataComp = resCompany.data;
    //console.log(dataComp);
    const compNameNoSpace = dataComp.name.replace(/\s+/g, '').toLowerCase();
    //console.log(compNameNoSpace)

    document.querySelector('.evalution').innerHTML = `Firma: ${dataComp.name} <br> Kalkış Yeri : ${data.fromCity} <br> İniş Yeri : ${data.toCity} <br> Sefer Saati : ${data.fromHour}:${data.fromMinute} <br> bilgilerine sahip sefer hakkında detaylı bilgiyi aşağıda bulabilirsin.`
    document.querySelector('.logo-place').attributes[1].nodeValue = `background-image: url("src/images/companies/${compNameNoSpace}.png"); background-size: contain; background-position: 50% -25px;`
    }
    companyFilter();
}


export {travelFilter};