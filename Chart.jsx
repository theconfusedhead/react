import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./VeggieMart.css";
import Logo from "./img/veggie-mart.png";

const vegetables = [
  // First Column
  { name: "Aloo", hindi: "आलू", unit: "kg" },
  { name: "Pyaaz", hindi: "प्याज", unit: "kg" },
  { name: "Tamatar", hindi: "टमाटर", unit: "kg" },
  { name: "Adrak", hindi: "अदरक", unit: "kg" },
  { name: "Lasun", hindi: "लहसुन", unit: "kg" },
  { name: "Hari Mirch", hindi: "हरी मिर्च", unit: "kg" },
  { name: "Bhindi", hindi: "भिंडी", unit: "kg" },
  { name: "Patta Gobi", hindi: "पत्ता गोभी", unit: "kg" },
  { name: "Phool Gobi", hindi: "फूल गोभी", unit: "kg" },
  { name: "Palak", hindi: "पालक", unit: "kg" },
].map((item) => ({ ...item, category: "veg1" }));

const vegetables2 = [
  // Second Column
  { name: "Methi", hindi: "मेथी", unit: "kg" },
  { name: "Gajar", hindi: "गाजर", unit: "kg" },
  { name: "Loki", hindi: "लौकी", unit: "kg" },
  { name: "Dhaniya", hindi: "धनिया", unit: "kg" },
  { name: "Mirchi", hindi: "मिर्च", unit: "kg" },
  { name: "Beans", hindi: "बीन्स", unit: "kg" },
  { name: "Karela", hindi: "करेला", unit: "kg" },
  { name: "Arbi", hindi: "अरबी", unit: "kg" },
  { name: "Matar", hindi: "मटर", unit: "kg" },
  { name: "Nimbu", hindi: "नींबू", unit: "piece" },
].map((item) => ({ ...item, category: "veg2" }));

const fruitsAndDairy = [
  { name: "Apple", hindi: "सेब", unit: "kg" },
  { name: "Kela", hindi: "केला", unit: "kg" },
  { name: "Anaar", hindi: "अनार", unit: "kg" },
  { name: "Amruth", hindi: "अमरूद", unit: "kg" },
  { name: "Papita", hindi: "पपीता", unit: "kg" },
  { name: "Mosambi", hindi: "मौसंबी", unit: "kg" },
  { name: "Chiku", hindi: "चीकू", unit: "kg" },
  { name: "Bread", hindi: "ब्रेड", unit: "pack" },
  { name: "Amul Milk", hindi: "अमूल मिल्क", unit: "1 ltr" },
  { name: "Dahi", hindi: "दही", unit: "pack" },
];

const VeggieMart = () => {
  const [prices, setPrices] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef(null);

  const handlePriceChange = (item, value) => {
    setPrices((prev) => ({
      ...prev,
      [item]: value,
    }));
  };

  const downloadChart = async () => {
    if (!chartRef.current) {
      console.error("Chart reference is missing!");
      return;
    }
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(chartRef.current, {
        scale: 3,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `veggie-prices-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.click();
    } catch (error) {
      console.error("Error generating chart image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderPriceWithUnit = (item, price) => {
    if (!price) return "";
    return `₹${price}/${item.unit}`;
  };

  return (
    <div className="app-container">
      <h2 className="form-title">VeggieMart Price Chart</h2>
      <div className="price-form">
        {[...vegetables, ...vegetables2, ...fruitsAndDairy].map((item) => (
          <div key={item.name} className="form-row">
            <label className="form-label">
              {item.hindi} ({item.name}):
            </label>
            <input
              type="number"
              value={prices[item.name] || ""}
              onChange={(e) => handlePriceChange(item.name, e.target.value)}
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

      <div ref={chartRef} className="chart-container">
        <div
          className="chart-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h1
            className="chart-title"
            style={{
              margin: "0",
            }}
          >
            <img
              src={Logo}
              alt="VeggieMart Logo"
              style={{
                height: "116px",
              }}
            />
          </h1>
          <h2
            className="chart-subtitle"
            style={{
              fontSize: "16px",
              color: "#555",
              margin: "0",
              marginTop: "10px",
              fontWeight: "normal",
            }}
          >
            Today's Rate Chart (
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            )
          </h2>
        </div>

        <div className="price-chart">
          <div className="chart-column">
            <h3 className="column-title">सब्जियां / Vegetables</h3>
            {vegetables.map((veg) => (
              <div key={veg.name} className="price-row">
                <span className="item-name">
                  {veg.hindi} ({veg.name})
                </span>
                <span className="price">
                  {renderPriceWithUnit(veg, prices[veg.name])}
                </span>
              </div>
            ))}
          </div>
          <div className="chart-column">
            <h3 className="column-title">सब्जियां / Vegetables</h3>
            {vegetables2.map((veg) => (
              <div key={veg.name} className="price-row">
                <span className="item-name">
                  {veg.hindi} ({veg.name})
                </span>
                <span className="price">
                  {renderPriceWithUnit(veg, prices[veg.name])}
                </span>
              </div>
            ))}
          </div>
          <div className="chart-column">
            <h3 className="column-title" style={{whiteSpace: 'nowrap'}}>फल और डेयरी / Fruits & Dairy</h3>
            {fruitsAndDairy.map((item) => (
              <div key={item.name} className="price-row">
                <span className="item-name">
                  {item.hindi} ({item.name})
                </span>
                <span className="price">
                  {renderPriceWithUnit(item, prices[item.name])}
                </span>
              </div>
            ))}
          </div>
        </div>

        <footer className="footer">
          <div className="contact-info">
            <p className="phone">
              <i className="fas fa-phone"></i> Call for Home Delivery: +91
              9202359595
            </p>
            <div className="social-handles">
              <p
                style={{
                  fontSize: "16px",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                <i
                  className="fab fa-instagram"
                  style={{
                    color: "#E1306C",
                    fontSize: "20px",
                    marginRight: "8px",
                  }}
                ></i>
                <i
                  className="fab fa-facebook"
                  style={{
                    color: "#1877F2",
                    fontSize: "20px",
                    marginRight: "8px",
                  }}
                ></i>
                @veggiemartofficial
              </p>
            </div>
          </div>
          <div className="address">
            Shop Number - 6, Green City Mall, Trilanga Main Rd, near Aura Mall,
            Shahpura, Bhopal, Madhya Pradesh 462039
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VeggieMart;