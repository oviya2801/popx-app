import React from 'react';
import './MobileFrame.css';

const MobileFrame = ({ children }) => (
  <div className="frame-outer">
    <div className="phone">
      <div className="phone-notch">
        <div className="notch-dot" />
        <div className="notch-bar" />
      </div>
      <div className="phone-screen">{children}</div>
      <div className="phone-chin" />
    </div>
  </div>
);

export default MobileFrame;
