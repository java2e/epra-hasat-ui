import { apiPath } from "../environments/ApiPath";
import axios from "axios";

export class ApiService {

 http = axios.create({
    baseURL: apiPath.API_BASE_PATH,
    headers: {'Authorization': 'Bearer '+localStorage.getItem('accessToken')}
  });
  

  get(url){
    return this.http.get(url).then(res=>res.data)
  }

  post(url,data){
    return this.http.post(url,data).then(res => res.data)
  }
}

