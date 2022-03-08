import { apiPath } from '../environments/ApiPath';
import {ApiService} from './ApiService'

export class FeederService {

    _apiService = new ApiService();
   
    getFeeders() {
        return this._apiService.get(apiPath.FEEDER+'/getAll').then(res => res)
    }

    saveCompany(data){
        return this._apiService.post(apiPath.FEEDER+'/save',data).then(res => res)

    }
}