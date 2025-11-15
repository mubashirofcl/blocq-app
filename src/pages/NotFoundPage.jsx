import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="notfound-container">

            <div className="notfound-box">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-subtitle">Page Not Found</p>

                <p className="notfound-text">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                <Link to="/" className="notfound-btn">
                    Go Back Home
                </Link>
            </div>

        </div>
    );
}
