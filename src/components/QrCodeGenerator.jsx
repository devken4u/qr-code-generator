import QRCode from "react-qr-code";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function QrCodeGenerator() {
  const [link, setLink] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const QRCodeCapture = useRef(null);

  function generate() {
    if (link.trim() !== "") {
      setQRCodeValue(link);
      setLink("");
    }
  }

  function capture() {
    if (QRCodeCapture.current && qrCodeValue) {
      html2canvas(QRCodeCapture.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "QRCOde.png";
          link.click();
        })
        .catch((err) => {
          console.error("Error capturing the element:", err);
        });
    }
  }

  return (
    <div className="p-2">
      <div className="font-semibold text-5xl text-center">
        QR Code Generator
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <input
          type="text"
          placeholder="Enter your link"
          className="border border-black px-2"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white font-semibold p-1 rounded-md"
          onClick={generate}
        >
          GENERATE
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <div className="border-4 border-black p-4" ref={QRCodeCapture}>
          <QRCode value={qrCodeValue} bgColor={bgColor} fgColor={fgColor} />
        </div>
      </div>
      <div className="flex items-center flex-col gap-2 mt-4">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-2xl" htmlFor="foreground">
            QR Color:
          </label>
          <input
            onChange={(e) => setFgColor(e.target.value)}
            id="foreground"
            type="color"
            value={fgColor}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="font-semibold text-2xl" htmlFor="background">
            Background:
          </label>
          <input
            onChange={(e) => setBgColor(e.target.value)}
            id="background"
            type="color"
            value={bgColor}
          />
        </div>
      </div>
      <button
        className="bg-gray-300 text-center mx-auto block p-2 rounded-md mt-4 font-semibold"
        onClick={capture}
      >
        DOWNLOAD
      </button>
    </div>
  );
}
