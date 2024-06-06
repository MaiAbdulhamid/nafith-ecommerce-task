import i18n from "../i18n";

const LangSwitcher = () => {
  return (
    <>
      <div className="lang flex text-[15px] font-mono font-semibold text-black float-right mr-10 mt-2">
        <button
          className="hover:underline hover:text-black"
          onClick={() => i18n.changeLanguage("en")}
        >
          English
        </button>
        |
        <button
          className="hover:underline hover:text-black"
          onClick={() => i18n.changeLanguage("ar")}
        >
          Arabic
        </button>
      </div>
    </>
  );
};

export default LangSwitcher;
