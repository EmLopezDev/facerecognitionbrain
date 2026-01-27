import "./RecognitionImg.css";
import { type OutlineType } from "../../App";

type RecognitionImgType = {
    imgSrc: string;
    outline: OutlineType | null;
};

function RecognitionImg({ imgSrc = "", outline }: RecognitionImgType) {
    const { leftCol, topRow, rightCol, bottomRow } = outline ?? {};
    return (
        imgSrc && (
            <div className="recognitionImgContainer">
                <div className="recognitionImg">
                    <img
                        id="recognitionImg"
                        src={imgSrc}
                        alt=""
                    />
                    <div
                        className="recognitionImgOutline"
                        style={{
                            top: topRow,
                            right: rightCol,
                            bottom: bottomRow,
                            left: leftCol,
                        }}
                    ></div>
                </div>
            </div>
        )
    );
}

export default RecognitionImg;
