import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
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
  const mobileChartRef = useRef(null);

  const handlePriceChange = (vegetable, value) => {
    setPrices((prev) => ({
      ...prev,
      [vegetable]: value,
    }));
  };

  const downloadChart = async () => {
    if (!mobileChartRef.current) return;

    try {
      setIsDownloading(true);

      // Hide the preview chart and show the mobile version temporarily
      if (chartRef.current) chartRef.current.style.display = "none";
      mobileChartRef.current.style.display = "block";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(mobileChartRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#22c55e",
        width: 400, // Mobile-optimized width
        height: 800, // Mobile-optimized height
        logging: true,
      });

      // Restore display states
      if (chartRef.current) chartRef.current.style.display = "block";
      mobileChartRef.current.style.display = "none";

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
    <div className="app-container">
      {/* Form Section */}
      <div className="form-section">
        <h2 className="form-title">Update Prices</h2>
        <div className="price-form">
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

      {/* Preview Chart */}
      <div ref={chartRef} className="chart-container">
        <div className="chart-header">
          <h1 className="chart-title">VEGGIEMART</h1>
          <h2 className="chart-subtitle">Today's Rate Chart</h2>
        </div>

        <div className="price-chart">
          {vegetables.map((veg) => (
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

      {/* Hidden Mobile-Optimized Chart for Download */}
      <div ref={mobileChartRef} className="mobile-chart-container">
        <div className="chart-header">
          <h1 className="chart-title">VEGGIEMART</h1>
          <h2 className="chart-subtitle">Today's Rate Chart</h2>
        </div>

        <div className="price-chart">
          {vegetables.map((veg) => (
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
