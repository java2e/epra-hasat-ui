import { pagePath } from '../../environments/PagePath';
import { ApiService } from '../ApiService';



export class ReactivePowerService {
    _apiService = new ApiService();    

    getFeederInfo(id) {
        return this._apiService.get(pagePath.REACTIVE_POWER+"/feederInfo?id="+id).then(res => res);
    }

    getFeederAnnualLoadChart(id) {
        return this._apiService.get(pagePath.REACTIVE_POWER+"/annualLoadChart?id="+id).then(res => res);
    }


}