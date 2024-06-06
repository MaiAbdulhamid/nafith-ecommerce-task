import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCaretDown } from "react-icons/fa";

interface SortOptionsProps {
  handleSort: (value: any) => void;
}

function SortOptions({ handleSort }: SortOptionsProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { label: "Rating", name: "rating", current: false },
    { label: "Price: Low to High", name: "price_low_high", current: false },
    { label: "Price: High to Low", name: "price_high_low", current: false },
    // { label: "DESC", name: "decs", current: false },
    // { label: "ASC", name: "asc", current: false },
  ];

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex items-center relative">
      <button
        onClick={toggleMenu}
        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        {t("sort")}
        <FaCaretDown
          className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="rtl:left-0 rtl:right-auto origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  handleSort(option.name);
                  setIsOpen(false);
                }}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  option.current ? "font-medium text-gray-900" : "text-gray-500"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SortOptions;
