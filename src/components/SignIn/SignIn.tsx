import "./SignIn.css";

type SignInType = {
    onSignIn: (str: "home") => void;
    onRegister: (str: "register") => void;
};

function SignIn({ onSignIn, onRegister }: SignInType) {
    return (
        <form
            className="signInForm"
            noValidate
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                onSignIn("home");
            }}
        >
            <fieldset className="signInFormCredentials">
                <legend className="signInFormLegend">Sign In</legend>
                <div className="signInFormInputContainer">
                    <label
                        className="signInFormLabel"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className="signInFormInput"
                        type="email"
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="signInFormInputContainer">
                    <label
                        className="signInFormLabel"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        className="signInFormInput"
                        type="password"
                        required
                    />
                </div>
            </fieldset>
            <button
                className="signInFormButton"
                type="submit"
            >
                Sign In
            </button>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    onRegister("register");
                }}
                href=""
            >
                Register
            </a>
        </form>
    );
}

export default SignIn;
