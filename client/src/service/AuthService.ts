import instanceAxios from "../axios";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/AuthResponse";

class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        // await instanceAxios.options(BASE_URL + '/api/login', myAxiosConfig)
        return instanceAxios.post<AuthResponse>('/api/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return instanceAxios.post<AuthResponse>('/api/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return instanceAxios.post('/api/logout')
    }

}

export default AuthService