import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./VeggieMart.css";
import Logo from "./img/veggie-mart.png";

const vegetables = [
  // First Column
  { name: "Aloo", hindi: "आलू" },
  { name: "Pyaaz", hindi: "प्याज" },
  { name: "Tamatar", hindi: "टमाटर" },
  { name: "Adrak", hindi: "अदरक" },
  { name: "Lasun", hindi: "लहसुन" },
  { name: "Hari Mirch", hindi: "हरी मिर्च" },
  { name: "Bhindi", hindi: "भिंडी" },
  { name: "Patta Gobi", hindi: "पत्ता गोभी" },
  { name: "Phool Gobi", hindi: "फूल गोभी" },
  { name: "Palak", hindi: "पालक" },
].map((item) => ({ ...item, category: "veg1" }));

const vegetables2 = [
  // Second Column
  { name: "Methi", hindi: "मेथी" },
  { name: "Gajar", hindi: "गाजर" },
  { name: "Loki", hindi: "लौकी" },
  { name: "Dhaniya", hindi: "धनिया" },
  { name: "Mirchi", hindi: "मिर्च" },
  { name: "Beans", hindi: "बीन्स" },
  { name: "Karela", hindi: "करेला" },
  { name: "Arbi", hindi: "अरबी" },
  { name: "Matar", hindi: "मटर" },
].map((item) => ({ ...item, category: "veg2" }));

const fruits = [
  { name: "Apple", hindi: "सेब" },
  { name: "Kela", hindi: "केला" },
  { name: "Anaar", hindi: "अनार" },
  { name: "Amruth", hindi: "अमरूद" },
  { name: "Papita", hindi: "पपीता" },
  { name: "Mosambi", hindi: "मौसंबी" },
  { name: "Chiku", hindi: "चीकू" },
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

  return (
    <div className="app-container">
      <h2 className="form-title">VeggieMart Price Chart</h2>
      <div className="price-form">
        {[...vegetables, ...vegetables2, ...fruits].map((item) => (
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
        {/* <div
          className="chart-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            textAlign: "center",
          }}
        >
          <h1
            className="chart-title"
            style={{
              fontSize: "30px",
              color: "#28a745",
              margin: "0",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            <img
              src={Logo}
              alt="VeggieMart Logo"
              style={{
                width: "70px",
                height: "70px",
                marginBottom: "10px",
              }}
            />
          
          </h1>
          <h2
            className="chart-subtitle"
            style={{
              fontSize: "16px",
              color: "#555",
              margin: "10px 0 0 0",
              fontWeight: "500",
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
        </div> */}

        <div
          className="chart-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#ffffff", // Ensure the background contrasts the logo
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h1
            className="chart-title"
            style={{
              margin: "0", // Removes extra margin
            }}
          >
            <img
              src={Logo}
              alt="VeggieMart Logo"
              style={{
                // width: "70px",
                height: "116px;",
              }}
            />
          </h1>
          <h2
            className="chart-subtitle"
            style={{
              fontSize: "16px",
              color: "#555",
              margin: "0",
              marginTop: "10px", // Adds space between image and text
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
                  {prices[veg.name] ? `₹${prices[veg.name]}/-` : ""}
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
                  {prices[veg.name] ? `₹${prices[veg.name]}/-` : ""}
                </span>
              </div>
            ))}
          </div>
          <div className="chart-column">
            <h3 className="column-title">फल / Fruits</h3>
            {fruits.map((fruit) => (
              <div key={fruit.name} className="price-row">
                <span className="item-name">
                  {fruit.hindi} ({fruit.name})
                </span>
                <span className="price">
                  {prices[fruit.name] ? `₹${prices[fruit.name]}/-` : ""}
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
