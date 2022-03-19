import { pagePath } from '../environments/PagePath';
import {ApiService} from './ApiService'

export class OptimizationService {

    _apiService = new ApiService();
   
    getAllOptimization() {
        return this._apiService.get(pagePath.OPTIMIZATION+'/getAllOptimization').then(res => res)
    }
}