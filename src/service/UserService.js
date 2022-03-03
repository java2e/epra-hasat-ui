import axios from 'axios';
import { apiPath } from '../environments/ApiPath';
import { ApiService } from './ApiService';

export class UserService {
    _apiService = new ApiService();

    login(data) {
        return axios.post(apiPath.API_BASE_PATH+"/auth/signin",data).then(res => res.data);
    }


    getUsers() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getUserList() {
        return this._apiService.get(apiPath.USER+'/getAll').then(res => res)
    }

    saveUser(data){
        return this._apiService.post(apiPath.USER+'/save',data).then(res => res)
    }

}