import React, { useState } from "react";
import Navbar from "./Component/Navbar";
import "./styles.css";

function CarbonCalculator() {
  // Define states
  const [domesticChoice, setDomesticChoice] = useState("");
  const [electricityData, setElectricityData] = useState({
    kwh: "",
    people: "",
  });
  const [dietChoice, setDietChoice] = useState("");
  const [travel, setTravel] = useState("");
  const [distance, setDistance] = useState("");
  const [emissions, setEmissions] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Example calculation (replace with actual logic)
    let calculatedEmissions = 0;

    if (domesticChoice === "electricity") {
      const { kwh, people } = electricityData;
      calculatedEmissions += kwh * 0.5; // Example calculation
    } else if (domesticChoice === "diet") {
      if (dietChoice === "veg") {
        calculatedEmissions += 200; // Example emissions for vegetarian diet
      } else if (dietChoice === "nonveg") {
        calculatedEmissions += 400; // Example emissions for non-vegetarian diet
      } else if (dietChoice === "vegan") {
        calculatedEmissions += 150; // Example emissions for vegan diet
      }
    }

    if (travel === "petrol_car") {
      calculatedEmissions += distance * 0.2; // Example emissions for petrol car
    } else if (travel === "diesel_car") {
      calculatedEmissions += distance * 0.25; // Example emissions for diesel car
    }

    setEmissions(calculatedEmissions);
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="hero-section">
        <h1>Calculate Your Carbon Footprint</h1>
        <p className="hero-description">
          Track, understand, and reduce your environmental impact with our
          easy-to-use calculator.
        </p>
      </div>

      <div className="calculator-container">
        <div className="calculator-header">
          <span className="calculator-icon">🌍</span>
          <h2>Carbon Calculator</h2>
        </div>

        <form onSubmit={handleSubmit} className="calculator-form">
          {/* Domestic Section */}
          <div className="section domestic-section">
            <h3>Domestic Impact</h3>
            <div className="options-container">
              <button
                type="button"
                className={`option-button ${
                  domesticChoice === "electricity" ? "active" : ""
                }`}
                onClick={() => setDomesticChoice("electricity")}
              >
                ⚡ Electricity
              </button>
              <button
                type="button"
                className={`option-button ${
                  domesticChoice === "diet" ? "active" : ""
                }`}
                onClick={() => setDomesticChoice("diet")}
              >
                🥗 Diet
              </button>
            </div>

            {/* Conditional Inputs for Domestic Choices */}
            {domesticChoice === "electricity" && (
              <div className="domestic-electricity">
                <label>
                  Electricity used (kWh):
                  <input
                    type="number"
                    placeholder="Enter electricity used in kWh"
                    value={electricityData.kwh}
                    onChange={(e) =>
                      setElectricityData({
                        ...electricityData,
                        kwh: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Number of people in the home:
                  <input
                    type="number"
                    placeholder="Enter number of people"
                    value={electricityData.people}
                    onChange={(e) =>
                      setElectricityData({
                        ...electricityData,
                        people: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            )}

            {domesticChoice === "diet" && (
              <div className="domestic-diet">
                <label>
                  <input
                    type="radio"
                    name="diet"
                    value="veg"
                    checked={dietChoice === "veg"}
                    onChange={() => setDietChoice("veg")}
                  />
                  Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="diet"
                    value="nonveg"
                    checked={dietChoice === "nonveg"}
                    onChange={() => setDietChoice("nonveg")}
                  />
                  Non-Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="diet"
                    value="vegan"
                    checked={dietChoice === "vegan"}
                    onChange={() => setDietChoice("vegan")}
                  />
                  Vegan
                </label>
              </div>
            )}
          </div>

          {/* Travel Section */}
          <div className="section travel-section">
            <h3>Travel Impact</h3>
            <div className="travel-inputs">
              <select
                value={travel}
                onChange={(e) => setTravel(e.target.value)}
                className="travel-select"
              >
                <option value="">Select transport mode</option>
                <option value="bike">🚲 Bike</option>
                <option value="petrol_car">🚗 Petrol Car</option>
                <option value="diesel_car">🚙 Diesel Car</option>
                <option value="bus">🚌 Bus</option>
                <option value="metro">🚊 Metro</option>
              </select>

              {travel && (
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="distance-input"
                />
              )}
            </div>
          </div>

          <button type="submit" className="calculate-button">
            Calculate My Footprint
          </button>
        </form>

        {/* Emissions Result */}
        {emissions !== null && (
          <div className="results-section">
            <h3>Your Carbon Footprint</h3>
            <div className="emissions-display">
              <span className="emissions-value">{emissions}</span>
              <span className="emissions-unit">kg CO₂</span>
            </div>
            <div className="offset-actions">
              <button className="offset-button">Offset My Emissions</button>
              <button className="learn-more-button">Learn How to Reduce</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarbonCalculator;
