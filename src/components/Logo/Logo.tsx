import "./Logo.css";
import brain from "../../assets/icons8-brain-100.png";
import Tilt from "react-parallax-tilt";

function Logo() {
    return (
        <Tilt
            tiltMaxAngleX={30}
            tiltMaxAngleY={30}
            className="logoContainer"
        >
            <img
                src={brain}
                alt="brain logo"
            />
        </Tilt>
    );
}

export default Logo;
