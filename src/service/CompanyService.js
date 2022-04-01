import { apiPath } from '../environments/ApiPath';
import { pagePath } from '../environments/PagePath';
import {ApiService} from './ApiService'

export class CompanyService {

    _apiService = new ApiService();
   
    getCompanys() {
        return this._apiService.get(pagePath.COMPANY+'/getAll').then(res => res)
    }

    saveCompany(data){
        return this._apiService.post(pagePath.COMPANY+'/save',data).then(res => res)
    }

    deleteCompany(data){
        return this._apiService.get(pagePath.COMPANY+'/delete?id='+data).then(res => res)
    }

}