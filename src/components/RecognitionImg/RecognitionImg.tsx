import "./RecognitionImg.css";

type RecognitionImgType = {
    imgSrc: string;
};

function RecognitionImg({ imgSrc }: RecognitionImgType) {
    return (
        <div className="recognitionImgContainer">
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt=""
                />
            )}
        </div>
    );
}

export default RecognitionImg;
