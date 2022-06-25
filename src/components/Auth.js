import { useMyContext } from "../Context";
import { Login } from './Login';
import { Dashboard } from './Dashboard';

export function Auth (props) {
    const {cart, logged, token} = useMyContext();
    const [getLoggedIn, setLoggedIn] = logged;
    
    return (
        <div>
            {getLoggedIn ? <Dashboard/> : <Login/>}
        </div>
    )
} 