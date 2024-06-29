import React, { useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';

const RGraph = () => {
  const [showGraph, setShowGraph] = useState(false);

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  return (
    <div className="RGraph">
      <header className="RGraph-header">
        <h1>Reporting Dashboard</h1>
        <nav>
          <ul>
            <li><button onClick={handleShowGraph}>Show Graph Report</button></li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
      </header>
      <main className="RGraph-main">
        {showGraph && (
          <>
            <BarChart />
            <PieChart />
          </>
        )}
      </main>
    </div>
  );
};

export default RGraph;
