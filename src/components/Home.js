import { Link } from 'react-router-dom';
import css from '../styles/Home.css';

export function Home () {
    return (
        <div className="homeContainer">
            <h2>Home</h2>
            <Link className="bigLink" to="/products">Shop now</Link>
        </div>
    )
}