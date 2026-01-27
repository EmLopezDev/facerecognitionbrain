import { useState, type ChangeEvent, type FormEvent } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import InputForm from "./components/Input/InputForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import RecognitionImg from "./components/RecognitionImg/RecognitionImg";
import "./App.css";

type BoundingBoxType = {
    bottom_row: number;
    left_col: number;
    right_col: number;
    top_row: number;
};

export type OutlineType = {
    leftCol: number;
    topRow: number;
    rightCol: number;
    bottomRow: number;
};

function App() {
    const [inputImgURL, setInputImgURL] = useState("");
    const [imgRecognition, setImgRecognition] = useState("");
    const [boxOutline, setBoxOutline] = useState<OutlineType | null>(null);

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
        setBoxOutline(outline);
    };

    const createJSONRequestOptions = (imgURL: string) => {
        const PAT = "445fda128afe40798280415405dcbef1";
        const USER_ID = "em-lopez-dev";
        const APP_ID = "smart-brain";
        const MODEL_ID = "face-detection";
        const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

        const raw = JSON.stringify({
            user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
            },
            inputs: [
                {
                    data: {
                        image: {
                            url: imgURL,
                        },
                    },
                },
            ],
        });

        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Key " + PAT,
            },
            body: raw,
        };
        return { MODEL_ID, MODEL_VERSION_ID, requestOptions };
    };

    const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setImgRecognition(inputImgURL);

        const { MODEL_ID, MODEL_VERSION_ID, requestOptions } =
            createJSONRequestOptions(inputImgURL);

        try {
            const response = await fetch(
                `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
                requestOptions,
            );
            const data = await response.json();
            const regions = data.outputs[0].data.regions;
            regions.forEach((region) => {
                const boundingBox = region.region_info.bounding_box;
                // const topRow = boundingBox.top_row.toFixed(3);
                // const leftCol = boundingBox.left_col.toFixed(3);
                // const bottomRow = boundingBox.bottom_row.toFixed(3);
                // const rightCol = boundingBox.right_col.toFixed(3);
                const outline = onCalculateFaceLocation(boundingBox);
                displayFaceOutline(outline);
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <header className="headerContainer">
                <Logo />
                <Navigation />
            </header>
            <main className="mainContainer">
                <Rank />
                <InputForm
                    onChange={onInputChange}
                    onSubmit={onSubmitForm}
                />
                <RecognitionImg
                    outline={boxOutline}
                    imgSrc={imgRecognition}
                />
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
