import type { ChangeEvent, FormEvent } from "react";
import "./InputForm.css";

type InputType = {
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
};
function InputForm({ onChange, onSubmit }: InputType) {
    return (
        <div className="inputContainer">
            <p className="inputContent">
                This Magic Brain will detect faces in our pictures. Give it a
                try.
            </p>
            <form
                onSubmit={onSubmit}
                className="inputForm"
            >
                <input
                    className="input"
                    id="input"
                    type="text"
                    onChange={onChange}
                />
                <button
                    type="submit"
                    className="button"
                >
                    Detect
                </button>
            </form>
        </div>
    );
}

export default InputForm;
