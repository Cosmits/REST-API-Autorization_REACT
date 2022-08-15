import {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder='Email'/>
            <input
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder='Password'/>
            <p>
                <button onClick={() => store.login(email, password)}>
                    Login
                </button>
                <button onClick={() => store.registration(email, password)}>
                    Register
                </button>
            </p>
        </div>
    )
}

export default observer(LoginForm)