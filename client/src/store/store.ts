import {UserDTO} from "../models/userDTO";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import {BASE_URL, myAxiosConfig} from "../axios";
import axios from "axios";
import {AuthResponse} from "../models/AuthResponse";
import UserService from "../service/UserService";

export default class Store {
    user = {} as UserDTO
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(state: boolean) {
        this.isAuth = state
    }

    setUser(user: UserDTO) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {

            // const response = await instanceAxios.post("/api/login", {
            //     email: email,
            //     password: password
            // })

            const response = await AuthService.login(email, password)

            console.log(response)
            localStorage.setItem('AccessToken', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.toJSON())

        }
    }


    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('AccessToken', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.toJSON())
        }
    }


    async logout(): Promise<void> {
        try {
            const response = await AuthService.logout()
            console.log(response, typeof response)
            localStorage.removeItem('AccessToken')
            this.setAuth(false)
            this.setUser({} as UserDTO)
        } catch (e: any) {
            console.log(e.toJSON())
        }
    }


    async checkUserAuthorization(): Promise<void> {
        try {
            console.log(`${BASE_URL}/api/refresh`)
            const response = await axios.get<AuthResponse>(`${BASE_URL}/api/refresh`, myAxiosConfig)
            localStorage.setItem('AccessToken', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            console.log(response);


        } catch (e: any) {
            console.log(e.toJSON())
        }
    }

    async getAllUsers() {
        try {
            return UserService.getUsers()
        } catch (e: any) {
            console.log(e.toJSON())
        }
    }
}