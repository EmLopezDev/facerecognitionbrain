import "./Navigation.css";

type NavigationType = {
    onSignOut: (str: "signin") => void;
};

function Navigation({ onSignOut }: NavigationType) {
    return (
        <nav className="navigationContent">
            <a
                onClick={(e) => {
                    e.preventDefault();
                    onSignOut("signin");
                }}
                href=""
            >
                Sign out
            </a>
        </nav>
    );
}

export default Navigation;
