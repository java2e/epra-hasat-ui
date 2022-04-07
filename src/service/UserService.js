import axios from 'axios';
import { apiPath } from '../environments/ApiPath';
import { pagePath } from '../environments/PagePath';
import { ApiService } from './ApiService';

export class UserService {
    _apiService = new ApiService();

    login(data) {
        return axios.post(apiPath.API_BASE_PATH+"/auth/signin",data).then(res => res.data);
    }

    getFeederBaraLineList(feederId){
        return this._apiService.get(pagePath.FEEDER+"/feederBaraLineList?id=1").then(res => res);
    }

    getUserList() {
        return this._apiService.get(pagePath.USER+'/getAll').then(res => res)
    }

    getAllCompanyUserList() {
        return this._apiService.get(pagePath.USER+'/getAllCompanyUsers').then(res => res)
    }

    getCompanyUserList(id) {
        return this._apiService.get(pagePath.USER+'/getCompanyUsers?id='+id).then(res => res)
    } 
    getConfirmUserList() {
        return this._apiService.get(pagePath.USER+'/getWaitConfirmUser').then(res => res)
    }

    postConfirmUser(data){
        return this._apiService.post(pagePath.USER+'/confirmUser',data).then(res => res)
    }
    saveUser(data){
        return this._apiService.post(pagePath.USER+'/save',data).then(res => res)
    }
    updateUser(data){
        return this._apiService.post(pagePath.USER+'/update',data).then(res => res)
    }

    deleteUser(data){
        return this._apiService.post(pagePath.USER+'/delete',data).then(res => res)
    }

}