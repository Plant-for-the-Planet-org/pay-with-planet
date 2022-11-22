// TODOO - resolve TS warnings related to donations (after donations API is updated to correctly send gift info)
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import PaymentFailedIllustration from "../../../../public/assets/icons/donation/PaymentFailed";
import CloseIcon from "../../../../public/assets/icons/CloseIcon";
import { QueryParamContext } from "../../../Layout/QueryParamContext";
import themeProperties from "../../../../styles/themeProperties";
import { apiRequest } from "src/Utils/api";
import { useRouter } from "next/router";
import { PAYMENT } from "src/Utils/donationStepConstants";
import InfoIcon from "public/assets/icons/InfoIcon";
import RetryIcon from "public/assets/icons/RetryIcon";
import { ContactDetails, FetchedProjectDetails } from "src/Common/Types";
import { Donation } from "src/Common/Types/donation";

interface FailedDonationProps {
  donation: Donation;
  sendToReturn: () => void;
}

function FailedDonation({ sendToReturn, donation }: FailedDonationProps) {
  const { t } = useTranslation(["common"]);

  const {
    callbackUrl,
    donationID,
    setcountry,
    setIsTaxDeductible,
    projectDetails,
    setprojectDetails,
    setquantity,
    setContactDetails,
    setisGift,
    setgiftDetails,
    setfrequency,
    setdonationStep,
    setcurrency,
    paymentError,
    setPaymentError,
    setAmount,
    setcallbackUrl,
    setCallbackMethod,
    setredirectstatus,
    loadPaymentSetup,
  } = React.useContext(QueryParamContext);

  async function getDonation() {
    setIsTaxDeductible(donation.taxDeductionCountry ? true : false);
    setprojectDetails((projectDetails) => {
      return {
        ...(projectDetails as FetchedProjectDetails),
        id: donation.destination.id as string,
      };
    });
    setPaymentError("");
    setquantity(donation?.quantity);
    setContactDetails(donation.donor as ContactDetails);
    setAmount(donation.amount);

    let country: string;
    if (donation.taxDeductionCountry) {
      country = donation.taxDeductionCountry;
    } else {
      country = donation?.donor?.country as string;
    }
    setcountry(country);
    localStorage.setItem("countryCode", country);
    setcurrency(donation.currency);
    if (donation.gift) {
      setisGift(donation.gift.recipientName ? true : false);

      const _giftDetails = {
        type: donation.gift.type || null,
        recipientName: donation.gift.recipientName || "",
        recipientEmail: donation.gift.recipientEmail || "",
        message: donation.gift.message || "",
        ...(donation.gift.recipientTreeCounter
          ? { recipientTreecounter: donation.gift.recipientTreecounter }
          : {}),
      };
      // TODO - Gift type invitation and direct will have different properties
      setgiftDetails(_giftDetails);
    }

    // TODO - Test this again after backend is updated
    setfrequency(donation.isRecurrent ? donation.frequency : "once");
    await loadPaymentSetup({
      projectGUID: donation.destination.id,
      paymentSetupCountry: country,
      shouldSetPaymentDetails: true,
    });
    setcallbackUrl(donation.metadata.callback_url);
    setCallbackMethod(donation.metadata.callback_method);
    setredirectstatus("");
    setdonationStep(3);
  }

  return (
    <div>
      {callbackUrl && (
        <button
          id={"thank-you-close"}
          onClick={() => sendToReturn()}
          className="mb-10"
          style={{ alignSelf: "flex-start" }}
        >
          <CloseIcon color={themeProperties.light.primaryFontColor} />
        </button>
      )}

      <div className={"title-text text-center"} data-test-id="donation-failed">
        {t("common:donationFailed")}
      </div>
      <div className={"mt-20 text-center"}>
        {t("common:donationFailedMessage")}
      </div>
      {paymentError && (
        <div
          className={
            "mt-20 d-flex align-items-center callout-danger text-danger"
          }
          style={{ marginBottom: "10px" }}
        >
          <InfoIcon />
          {paymentError}
        </div>
      )}
      <PaymentFailedIllustration />
      {donationID && (
        <button
          onClick={() => getDonation()}
          className="primary-button mt-20 mb-20"
          data-test-id="retryDonation"
        >
          <RetryIcon color="#fff" />
          {t("common:retryPayment")}
        </button>
      )}
    </div>
  );
}

export default FailedDonation;
