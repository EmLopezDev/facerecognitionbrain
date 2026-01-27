import "./RecognitionImg.css";

type RecognitionImgType = {
    imgSrc: string;
};

function RecognitionImg({ imgSrc = "" }: RecognitionImgType) {
    return (
        imgSrc && (
            <div className="recognitionImgContainer">
                <img
                    src={imgSrc}
                    alt=""
                />
            </div>
        )
    );
}

export default RecognitionImg;
