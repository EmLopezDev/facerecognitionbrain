import { useState, type ChangeEvent, type FormEvent } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import InputForm from "./components/Input/InputForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import RecognitionImg from "./components/RecognitionImg/RecognitionImg";
import "./App.css";

function App() {
    const [inputImgURL, setInputImgURL] = useState("");
    const [imgRecognition, setImgRecognition] = useState("");

    const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setInputImgURL(evt.target.value);
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
                // Accessing and rounding the bounding box values
                const boundingBox = region.region_info.bounding_box;
                const topRow = boundingBox.top_row.toFixed(3);
                const leftCol = boundingBox.left_col.toFixed(3);
                const bottomRow = boundingBox.bottom_row.toFixed(3);
                const rightCol = boundingBox.right_col.toFixed(3);

                region.data.concepts.forEach((concept) => {
                    // Accessing and rounding the concept value
                    const name = concept.name;
                    const value = concept.value.toFixed(4);

                    console.log(
                        `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`,
                    );
                });
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
                {imgRecognition && <RecognitionImg imgSrc={imgRecognition} />}
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
