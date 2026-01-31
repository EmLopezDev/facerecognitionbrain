import "./Rank.css";

type RankType = {
    userName: string;
    userEntries: number;
};

function Rank({ userName, userEntries }: RankType) {
    return (
        <div className="rankContainer">
            <p className="rankContent">{`${userName}, your current entry count is...`}</p>
            <span className="rankNumber">{userEntries}</span>
        </div>
    );
}

export default Rank;
