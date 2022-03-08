import { apiPath } from '../environments/ApiPath';
import {ApiService} from './ApiService'

export class FeederUserPathService {

    _apiService = new ApiService();
   
    getAllFeederUserPath() {
        return this._apiService.get(apiPath.FEEDER_USER_PATH + '/getAll').then(res => res)
    }
    
    getUserInFeeder(id) {
        return this._apiService.get(apiPath.FEEDER_USER_PATH + '/getUserInFeeder?id='+id).then(res => res)
    }

    saveFeederUserPath(data){
        return this._apiService.post(apiPath.FEEDER_USER_PATH + '/save',data).then(res => res)

    }
}