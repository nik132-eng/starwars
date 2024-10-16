import React, { useState } from "react";
import "./Lightsaber.scss"; // Import the CSS file

const Lightsaber = () => {
  const [color, setColor] = useState("blue");

  // Function to handle color change from buttons
  const changeColor = (newColor: string) => {
    setColor(newColor);
  };

  // Function to handle color input change
  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
        alt="Star Wars Logo"
      />

      <div id="button">
        <button
          className="color"
          id="blue"
          onClick={() => changeColor("blue")}
        />
        <button
          className="color"
          id="red"
          onClick={() => changeColor("red")}
        />
        <button
          className="color"
          id="green"
          onClick={() => changeColor("#00a200")}
        />
        <button
          className="color"
          id="yellow"
          onClick={() => changeColor("#9d9b0a")}
        />
        <button
          className="color"
          id="purple"
          onClick={() => changeColor("#a706ec")}
        />
        <input
          className="color"
          id="color"
          type="color"
          value={color}
          onChange={handleColorInput}
        />
        <label>&lt; CHOOSE</label>
      </div>

      <div id="lightsaber">
        {/* Handle */}
        <div className="h2" style={{ height: "10px", borderRadius: "3px 3px 0 0" }}></div>
        <div
          className="h2"
          style={{
            height: "10px",
            width: "38px",
            boxShadow: "2px 2px 2px black inset, -1px -1px 2px black inset",
          }}
        ></div>
        <div className="h2" style={{ height: "10px", borderRadius: "0" }}></div>
        <div className="h3"></div>
        <div className="h2" style={{ borderRadius: "0px 0 3px 3px" }}></div>
        {[...Array(7)].map((_, i) => (
          <div className="h1" key={i}></div>
        ))}
        <div className="h2" style={{ width: "12px", height: "15px" }}></div>
        <div className="h2" style={{ width: "23px", height: "7px" }}></div>
        <div className="h2" style={{ width: "33px", height: "5px" }}></div>

        {/* Light */}
        <div className="light-container">
          <div className="light" id="light"></div>
          <div className="light2" style={{ boxShadow: `0 0 70px ${color}, 0 0 100px ${color}` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Lightsaber;
