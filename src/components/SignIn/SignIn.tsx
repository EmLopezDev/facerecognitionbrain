import { useState, type ChangeEvent } from "react";
import { type UserType } from "../../App";
import "./SignIn.css";

type SignInType = {
    onSignIn: (str: "home") => void;
    onRegister: (str: "register") => void;
    onLoadUser: (user: UserType) => void;
};

function SignIn({ onSignIn, onRegister, onLoadUser }: SignInType) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setEmail(evt.target.value);
    };

    const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value);
    };

    const onSubmit = () => {
        fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.id) {
                    onLoadUser(user);
                    onSignIn("home");
                }
            });
    };

    return (
        <form
            className="signInForm"
            noValidate
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
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
                        onChange={onEmailChange}
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
                        onChange={onPasswordChange}
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
