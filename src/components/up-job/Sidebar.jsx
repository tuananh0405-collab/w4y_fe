import React from "react";

const Sidebar = ({ menuItems, activeIndex, onSelect }) => {
  return (
    <aside className="bg-white rounded-lg p-4 min-w-[325px] flex flex-col gap-6 mr-5 shadow-2xl">
      <h2 className="text-xl font-bold text-teal-700">Quản lý tuyển dụng</h2>
      <nav className="flex flex-col gap-7">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 p-2 rounded cursor-pointer
              ${activeIndex === index ? "bg-teal-100 font-semibold" : "hover:bg-teal-50"}`}
            onClick={() => onSelect(index)}
          >
            <img src={item.icon} alt="" className="w-6 h-6" />
            <span className="text-lg">{item.text}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
