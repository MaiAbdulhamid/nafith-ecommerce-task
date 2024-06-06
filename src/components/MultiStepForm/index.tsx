import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, useFormContext } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MultiStepForm = () => {
  const { totalQuantity, totalPrice } = useSelector(
    (state: any) => state.allCart
  );
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: {
      totalQuantity,
      totalPrice,
      fullName: "",
      phone: "",
      city: "",
      address: "",
    },
  });

  const onSubmit = (data: any) => {
    if (step === 1) {
      // Handle submission for Step 1
      console.log("Step 1 Data:", data);
      // Move to Step 2
      setStep(2);
    } else if (step === 2) {
      // Handle submission for Step 2
      console.log("Step 2 Data:", data);
      //Order Logic Goes here
      toast.success("Order made Successfully!");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-600"
          >
            {step === 1 ? t("next") : t("submit")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:ml-8 ml-4 h-6 w-6 transition-all rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </form>
      </FormProvider>
      <ToastContainer />
    </>
  );
};

const StepOne = () => {
  const { totalQuantity, totalPrice } = useSelector(
    (state: any) => state.allCart
  );
  const { t } = useTranslation();
  const { register } = useFormContext();

  return (
    <div className="col-md-4 order-md-2 mb-2">
      <div className="flex justify-between mt-1">
        <label
          htmlFor="totalQuantity"
          className="text-sm text-gray-800 font-semibold "
        >
          {t("totalQ")}
        </label>
        <input
          id="totalQuantity"
          type="number"
          value={totalQuantity}
          {...register("totalQuantity")}
          style={{ width: "3ch" }}
          readOnly
        />
      </div>
      <div className="flex justify-between mt-1">
        <label
          htmlFor="totalPrice"
          className="text-sm text-gray-800 font-semibold"
        >
          {t("total")}
        </label>
        <div>
          <input
            id="totalPrice"
            type="number"
            value={totalPrice}
            {...register("totalPrice")}
            style={{ width: "3ch" }}
            readOnly
          />
          <span>{t("MAD")}</span>
        </div>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="col-md-8 order-md-1">
      <div className="mb-3">
        <div className="flex justify-between mt-1 w-full">
          <label htmlFor="fullName" className="text-left">
            {t("name")}
          </label>
          <div className="input-group mt-2">
            <input
              type="text"
              className={`form-control ${
                errors.fullName
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5"
                  : "text-sm rounded-lg p-2.5"
              }`}
              id="fullName"
              placeholder={t("name")}
              {...register("fullName", {
                required: t("fullNameRequired"),
              })}
            />
          </div>
        </div>
        {errors.fullName && (
          <div className="text-right mt-2 text-sm text-red-600 dark:text-red-500">
            {t("fullNameRequired")}
          </div>
        )}
      </div>
      <div className="mb-3 text-left">
        <div className="flex justify-between mt-1">
          <label htmlFor="phone">{t("phone")}</label>
          <input
            type="tel"
            className={`form-control ${
              errors.phone
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5"
                : "text-sm rounded-lg p-2.5"
            }`}
            id="phone"
            placeholder="+212 6 45 78 956"
            {...register("phone", {
              required: t("phoneInvalid"),
              pattern: /^[0-9+\s()]*$/,
            })}
          />
        </div>
        {errors.phone && (
          <div className="text-right mt-2 text-sm text-red-600 dark:text-red-500">
            {t("phoneInvalid")}
          </div>
        )}
      </div>
      <div className="mb-3 text-left">
        <div className="flex justify-between mt-1">
          <label htmlFor="address">{t("address")}</label>
          <input
            type="text"
            className={`form-control ${
              errors.address
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5"
                : "text-sm rounded-lg p-2.5"
            }`}
            id="address"
            placeholder={t("address")}
            {...register("address", { required: t("addressRequired") })}
          />
        </div>
        {errors.address && (
          <div className="text-right mt-2 text-sm text-red-600 dark:text-red-500">
            {t("addressRequired")}
          </div>
        )}
      </div>
      <div className="mb-3 text-left">
        <div className="flex justify-between mt-1">
          <label htmlFor="city">{t("city")}</label>
          <input
            type="text"
            className="text-sm rounded-lg p-2.5"
            id="city"
            placeholder={t("city")}
            {...register("city")}
          />
        </div>
      </div>
      <hr className="mb-4" />
    </div>
  );
};

export default MultiStepForm;
