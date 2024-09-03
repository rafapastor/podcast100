import React from "react";
import "../styles/header.scss";

interface HeaderProps {
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoading }) => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="header-logo">
          <p>Podcaster</p>
        </a>
        {isLoading && <div className="loader"></div>}
      </div>
    </header>
  );
};

export default Header;
