import React, { useState, useEffect, useMemo, useRef } from 'react';
import "./ExpenseTrackerSpinner.css"
const ExpenseTrackerSpinner = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  
  // Generate floating coins configuration
  const floatingCoins = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 10 + Math.random() * 20,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
  }, []);

  // Loading progress simulation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => prev + 2);
    }, 200);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Clear interval when progress exceeds 100
  useEffect(() => {
    if (progress > 100) {
      clearInterval(intervalRef.current);
    }
  }, [progress]);

  const loadingText = progress <= 100 
    ? `Loading expenses... ${progress}%` 
    : 'Loading...';

  return (
    <>
    <div className="Main-loadingPage-Container">
      <div className="floating-coins">
        {floatingCoins.map(coin => (
          <div
            key={coin.id}
            className="floating-coin"
            style={{
              left: `${coin.left}%`,
              top: `${coin.top}%`,
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              animation: `float ${coin.duration}s ease-in-out ${coin.delay}s infinite`
            }}
          />
        ))}
      </div>
      
      <div className="spinner-container">
        <h1 className="spinner-title">Expense Tracker</h1>
        
        <div className="spinner">
          <div className="coin-track"></div>
          <div className="coin">₹</div>
          <div className="coin">₹</div>
          <div className="coin">₹</div>
          <div className="coin">₹</div>
          
          <div className="receipt">
            <div className="receipt-line"></div>
            <div className="receipt-line"></div>
            <div className="receipt-line"></div>
            <div className="receipt-line"></div>
          </div>
        </div>
        
        <div className="loading-text">{loadingText}</div>
      </div>
      </div>
    </>
  );
};

export default ExpenseTrackerSpinner;