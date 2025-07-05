import "../../styles/TrashBinStyles.css";

const TrashBinImage = ({ name, level }) => {
    return (
        <div className="trash-bin">
            <div className={level > 80 ? "fill-overlay" : "fill-overlay-below" } style={{ height: `${level}%` }}></div>
            <img
                src="/empty-trash-can.png"
                alt="Trash Bin"
                className="bin-img"
            />
            <div className="level-label">{level}%</div>
            <div className="level-label">{name}</div>
        </div>
    );
};

export default TrashBinImage;

