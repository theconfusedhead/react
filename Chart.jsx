import React, { useState, useRef } from "react";
import html2canvas from "html2canvas"; // Changed to regular import
import "./VeggieMart.css";

const vegetables = [
  { name: "Tomato", hindi: "टमाटर" },
  { name: "Potato", hindi: "आलू" },
  { name: "Onion", hindi: "प्याज" },
  { name: "Lesun (Garlic)", hindi: "लहसुन" },
  { name: "Ginger", hindi: "अदरक" },
  { name: "Green Peas", hindi: "मटर" },
  { name: "Cauliflower", hindi: "फूलगोभी" },
  { name: "Loki (Bottle Gourd)", hindi: "लौकी" },
  { name: "Bhindi (Okra)", hindi: "भिंडी" },
  { name: "Shimla (Capsicum)", hindi: "शिमला मिर्च" },
  { name: "Baigan (Eggplant)", hindi: "बैंगन" },
  { name: "Kheera (Cucumber)", hindi: "खीरा" },
  { name: "Carrot", hindi: "गाजर" },
  { name: "Spinach", hindi: "पालक" },
];

const VeggieMart = () => {
  const [prices, setPrices] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef(null);

  const handlePriceChange = (vegetable, value) => {
    setPrices((prev) => ({
      ...prev,
      [vegetable]: value,
    }));
  };

  const downloadChart = async () => {
    if (!chartRef.current) return;

    try {
      setIsDownloading(true);

      // Add a small delay to ensure styles are fully applied
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(chartRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: "#22c55e",
        logging: true, // For debugging
      });

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `veggie-prices-${
        new Date().toISOString().split("T")[0]
      }.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to download chart. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2 className="form-title">Update Prices</h2>
        <div className="form-grid">
          {vegetables.map((veg) => (
            <div key={veg.name} className="form-row">
              <label className="form-label">{veg.name}:</label>
              <input
                type="number"
                value={prices[veg.name] || ""}
                onChange={(e) => handlePriceChange(veg.name, e.target.value)}
                className="price-input"
                placeholder="₹"
              />
            </div>
          ))}
        </div>
        <button
          onClick={downloadChart}
          className="download-button"
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download Chart"}
        </button>
      </div>

      <div ref={chartRef} className="chart-container">
        <div className="chart-header">
          <h1 className="chart-title">VEGGIEMART</h1>
          <h2 className="chart-subtitle">Today's Rate Chart</h2>
        </div>

        <div className="price-chart">
          {vegetables.map((veg, index) => (
            <div key={veg.name} className="price-row">
              <div className="vegetable-name">
                <span>
                  {veg.name} | {veg.hindi}
                </span>
              </div>
              <div className="vegetable-price">
                {prices[veg.name] ? `₹${prices[veg.name]}` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VeggieMart;
