import { useDispatch } from "react-redux";
import { ProductType } from "../types/Product";
import { CiHeart, CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../store/slices/cartSlice";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

interface Props {
  product: ProductType;
  showProductCard: any;
}

const SingleProduct = ({ product, showProductCard }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="relative p-5 shadow hover:shadow-xl rounded-md">
      <div onClick={() => showProductCard(product)}>
        <button className="absolute z-10 top-2 right-2 bg-white rounded-3xl">
          <CiHeart className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />
        </button>
        <div className="w-full min-h-60 bg-gray-200 aspect-w-3 aspect-h-4 rounded-md overflow-hidden lg:h-60">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-center object-fill lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <h3
            className="text-sm text-gray-700 text-ellipsis truncate"
            title={product?.title}
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {product?.title}
          </h3>

          <p className="mt-1 flex gap-1 items-center text-sm text-gray-500">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Fragment key={rating}>
                {Math.floor(product?.rating?.rate) > rating ? (
                  <FaStar
                    key={rating + product?.rating?.rate}
                    className="h-5 w-5 flex-shrink-0 text-yellow-300"
                    aria-hidden="true"
                  />
                ) : (
                  <CiStar
                    key={rating + product?.rating?.rate}
                    className="h-4 w-4 flex-shrink-0 text-yellow-300"
                    aria-hidden="true"
                  />
                )}
              </Fragment>
            ))}
            {product?.rating?.count}
          </p>
          <p className="text-sm mt-[5px] font-medium text-gray-900">
            {product?.price} {t("MAD")}
          </p>
          <p className="mt-1 text-sm text-green-600">
            {product?.category?.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="relative w-full">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full mt-5 flex items-center justify-center bg-blue-600 sm:text-sm md:py-2 md:px-1 sm:py-2 sm:px-4 min-[319px]:py-1 text-xs min[580px]:text-xs px-2 max-[700px]:py-1 text-white transition hover:bg-blue-700 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          {t("addToCart")}
        </button>
        <ToastContainer position={"top-right"} autoClose={1000} />
      </div>
    </div>
  );
};

export default SingleProduct;
