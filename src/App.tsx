import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Input from "./components/Input/Input";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
    return (
        <>
            <ParticlesBg
                type="cobweb"
                num={300}
                bg
            />
            <header className="headerContainer">
                <Logo />
                <Navigation />
            </header>
            <main className="mainContainer">
                <Rank />
                <Input />
            </main>
        </>
    );
}

export default App;
