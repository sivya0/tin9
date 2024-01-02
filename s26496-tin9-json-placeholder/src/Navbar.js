import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">Homepage</Link>
                <Link to="/add">Create new post</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;