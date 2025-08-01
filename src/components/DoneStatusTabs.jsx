import React from "react";
import "./Tabs.css";

export default function DoneStatusTabs({ tab, setTab }) {
  return (
    <div className="tabs-container">
      <button
        onClick={() => setTab("all")}
        className={`tab-button ${tab === "all" ? "active" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => setTab("Shopping")}
        className={`tab-button ${tab === "Shopping" ? "active" : ""}`}
      >
        🛒 Shopping
      </button>
      <button
        onClick={() => setTab("mission")}
        className={`tab-button ${tab === "mission" ? "active" : ""}`}
      >
        📋 Mission
      </button>
      <button
        onClick={() => setTab("other")}
        className={`tab-button ${tab === "other" ? "active" : ""}`}
      >
        💡 Other
      </button>
      <button
        onClick={() => setTab("done")}
        className={`tab-button ${tab === "done" ? "active" : ""}`}
      >
        ✅ Completed!!
      </button>
    </div>
  );
}
