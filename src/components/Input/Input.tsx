import "./Input.css";
function Input() {
    return (
        <div className="inputContainer">
            <p className="inputContent">
                This Magic Brain will detect faces in our pictures. Give it a
                try.
            </p>
            <form className="inputForm">
                <input
                    className="input"
                    id="input"
                    type="text"
                />
                <button className="button">Detect</button>
            </form>
        </div>
    );
}

export default Input;
