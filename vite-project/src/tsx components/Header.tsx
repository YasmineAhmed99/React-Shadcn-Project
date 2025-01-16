
import { Link } from "react-router-dom"

export default function Header() {
    
    
    return (
        <header className="header-options">
            <Link className="option" to="/"> Card Information </Link>
            <Link className="option" to="transactions"> Transactions </Link>
            
        </header>
    )
}