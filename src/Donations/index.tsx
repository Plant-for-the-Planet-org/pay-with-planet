import React, { ReactElement } from "react";
import ContactsForm from "./Components/ContactsForm";

import { QueryParamContext } from "../Layout/QueryParamContext";
import PaymentsForm from "./Components/PaymentsForm";
import DonationsForm from "./Components/DonationsForm";
import { useTranslation } from "react-i18next";
import ThankYou from "./Components/ThankYouComponent";
import getFormatedCurrency from "../Utils/getFormattedCurrency";
import { getFormattedNumber } from "../Utils/getFormattedNumber";
import { getCountryDataBy } from "../Utils/countryUtils";
import { getTenantBackground } from "./../Utils/getTenantBackground";
import SelectProject from "./Components/SelectProject";
interface Props {}

function Donations({}: Props): ReactElement {
  const { t, i18n, ready } = useTranslation("common");
  const { paymentSetup, donationStep, projectDetails } =
    React.useContext(QueryParamContext);

  return (
    <div className="donations-container">
      <div className="donations-card-container">
        {/* Left panel */}
        {donationStep !== 0 && <DonationInfo /> }

        {/* Right panel */}
        {donationStep === 0 && <SelectProject />}
        {donationStep === 1 && <DonationsForm />}
        {donationStep === 2 && <ContactsForm />}
        {donationStep === 3 && <PaymentsForm />}
        {donationStep === 4 && <ThankYou />}
      </div>
    </div>
  );
}

function DonationInfo() {
  const { t, i18n } = useTranslation("common");
  const {
    projectDetails,
    donationID,
    donationStep,
    treeCount,
    paymentSetup,
    currency,
    contactDetails,
    giftDetails,
    isGift,
    tenant,
  } = React.useContext(QueryParamContext);

  return (
    <div className="donations-info-container">
      <img className="background-image" src={getTenantBackground(tenant)} />
      <div className="background-image-overlay"></div>
      {projectDetails && paymentSetup ? (
        <div className="donations-info text-white">
          {/* <img src={getImageUrl('profile', 'avatar', userInfo.profilePic)} /> */}
          {(donationStep === 2 || donationStep === 3) && (
            <div className="contact-details-info">
              <div className={"w-100  mt-10"}>
                {t("donating")}
                <span className="text-bold" style={{ marginRight: "4px" }}>
                  {getFormatedCurrency(
                    i18n.language,
                    currency,
                    paymentSetup.treeCost * treeCount
                  )}
                </span>
                {t("fortreeCountTrees", {
                  count: Number(treeCount),
                  treeCount: getFormattedNumber(
                    i18n.language,
                    Number(treeCount)
                  ),
                })}
              </div>
            </div>
          )}
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://www.trilliontreecampaign.org/${projectDetails.slug}`}
            className="title-text text-white"
          >
            {projectDetails.name}
          </a>
          {projectDetails.tpo && (
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://www.trilliontreecampaign.org/t/${projectDetails.tpo.slug}`}
              className="text-white"
            >
              {t("byOrganization", {
                organizationName: projectDetails.tpo.name,
              })}
            </a>
          )}

          {(donationStep === 1 || donationStep === 2 || donationStep === 3) &&
            giftDetails &&
            isGift &&
            giftDetails.recipientName && (
              <div className="contact-details-info  mt-20 donation-supports-info">
                <p>Dedicated to</p>
                <p className="text-bold">{giftDetails.recipientName}</p>
                {giftDetails.giftMessage && (
                  <p>Message: {giftDetails.giftMessage}</p>
                )}
              </div>
            )}
          {donationStep === 3 && contactDetails.firstname && (
            <div className={"contact-details-info w-100 mt-20"}>
              <p>Billing Address</p>
              <p className={`text-bold`}>
                {contactDetails.firstname && contactDetails.firstname}{" "}
                {contactDetails.lastname && contactDetails.lastname}
              </p>
              <p>{contactDetails.email && contactDetails.email}</p>
              <p>
                {contactDetails.address && contactDetails.address}
                {", "}
                {contactDetails.city && contactDetails.city}
                {", "}
                {contactDetails.zipCode && contactDetails.zipCode}
              </p>
              <p>
                {contactDetails.country &&
                  getCountryDataBy("countryCode", contactDetails.country)
                    ?.countryName}
              </p>
            </div>
          )}

          {donationID && (
            <p className="donations-transaction-details mt-20">
              {`Ref - ${donationID}`}
            </p>
          )}
        </div>
      ) :  null}
    </div>
  );
}

export default Donations;
