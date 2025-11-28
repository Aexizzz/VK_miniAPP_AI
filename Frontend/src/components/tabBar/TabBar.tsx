import "./TabBar.css";
import { NavLink } from "react-router-dom"
// Icons
import { Icon24Search } from "@vkontakte/icons"

type Tab = {
  id: number;
  name: string
  label: string;
  icon: React.ReactNode;
};

type TabBarProps = {
  tabs: Tab[];
  showSearch?: boolean;
};

export default function TabBar({ tabs, showSearch}: TabBarProps) {
  return (
    <div className="TabBar">
      <div className="TabBar-Content Blur-Thin Shadow-Regular">
        <div className="Material-Chrome"></div>
        <div className="TabBar-Content-Items">
          {tabs.map((tab) => (
          <NavLink
            to={`/${tab.name}`}
            key={tab.id}
            className="TabBar-Tab"
            style={({ isActive }) =>
              isActive ? {color: "var(--Colors-Blue)",
                background: "var(--Fills_Accent-Primary)",
                mixBlendMode: "normal"}: undefined
            }
          >
            <div className="TabBar-Tab-Icon">{tab.icon}</div>
            <p className="TabBar-Bar-Label ttp-Caption_2-emphaized">
              {tab.label}
            </p>
          </NavLink>
          ))}
        </div>

      </div>


      {showSearch && (
        <button className="TabBar-Tab TabBar-Search Blur-Thin Shadow-Regular">
          <div className="Material-Chrome"></div>
          <Icon24Search/>
        </button>
      )}
    </div>
  );
}
