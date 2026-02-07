import { useState, type ChangeEvent, type FormEvent } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import InputForm from "./components/InputForm/InputForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import RecognitionImg from "./components/RecognitionImg/RecognitionImg";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

type BoundingBoxType = {
    bottom_row: number;
    left_col: number;
    right_col: number;
    top_row: number;
};

type RegionType = {
    region_info: {
        bounding_box: BoundingBoxType;
    };
};

export type OutlineType = {
    leftCol: number;
    topRow: number;
    rightCol: number;
    bottomRow: number;
};

type RouteType = "signin" | "home" | "register";

export type UserType = {
    id: string;
    name: string;
    email: string;
    entries: number;
};

function App() {
    const [inputImgURL, setInputImgURL] = useState("");
    const [imgRecognition, setImgRecognition] = useState("");
    const [boxOutlines, setBoxOutlines] = useState<OutlineType[]>([]);
    const [route, setRoute] = useState<RouteType>("signin");
    const [user, setUser] = useState<UserType | null>(null);

    const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setInputImgURL(evt.target.value);
    };

    const onCalculateFaceLocation = (boundingBox: BoundingBoxType) => {
        const image = document.getElementById(
            "recognitionImg",
        ) as HTMLImageElement;
        const width = Number(image.width);
        const height = Number(image.height);
        const outline = {
            leftCol: boundingBox.left_col * width,
            topRow: boundingBox.top_row * height,
            rightCol: width - boundingBox.right_col * width,
            bottomRow: height - boundingBox.bottom_row * height,
        };
        return outline;
    };

    const displayFaceOutline = (outline: OutlineType) => {
        setBoxOutlines((prevOutlines) => [...prevOutlines, outline]);
    };

    const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setImgRecognition(inputImgURL);
        setBoxOutlines([]);

        try {
            const response = await fetch(
                "https://smart-brain-api-efly.onrender.com/imageurl",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        url: inputImgURL,
                    }),
                },
            );
            const data = await response.json();
            if (data) {
                fetch("https://smart-brain-api-efly.onrender.com/image", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: user?.id,
                    }),
                })
                    .then((response) => response.json())
                    .then((count) =>
                        setUser((prevUser) => {
                            if (!prevUser) return prevUser;
                            return {
                                ...prevUser,
                                entries: count,
                            };
                        }),
                    )
                    .catch(console.error);
                const regions = data.outputs[0].data.regions;
                regions.forEach(({ region_info }: RegionType) => {
                    const boundingBox = region_info.bounding_box;
                    const outline = onCalculateFaceLocation(boundingBox);
                    displayFaceOutline(outline);
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    };

    const onRouteChange = (route: RouteType) => {
        if (route !== "home") {
            setInputImgURL("");
            setImgRecognition("");
            setBoxOutlines([]);
        }
        setRoute(route);
    };

    const onUserChange = (user: UserType) => {
        setUser(user);
    };

    return (
        <>
            <header className="headerContainer">
                <Logo />
                {route === "home" && <Navigation onSignOut={onRouteChange} />}
            </header>
            <main className="mainContainer">
                {route === "signin" ? (
                    <SignIn
                        onSignIn={onRouteChange}
                        onRegister={onRouteChange}
                        onLoadUser={onUserChange}
                    />
                ) : route === "register" ? (
                    <Register onRegister={onRouteChange} />
                ) : (
                    user && (
                        <>
                            <Rank
                                userName={user?.name}
                                userEntries={user?.entries}
                            />
                            <InputForm
                                onChange={onInputChange}
                                onSubmit={onSubmitForm}
                            />
                            <RecognitionImg
                                outlines={boxOutlines}
                                imgSrc={imgRecognition}
                            />
                        </>
                    )
                )}
            </main>
            <ParticlesBg
                type="cobweb"
                num={300}
                bg
            />
        </>
    );
}

export default App;
