import instance from "../axios";
import {AxiosResponse} from "axios";
import {UserDTO} from "../models/userDTO";

class UserService {
    static async getUsers(): Promise<AxiosResponse<UserDTO[]>> {
        return instance.get<UserDTO[]>('/api/users')
    }
}

export default UserService
