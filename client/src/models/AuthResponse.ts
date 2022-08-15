import {UserDTO} from "./userDTO";

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: UserDTO
}