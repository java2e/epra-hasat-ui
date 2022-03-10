import axios from 'axios';
import { apiPath } from '../../environments/ApiPath';
import { ApiService } from '../ApiService';



export class ReactivePowerService {

    _apiService = new ApiService();
    

    getFeederInfo(id) {
        return this._apiService.get(apiPath.API_BASE_PATH+apiPath.REACTIVE_POWER+"/feederInfo?id="+id).then(res => res);
    }

    getFeederAnnualLoadChart(id) {
        return this._apiService.get(apiPath.API_BASE_PATH+apiPath.REACTIVE_POWER+"/annualLoadChart?id="+id).then(res => res);
    }


}