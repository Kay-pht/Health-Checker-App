import React from "react";

interface TopBarProps {
  percent: number;
}

const TopBar: React.FC<TopBarProps> = ({ percent }) => {
  return (
    <div
      id="progress-wrapper"
      className="progress-wrapper"
      style={{
        lineHeight: "28px",
        fontSize: "18px",
        fontWeight: "440",
        textDecoration: "none solid rgb(52,60,75)",
        display: "flex",
        zIndex: "4",
        transition: "all",
        width: "95%",
        marginBottom: "10px",
      }}
    >
      <div
        className="percentage"
        style={{
          fontSize: "18px",
          textDecoration: "none solid rgb(120,127,141)",
          textAlign: "end",
          display: "block",
          boxSizing: "border-box",
          minWidth: "auto",
          minHeight: "auto",
          transition: "all",
          color: "#787F8D",
        }}
      >
        {percent}%
      </div>
      <div
        className="progress-bar"
        style={{
          backgroundColor: "#DDDDDD",
          textDecoration: "none solid rgb(52,60,75)",
          height: "5px",
          width: "100%",
          transition: "width 0.3s ease-in-out",
          position: "relative",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          margin: "12px 0 0 3px",
        }}
      >
        <div
          className="filler bg-blue-500"
          style={{
            width: `${percent}%`,
            position: "absolute",
            height: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TopBar;
