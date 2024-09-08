import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
} from "react-icons/bs";
import { MdOutlineAdminPanelSettings, MdOutlineGames, MdArticle } from "react-icons/md";

function Sidebar({ openSidebarToggle }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get the JWT token from cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    
    if (token) {
      const jwtToken = token.split('=')[1]; // Extract the token value
      try {
        const decodedToken = jwtDecode(jwtToken);
        setIsAdmin(decodedToken.admin); // Check if admin is true
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>

        {/* Conditionally render Moderators menu based on isAdmin state */}
        {isAdmin && (
          <li className="sidebar-list-item">
            <a href="/moderators">
              <MdOutlineAdminPanelSettings className="icon" /> Moderators
            </a>
          </li>
        )}

        <li className="sidebar-list-item">
          <a href="/manage-users">
            <BsPeopleFill className="icon" /> Users
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/addgames">
            <MdOutlineGames className="icon" /> Games
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/add-articles">
            <MdArticle className="icon" /> Articles
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
