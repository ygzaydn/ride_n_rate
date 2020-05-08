import { resetPassword } from '../models/forgotPaswordModel'
import Swal from 'sweetalert2'

const uuid = window.location.href.split('?uuid=')[1];

document.getElementById('SignUp').addEventListener('click',() => {

    const password = document.getElementById('password_box_sign_up').value;
    const rePassword= document.getElementById('repassword_box_sign_up').value;

    if (password === rePassword && password) {
        console.log(password);
        console.log(uuid);
        resetPassword(password, uuid);

    } else {
        Swal.fire(
            'Şifre değiştirme sırasında bir hata oluştu',
            'Lütfen bilgileri doğru girdiğinden emin ol.',
            'error'
          )
    }

})