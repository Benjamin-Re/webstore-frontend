import { useMyContext } from "../Context";
import { Login } from './Login';
import { Dashboard } from './Dashboard/Dashboard.js';

export function Auth (props) {
    const {cart, logged, token} = useMyContext();
    const [getLoggedIn, setLoggedIn] = logged;
    
    return (
        <>
            {getLoggedIn ? <Dashboard/> : <Login/>}
        </>
    )
} 