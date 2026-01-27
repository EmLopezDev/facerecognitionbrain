import "./RecognitionImg.css";
import { type OutlineType } from "../../App";

type RecognitionImgType = {
    imgSrc: string;
    outlines: OutlineType[];
};

function RecognitionImg({ imgSrc = "", outlines }: RecognitionImgType) {
    return (
        imgSrc && (
            <div className="recognitionImgContainer">
                <div className="recognitionImg">
                    <img
                        id="recognitionImg"
                        src={imgSrc}
                        alt=""
                    />
                    {outlines.length &&
                        outlines.map(
                            ({ topRow, rightCol, bottomRow, leftCol }, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="recognitionImgOutline"
                                        style={{
                                            top: topRow,
                                            right: rightCol,
                                            bottom: bottomRow,
                                            left: leftCol,
                                        }}
                                    ></div>
                                );
                            },
                        )}
                </div>
            </div>
        )
    );
}

export default RecognitionImg;
