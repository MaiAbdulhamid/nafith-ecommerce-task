import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SideBar from "../components/SideBar";
import AnimatePage from "../components/animation/AnimatePage";
import {
  fetchProducts,
  filterCategory,
  productDetail,
  sortProducts,
} from "../store/slices/cartSlice";
import { ProductType } from "../types/Product";
import "../assets/css/Header.css";
import Loader from "../components/Loader";
import SortOptions from "../components/SortOptions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import SingleProduct from "../components/SingleProduct";
import Pagination from "../components/ProductsPagination";

const PRODUCTS_PER_PAGE = 6;

export default function Home() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const product = useSelector((state: any) => state.allCart.product);
  const loading = useSelector((state: any) => state.allCart.loading);
  const error = useSelector((state: any) => state.allCart.error);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch fetchProducts thunk
  }, [dispatch]);

  const { t } = useTranslation();

  const navigate = useNavigate();

  /* function for button show Details product */
  const showProductCard = (item: ProductType) => {
    dispatch(productDetail(item));
    navigate(`/productDetails`);
  };

  /* function filter data searching */
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    dispatch(filterCategory(value));
  };

  /* function handleSort */
  const handleSort = (sort: "rating" | "price_low_high" | "price_high_low") => {
    dispatch(sortProducts(sort));
  };

  /* Calculate Total Pages number */
  const calculateTotalPages = () => {
    return Math.ceil(product.length / PRODUCTS_PER_PAGE);
  };

  /* Get current products based on pagination */
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return product.slice(startIndex, endIndex);
  };

  const handleSearch = (value: any) => {
    console.log(value);
    dispatch(sortProducts({ q: value }));
  };

  return (
    <>
      <AnimatePage>
        <section className="container bg-white py-10 text-gray-700 sm:py-16 lg:py-8 font-['Cairo'] ">
          <div className="mx-auto max-w-screen-xl">
            {/* Sort Options */}
            <div className="relative z-20 flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                {t("newArrivals")} ({product.length})
              </h1>
              <SortOptions handleSort={(sort) => handleSort(sort)} />
            </div>

            {/* form search and category components small screens */}
            <form className="flex justify-center ml-2">
              <select
                defaultValue={"all"}
                id="countries"
                onChange={handleSelectChange}
                className="min-[676px]:hidden bg-gray-50 font-medium border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="all">{t("All Products")}</option>
                <option value="electronics" className="px-2">
                  {t("electronics")}
                </option>
                <option value="jewelery"> {t("jewelery")}</option>
                <option value="men's clothing"> {t("men's clothing")} </option>
                <option value="women's clothing">
                  {t("women's clothing")}
                </option>
              </select>
            </form>

            {/* Side bar for category products */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              <SideBar handleSearch={handleSearch} />

              {/* Show Data Products */}
              <div className="lg:col-span-3">
                <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {loading && <Loader />}
                  {error && (
                    <p>
                      {t("error")}: {error}
                    </p>
                  )}
                  {getCurrentProducts().map((item: ProductType) => (
                    <SingleProduct
                      key={item.id}
                      product={item}
                      showProductCard={showProductCard}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={calculateTotalPages()}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </AnimatePage>
    </>
  );
}
