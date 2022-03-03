import { apiPath } from '../environments/ApiPath';
import {ApiService} from './ApiService'

export class CompanyService {

    _apiService = new ApiService();
   
    getCompanys() {
        return this._apiService.get(apiPath.COMPANY+'/getAll').then(res => res)
    }

    saveCompany(data){
        return this._apiService.post(apiPath.COMPANY+'/save',data).then(res => res)

    }
}