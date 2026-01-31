import "./Rank.css";

type RankType = {
    userName: string;
    userEntries: number;
};

function Rank({ userName, userEntries }: RankType) {
    return (
        <div className="rankContainer">
            <p className="rankContent">{`${userName} 's current rank is...`}</p>
            <span className="rankNumber">{userEntries}</span>
        </div>
    );
}

export default Rank;
