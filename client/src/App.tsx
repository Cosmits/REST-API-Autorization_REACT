import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {UserDTO} from "./models/userDTO";

const App: FC = () => {

    const {store} = useContext(Context)

    const [user, setUsers] = useState<UserDTO[]>([])

    function getUserOnTheForm() {
        // @ts-ignore
        setUsers(store.getAllUsers)
    }

    useEffect(() => {
        if (localStorage.getItem('AccessToken')) {
            // console.log("AccessToken ", localStorage.getItem('AccessToken'))
            store.checkUserAuthorization()
        }
    }, [])

    if (!store.isAuth) {
        return (
            <LoginForm/>
        )
    }

    return (
        <div className="AppClass">
            <h1>{store.isAuth ? `${store.user.email} profile` : `Please Authorization`}</h1>
            <button onClick={() => store.logout()}>
                Logout
            </button>
            <button onClick={() => getUserOnTheForm()}>
                Get all users
            </button>

            {user.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    )
}

export default observer(App)

