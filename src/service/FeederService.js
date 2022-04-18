import { pagePath } from '../environments/PagePath';
import {ApiService} from './ApiService'

export class FeederService {

    _apiService = new ApiService();
   
    getFeeders() {
        return this._apiService.get(pagePath.FEEDER+'/getAll').then(res => res)
    }

    getAllUserFeeders() {
        return this._apiService.get(pagePath.FEEDER+'/getAllUserFeeders').then(res => res)
    }

    getFeederById(id) {
        return this._apiService.get(pagePath.FEEDER+'/getById?id='+id).then(res => res)
    }

    saveCompany(data){
        return this._apiService.post(pagePath.FEEDER+'/save',data).then(res => res)
    }
}