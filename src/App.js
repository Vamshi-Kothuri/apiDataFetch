import React, { useState, useEffect } from "react";

const time = "1707118908";
const baseCurr = "USD";

const App = () => {
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
  }, []); // Empty dependency array ensures that useEffect runs once after the initial render

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
      style={{
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <h1>Forex Rates</h1>
      <button onClick={handleToggleDetails} style={{ marginBottom: "10px" }}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div>
          <p>Time: {time}</p>
          <p>Base: {baseCurr}</p>
          <ul>
            {Object.entries(rates).map(([currency, rate]) => (
              <li key={currency}>
                {currency}: {rate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
