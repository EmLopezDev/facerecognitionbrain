import { useState, type ChangeEvent } from "react";
import "./Register.css";

type RegisterType = {
    onRegister: (str: "signin") => void;
};

function Register({ onRegister }: RegisterType) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setName(evt.target.value);
    };

    const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setEmail(evt.target.value);
    };

    const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value);
    };

    const onSubmit = () => {
        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.id) {
                    onRegister("signin");
                }
            })
            .catch(console.error);
    };

    return (
        <form
            className="registerForm"
            noValidate
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
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
                        onChange={onNameChange}
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
                        onChange={onEmailChange}
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
                        onChange={onPasswordChange}
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
