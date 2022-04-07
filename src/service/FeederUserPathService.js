import { pagePath } from '../environments/PagePath';
import {ApiService} from './ApiService'

export class FeederUserPathService {

    _apiService = new ApiService();
   
    getAllFeederUserPath() {
        return this._apiService.get(pagePath.FEEDER_USER_PATH + '/getAll').then(res => res)
    }
    
    getUserInFeeder(id) {
        return this._apiService.get(pagePath.FEEDER_USER_PATH + '/getUserInFeeder?id='+id).then(res => res)
    }

    saveFeederUserPath(data){
        return this._apiService.post(pagePath.FEEDER_USER_PATH + '/save',data).then(res => res)

    }

    deleteFeederUserPath(data){
        return this._apiService.get(pagePath.FEEDER_USER_PATH+'/delete?id='+data).then(res => res)
    }

    


}