import React from "react";

interface SidebarProps {
  imageUrl: string;
  title: string;
  author: string;
  description: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  imageUrl,
  title,
  author,
  description,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <img src={imageUrl} alt={title} className="sidebar-image" />
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar-section">
        <h2 className="sidebar-title">{title}</h2>
        <p className="sidebar-author">by {author}</p>
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar-section">
        <h3 className="sidebar-description-title">Description:</h3>
        <p className="sidebar-description">{description}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
