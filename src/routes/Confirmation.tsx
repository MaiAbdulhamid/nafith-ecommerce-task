import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/css/Confirmation.css";
import AnimatePage from "../components/animation/AnimatePage";
import {
  decreaseItemQuantity,
  getCartTotal,
  increaseItemQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";
import { ProductType } from "../types/Product";
import MultiStepForm from "../components/MultiStepForm";

const Confirmation = () => {
  const { t } = useTranslation();
  const { cart } = useSelector((state: any) => state.allCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  return (
    <AnimatePage>
      <div className="container p-4 py-12 sm:py-16 lg:py-20 font-['Cairo']">
        <div
          className="rtl:rotate-180 mt-1 ml-4 absolute"
          onClick={() => navigate("/cart")}
        >
          <BsArrowLeft
            size={25}
            className="cursor-pointer hover:text-tb font-semibold"
          />
        </div>
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="row">
            <div className="col-md-4 order-md-2 mb-2">
              <h4 className="d-flex justify-content-between align-items-center mb-2 sm:mt-8 ">
                <span className="text-muted max-[667px]:ml-14 ">
                  {t("products")} :
                </span>
                <span className="badge badge-secondary badge-pill">
                  {cart.length}
                </span>
              </h4>
              {cart?.map((item: ProductType) => (
                <div
                  key={item.id}
                  className="border w-full rounded mt-2 flex p-4 justify-between items-center flex-wrap"
                >
                  <img src={item.image} className="w-12" alt="product_photo" />
                  <div className="w-2/3">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-red-600 text-xs">
                      Sold by <b>Joey Khan</b>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-medium">
                      {item.price}
                      <sup className="text-sm text-blue-400"> {t("MAD")} </sup>
                    </h4>
                  </div>
                  <div className="w-full flex justify-between mt-2">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-700 hover:bg-red-100 px-2"
                    >
                      {t("delete")}
                    </button>

                    <div className="container1 block uppercase tracking-wide text-gray-700 ">
                      <button
                        className="button"
                        onClick={() => dispatch(decreaseItemQuantity(item.id))}
                      >
                        -
                      </button>
                      <div className="count">{item.quantity}</div>
                      <button
                        className="button"
                        onClick={() => dispatch(increaseItemQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
            </div>
            <MultiStepForm />
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default Confirmation;
