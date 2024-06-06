import { BsLaptop, BsPhone, BsFilter } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { AiOutlineCar } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { filterCategory } from "../store/slices/cartSlice";
import { CiSearch } from "react-icons/ci";

const SideBar = ({ handleSearch }: { handleSearch: (value: any) => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="w-1/3">
      <div className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="rtl:left-auto rtl:right-0 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="bg-white border border-gray-300 rounded-md py-2 ps-5 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search Products"
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-start max-[676px]:invisible font-['Cairo'] text-medium">
        <aside className="w-52 mt-6">
          <div className="px-0 py-6 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => dispatch(filterCategory("all"))}
                  className="flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BsFilter size={24} />
                  <span className="ml-2">{t("All Products")}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(filterCategory("electronics"))}
                  type="button"
                  className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <BsLaptop size={19} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {t("electronics")}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(filterCategory("jewelery"))}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <GiClothes size={23} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {t("jewelery")}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(filterCategory("men's clothing"))}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BsPhone size={19} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {t("men's clothing")}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(filterCategory("women's clothing"))}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                >
                  <AiOutlineCar size={21} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {t("women's clothing")}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
