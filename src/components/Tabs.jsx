import React from "react";
import "./Tabs.css";

function Tabs({ activeTab, onTabChange }) {
  const tabs = [
    { label: "All", value: "all" },
    { label: "🛒 Shopping", value: "Shopping" },
    { label: "📋 Mission", value: "mission" },
    { label: "💡 Other", value: "other" },
    { label: "✅ Completed!!", value: "done" },
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab-button ${activeTab === tab.value ? "active" : ""}`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
