import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 

const MenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const menuItems = [
    { path: "docs", label: "docs" },
    { path: "features", label: "features" },
    { path: "scalability", label: "scalability" },
    { path: "live-demo", label: "Watch demo" } // Clean URL slug
  ];

  return (
    <div className="flex flex-col gap-5 w-full px-8">
      {menuItems.map((item) => {
        const active = location.pathname === `/page/${item.path}`;

        return (
          <button
            key={item.path}
            onClick={() => navigate(`/page/${item.path}`)}
            className={`
              group relative text-left capitalize
              text-3xl font-semibold py-4 px-5 rounded-2xl
              transition-all duration-300
              ${active
                ? "bg-purple-700/15 text-purple-500 border border-purple-700/30"
                : "text-white hover:bg-app-text/5"
              }
            `}
          >
            <span className="relative z-10">
              {item.label}
            </span>

            <div
              className={`
                absolute left-0 top-0 h-full w-1 rounded-full bg-purple-700 transition-all
                ${active ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default MenuPage;
