import "./App.css";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function App() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = () => {
    setQrCode(text);
  };

  const downloadQRCode = () => {
    const svg = document.querySelector(".qrdesign");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const scaleFactor = 16; // Increase this value for higher quality
      const borderSize = 16; // Size of the border
      canvas.width = img.width * scaleFactor + borderSize * 2;
      canvas.height = img.height * scaleFactor + borderSize * 2;
      ctx.fillStyle = "#fff"; // Border color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, borderSize / scaleFactor, borderSize / scaleFactor);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="App">
      <h1 className="title">QR Generator</h1>
      <input
        type="text"
        value={text}
        className="input"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to generate QR code"
      />
      <button className="button" onClick={generateQRCode}>
        Generate QR Code
      </button>
      <div className="output">
        {qrCode && <QRCodeSVG className="qrdesign" value={qrCode} />}
      </div>
      <button className="button" onClick={downloadQRCode}>
        Download QR Code
      </button>
    </div>
  );
}

export default App;
