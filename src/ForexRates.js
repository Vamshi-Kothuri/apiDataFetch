import React, { useState, useEffect } from "react";
// import "./ForexRates.css";
import countryInfo from "./Forex.json";
const time = "1707118908";
const base = "USD";
const ForexRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.forexrateapi.com/v1/latest?api_key=baa8a00303d9541f0f5a695b5cb8bf4c&base=USD&currencies=EUR,INR,JPY"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setRates(data.rates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={`forex-rates-container ${showDetails ? "show-details" : ""}`}
    >
      <h1>Forex Rates API Data</h1>

      <button onClick={handleToggleDetails} className="forex-rates-button">
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      <div className="forex-rates-details">
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <img src={`https://flagcdn.com/us.svg`} width="25" alt="USA" />
          <strong style={{ marginLeft: "10px" }}>Base:</strong> {base}
        </p>
        <ul className="forex-rates-list">
          {Object.entries(rates).map(([currency, rate]) => (
            <li key={currency}>
              {countryInfo.map((country, index) => {
                return (
                  <>
                    {currency === country.currency.code && (
                      <img
                        src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                        width="25"
                        alt={country.name}
                        style={{ marginTop: "35px" }}
                      />
                    )}
                  </>
                );
              })}
              <strong style={{ marginLeft: "10px" }}>{currency}:</strong> {rate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ForexRates;
