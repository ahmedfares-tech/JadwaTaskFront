
import { decrypt, token } from './jwt';


export default function ClientFirstUse() {
    if (!localStorage.getItem('mode')) {
        token({ mode: false }).then(mode => {
            localStorage.setItem('mode', mode)
        });
    }
}
export function DecryptFast(name) {
    return decrypt(localStorage.getItem(name));
}
