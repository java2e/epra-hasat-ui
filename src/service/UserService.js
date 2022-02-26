import axios from 'axios';

export class UserService {


    login(data) {
        return axios.post("http://localhost:5000/api/auth/signin",data).then(res => res.data);
    }


    getUsers() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

}