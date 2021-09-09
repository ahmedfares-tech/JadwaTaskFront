
import axios from 'axios';

const primary = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

primary.defaults.headers.common['Accept'] = 'application/json';
// primary.defaults.headers.common['Content-Type'] = 'application/json';
// primary.defaults.headers.common['Accept'] = 'multipart/form-data';
primary.defaults.headers.common['Content-Type'] = 'multipart/form-data';
primary.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
if (localStorage.getItem('token') != null || localStorage.getItem('token') !== undefined) {
    primary.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
}


export default primary;