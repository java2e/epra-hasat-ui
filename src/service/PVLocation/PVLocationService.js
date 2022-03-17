import { pagePath } from '../../environments/PagePath';
import { ApiService } from '../ApiService';



export class PVLocationService {
    _apiService = new ApiService();
    

    getFeederInfo(id) {
        return this._apiService.get(pagePath.PV_LOCATION+"/feederInfo?id="+id).then(res => res);
    }

    getFeederAnnualLoadChart(id) {
        return this._apiService.get(pagePath.PV_LOCATION+"/annualLoadChart?id="+id).then(res => res);
    }


}