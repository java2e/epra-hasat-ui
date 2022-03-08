import axios from 'axios';
import { apiPath } from '../../environments/ApiPath';
import { ApiService } from '../ApiService';



export class PVLocationService {
    _apiService = new ApiService();
    

    getFeederInfo(id) {
        return this._apiService.get(apiPath.API_BASE_PATH+"/pvLocation/feederInfo?id="+id).then(res => res);
    }

    getFeederAnnualLoadChart(id) {
        return this._apiService.get(apiPath.API_BASE_PATH+"/pvLocation/annualLoadChart?id="+id).then(res => res);
    }


}