import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="container mx-auto px-3">
        <div className="flex justify-between py-3">
          <button onClick={handleOpen} type="button" className="z-10 space-y-2">
            <div
              className={
                isOpen
                  ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45"
                  : "w-8 h-0.5 bg-gray-600"
              }
            />
            <div className={isOpen ? "opacity-0" : "w-8 h-0.5 bg-gray-600"} />
            <div
              className={
                isOpen
                  ? "w-8 h-0.5 bg-gray-600 -rotate-45"
                  : "w-8 h-0.5 bg-gray-600"
              }
            />
          </button>

          <nav
            className={
              isOpen
                ? "text-left fixed bg-slate-50 right-0 top-0 w-10/12 h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300"
                : "fixed right-[-100%] ease-linear duration-300"
            }
          >
            <ul className="mt-6">
              <li>aaa</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
