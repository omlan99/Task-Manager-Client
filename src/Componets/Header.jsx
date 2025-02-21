import React from "react";
import Todo from "./Todo";

const Header = () => {
  return (
    <div className="grid  lg:grid-cols-3 gap-5 px-5">
      <div className="flex flex-col space-y-4 overflow-auto items-start">
        <h2 className="text-center font-bold">to Do</h2>
        <Todo></Todo>
      </div>
      <div className="flex flex-col space-y-4 overflow-auto items-start">
        <h2 className="text-center font-bold">In Progress</h2>
        <Todo></Todo>
      </div>
      <div className="flex flex-col space-y-4 overflow-auto items-start">
        <h2 className="text-center font-bold">Done</h2>
        <Todo></Todo>
      </div>
    </div>
  );
};

export default Header;
