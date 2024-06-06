import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PageNotFount = () => {
  const { t } = useTranslation();
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600 text-blue-700">
            <span className="sr-only text-gray-600">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-gray-800">
            {t("pageNotFound")}
          </p>
          <p className="mt-4 mb-8 dark:text-gray-800">
            {t("otherThingsInHomePage")}
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold text-white hover:bg-blue-700 rounded dark:bg-violet-400 dark:text-gray-900 bg-blue-500"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFount;
