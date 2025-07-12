import "../../styles/TrashBinStyles.css";

const TrashBinImage = ({ name, level }) => {
    return (
        <div className="trash-bin">
            <div className={level > 80 ? "fill-overlay" : "fill-overlay-below" } style={{ height: `${level}%` }}></div>
            <img
                src="/empty-trash-can.png"
                alt={`Trash Bin ${name}`}
                className="bin-img"
            />
            <div className="level-label">{level ?? 0}%</div>
            <div className="level-label">{name}</div>
        </div>
    );
};

export default TrashBinImage;

