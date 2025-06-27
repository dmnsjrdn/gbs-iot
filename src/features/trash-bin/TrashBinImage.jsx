import React, { useEffect, useRef, useState } from "react";
import "../../styles/TrashBinImage.css";

const TrashBinImage = ({ level }) => {
    return (
        <div className="trash-bin">
            <div className="fill-overlay" style={{ height: `${level}%` }}></div>
            <img
                src="/empty-trash-can.png"
                alt="Trash Bin"
                className="bin-img"
            />
            <div className="level-label">{level}%</div>
        </div>
    );
};
// return (
//     <div className="bin-wrapper">
//         {/* Fill overlay */}
//         <div
//             className="bin-fill"
//             style={{ height: `${level}%` }}
//         ></div>

//         {/* Trash image mask */}
//         <img
//             src="/empty-trash-can.png"
//             alt="Trash Can"
//             className="bin-image"
//         />

//         {/* Level text */}
//         <div className="bin-label">{level}%</div>
//     </div>
// );

// return (
//     <div className="trash-bin-container">
//         {/* Trash Can Image */}
//         <img src="/empty-trash-can.png" alt="Trash Bin" className="trash-bin-img" />

//         {/* Fill Level Overlay */}
//         <div
//             className="trash-fill"
//             style={{ height: `${level}%` }}
//         ></div>

//         {/* Text Display */}
//         <div className="level-text">{level}%</div>
//     </div>
// );

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const width = canvas.width;
//     const height = canvas.height;

//     // Clear previous drawings
//     ctx.clearRect(0, 0, width, height);

//     // Bin dimensions
//     const binX = 30;
//     const binY = 40;
//     const binWidth = 40;
//     const binHeight = 100;
//     const lidHeight = 12;

//     // === DRAW BIN BODY (rounded) ===
//     const radius = 8;
//     ctx.beginPath();
//     ctx.moveTo(binX + radius, binY);
//     ctx.lineTo(binX + binWidth - radius, binY);
//     ctx.quadraticCurveTo(binX + binWidth, binY, binX + binWidth, binY + radius);
//     ctx.lineTo(binX + binWidth, binY + binHeight - radius);
//     ctx.quadraticCurveTo(
//         binX + binWidth,
//         binY + binHeight,
//         binX + binWidth - radius,
//         binY + binHeight
//     );
//     ctx.lineTo(binX + radius, binY + binHeight);
//     ctx.quadraticCurveTo(binX, binY + binHeight, binX, binY + binHeight - radius);
//     ctx.lineTo(binX, binY + radius);
//     ctx.quadraticCurveTo(binX, binY, binX + radius, binY);
//     ctx.closePath();

//     // Fill with bin gradient
//     const binGradient = ctx.createLinearGradient(0, binY, 0, binY + binHeight);
//     binGradient.addColorStop(0, "#d3d3d3");
//     binGradient.addColorStop(1, "#a9a9a9");
//     ctx.fillStyle = binGradient;
//     ctx.fill();

//     ctx.strokeStyle = "#555";
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     // === DRAW BIN LID (angled with depth) ===
//     ctx.beginPath();
//     ctx.moveTo(binX - 5, binY);
//     ctx.lineTo(binX + binWidth + 5, binY);
//     ctx.lineTo(binX + binWidth, binY - lidHeight);
//     ctx.lineTo(binX, binY - lidHeight);
//     ctx.closePath();

//     const lidGradient = ctx.createLinearGradient(0, binY - lidHeight, 0, binY);
//     lidGradient.addColorStop(0, "#666");
//     lidGradient.addColorStop(1, "#999");
//     ctx.fillStyle = lidGradient;
//     ctx.fill();
//     ctx.stroke();

//     // === DRAW FILL LEVEL (with trash gradient) ===
//     const fillHeight = (level / 100) * binHeight;
//     const fillY = binY + binHeight - fillHeight;

//     const fillGradient = ctx.createLinearGradient(0, fillY, 0, binY + binHeight);
//     fillGradient.addColorStop(0, "#4caf50"); // green top
//     fillGradient.addColorStop(1, "#2e7d32"); // darker green bottom

//     ctx.fillStyle = fillGradient;
//     ctx.fillRect(binX, fillY, binWidth, fillHeight);

//     // === DRAW SHADOW ===
//     ctx.shadowColor = "rgba(0,0,0,0.3)";
//     ctx.shadowBlur = 4;
//     ctx.shadowOffsetX = 2;
//     ctx.shadowOffsetY = 2;

//     // === DRAW LEVEL TEXT ===
//     ctx.shadowColor = "transparent"; // Disable shadow for text
//     ctx.fillStyle = "#222";
//     ctx.font = "bold 14px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText(`${level}%`, binX + binWidth / 2, binY + binHeight + 20);
// }, [level]);

// return <canvas ref={canvasRef} width={120} height={180} />;
// };

// const CanvasTrashBin = ({ level }) => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         const width = canvas.width;
//         const height = canvas.height;

//         // Clear canvas
//         ctx.clearRect(0, 0, width, height);

//         // Define bin dimensions
//         const binX = 30;
//         const binY = 40;
//         const binWidth = 40;
//         const binHeight = 80;

//         // === DRAW TRASH BIN BODY ===
//         ctx.fillStyle = "#ccc";
//         ctx.strokeStyle = "#444";
//         ctx.lineWidth = 2;
//         ctx.strokeRect(binX, binY, binWidth, binHeight); // outer bin border

//         // === DRAW BIN LID ===
//         ctx.beginPath();
//         ctx.moveTo(binX - 5, binY);
//         ctx.lineTo(binX + binWidth + 5, binY);
//         ctx.lineTo(binX + binWidth, binY - 10);
//         ctx.lineTo(binX, binY - 10);
//         ctx.closePath();
//         ctx.fillStyle = "#888";
//         ctx.fill();
//         ctx.stroke();

//         // === DRAW BIN BASE ===
//         ctx.beginPath();
//         ctx.moveTo(binX, binY + binHeight);
//         ctx.lineTo(binX + binWidth, binY + binHeight);
//         ctx.lineWidth = 3;
//         ctx.strokeStyle = "#333";
//         ctx.stroke();

//         // === DRAW FILL LEVEL ===
//         const fillHeight = (level / 100) * binHeight;
//         ctx.fillStyle = "green";
//         ctx.fillRect(binX, binY + binHeight - fillHeight, binWidth, fillHeight);

//         // === DRAW LEVEL TEXT ===
//         ctx.fillStyle = "#000";
//         ctx.font = "14px Arial";
//         ctx.textAlign = "center";
//         ctx.fillText(`${level}%`, binX + binWidth / 2, binY + binHeight + 20);
//     }, [level]);

//     return <canvas ref={canvasRef} width={100} height={160} />;
// };

// const CanvasTrashBin = ({ level }) => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         // Clear previous drawing
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Draw trash bin outline
//         ctx.strokeStyle = "#000";
//         ctx.strokeRect(20, 10, 60, 100); // x, y, width, height

//         // Draw trash level
//         const fillHeight = (level / 100) * 100;
//         ctx.fillStyle = "green";
//         ctx.fillRect(20, 110 - fillHeight, 60, fillHeight); // x, y, width, height

//         // Draw level text
//         ctx.fillStyle = "#000";
//         ctx.font = "14px Arial";
//         ctx.fillText(`${level}%`, 35, 130);
//     }, [level]);

//     return <canvas ref={canvasRef} width={100} height={150} />;
// }

export default TrashBinImage;

