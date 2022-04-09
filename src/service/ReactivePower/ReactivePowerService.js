import { pagePath } from '../../environments/PagePath';
import { ApiService } from '../ApiService';



export class ReactivePowerService {
    _apiService = new ApiService();

    getFeederInfo(id) {
        return this._apiService.get(pagePath.REACTIVE_POWER + "/feederInfo?id=" + id).then(res => res);
    }

    getFeederAnnualLoadChart(id) {
        return this._apiService.get(pagePath.REACTIVE_POWER + "/annualLoadChart?id=").then(res => res);
    }
    getVoltageChart(data) {
        return this._apiService.post(pagePath.REACTIVE_POWER+'/getVoltageChart',data ).then(res => res);
    }
    exeucte(data) {
        return this._apiService.post(pagePath.REACTIVE_POWER + "/execute", data).then(res => res);
    }

    getFeederInPvData(id) {
        return this._apiService.get(pagePath.REACTIVE_POWER + '/getFeederInPvData?id='+id).then(res => res);
    }

    getOptimizationProcessList(){
        return this._apiService.get(pagePath.REACTIVE_POWER + "/getOptimizationProcessList").then(res => res);
    }


}