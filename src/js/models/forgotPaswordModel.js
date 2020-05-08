import axios from 'axios';
import Swal from 'sweetalert2'

import { url } from '../register'

const resetPassword = async (password, uuid) => {
    const config = {
        url: `${url}/api/auth/password-reset-callback`,
        method: 'post',
        data: {
            uuid: uuid,
            password: password,
        }
    }
    try {
        const result = axios(config);
        console.log(result);
        Swal.fire(
            'Şifre değiştirme başarılı',
            'Yeni şifreni kullanarak kolaylıkla giriş yapabilirsin.',
            'success'
          )

    } catch (err) {
        Swal.fire(
            'Şifre değiştirme sırasında bir hata oluştu',
            'error'
          )
        console.log(err);
    }
}

export { resetPassword }