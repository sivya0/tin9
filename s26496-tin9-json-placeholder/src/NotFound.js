import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 3000);
    })

    return ( 
        <>
        <h2>Sorry</h2>
        <p>This page cannot be found. Redirecting to Homepage...</p>
        </>
     );
}
 
export default NotFound;