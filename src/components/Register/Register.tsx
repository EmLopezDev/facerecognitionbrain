import "./Register.css";

type RegisterType = {
    onRegister: (str: "signin") => void;
};

function Register({ onRegister }: RegisterType) {
    return (
        <form
            className="registerForm"
            noValidate
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                onRegister("signin");
            }}
        >
            <fieldset className="registerFormCredentials">
                <legend className="registerFormLegend">Register</legend>
                <div className="registerFormInputContainer">
                    <label
                        className="registerFormLabel"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        className="registerFormInput"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="registerFormInputContainer">
                    <label
                        className="registerFormLabel"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className="registerFormInput"
                        type="email"
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="registerFormInputContainer">
                    <label
                        className="registerFormLabel"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        className="registerFormInput"
                        type="password"
                        required
                    />
                </div>
            </fieldset>
            <button
                className="registerFormButton"
                type="submit"
            >
                Submit
            </button>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    onRegister("signin");
                }}
                href=""
            >
                Sign In
            </a>
        </form>
    );
}

export default Register;
