import { PaymentMethod } from "@stripe/stripe-js/types/api/payment-methods";
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";
import { Dispatch, SetStateAction } from "react";
import { TFunction } from "next-i18next";
import { NextRouter } from "next/router";
import {
  NoGift,
  SentDirectGift,
  SentInvitationGift,
  ContactDetails,
  BankTransferDetails,
  PaymentGateway,
} from "@planet-sdk/common";

/** planet-donations only allows direct or invitation gifts */
export type SentGift = SentDirectGift | SentInvitationGift;

export interface PaymentProviderRequest {
  account?: string;
  gateway: PaymentGateway;
  method?: string;
  source?:
    | {
        id?: string;
        object?: string | PaymentMethod | PaypalApproveData | PaypalErrorData;
      }
    | PaypalApproveData
    | PaypalErrorData
    | Record<string, never>;
}

export interface CreateDonationFunctionProps {
  isTaxDeductible: boolean | null;
  country: string;
  projectDetails: FetchedProjectDetails;
  quantity: number;
  paymentSetup: PaymentOptions;
  currency: string;
  contactDetails: ContactDetails;
  giftDetails: SentGift | NoGift;
  isGift: boolean;
  setIsPaymentProcessing: Dispatch<SetStateAction<boolean>>;
  setPaymentError: Dispatch<SetStateAction<string>>;
  setdonationID: Dispatch<SetStateAction<string | null>>;
  token: string | null;
  setshowErrorCard: Dispatch<SetStateAction<boolean>>;
  frequency: string;
  amount?: number | null;
  callbackUrl?: string | undefined;
  callbackMethod?: string | undefined;
  utmCampaign?: string | undefined;
  utmMedium?: string | undefined;
  utmSource?: string | undefined;
  tenant: string;
  locale: string;
}

export interface PayDonationProps {
  gateway: PaymentGateway;
  method: string;
  providerObject?: string | PaymentMethod | PaypalApproveData | PaypalErrorData;
  setIsPaymentProcessing: Dispatch<SetStateAction<boolean>>;
  setPaymentError: Dispatch<SetStateAction<string>>;
  t: TFunction;
  paymentSetup: PaymentOptions;
  donationID: string;
  contactDetails: ContactDetails;
  token: string | null;
  country: string;
  setshowErrorCard: Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
  tenant: string;
  locale: string;
  setTransferDetails: (transferDetails: BankTransferDetails | null) => void;
}

export interface HandleStripeSCAPaymentProps {
  method: string;
  paymentResponse: UpdateDonationActionRequiredData;
  paymentSetup: PaymentOptions;
  window: Window & typeof globalThis;
  setIsPaymentProcessing: Dispatch<SetStateAction<boolean>>;
  setPaymentError: Dispatch<SetStateAction<string>>;
  donationID: string;
  contactDetails: ContactDetails;
  token: string | null;
  country: string;
  setshowErrorCard: Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
  tenant: string;
  locale: string;
}

export interface CreateDonationDataProps {
  projectDetails: FetchedProjectDetails;
  quantity: number;
  paymentSetup: PaymentOptions;
  currency: string;
  contactDetails: ContactDetails;
  taxDeductionCountry: string | null;
  isGift: boolean;
  giftDetails: SentGift | NoGift;
  frequency: string;
  amount?: number | null;
  callbackUrl: string | undefined;
  callbackMethod: string | undefined;
  utmCampaign: string | undefined;
  utmMedium: string | undefined;
  utmSource: string | undefined;
}

export interface PlanetCashSignupDetails {
  name: string;
  ownerName: string;
  ownerAvatar: string | null;
  purpose: "planet-cash-signup";
}

export interface FetchedProjectDetails {
  id: string;
  name: string;
  description?: string | null;
  ownerAvatar: string | null;
  ownerName: string | null;
  image?: string | null;
  purpose: ProjectPurpose;
  taxDeductionCountries?: Array<string>;
  isApproved: boolean;
  isTopProject: boolean;
}

export type ProjectPurpose =
  | "trees"
  | "conservation"
  | "funds"
  | "reforestation"
  | "bouquet"
  | "planet-cash";

export interface PaymentOptions extends FetchedProjectDetails {
  requestedCountry: string;
  effectiveCountry: string;
  frequencies: Frequencies;
  gateways: Gateways;
  recurrency: Recurrency;
  unit: string;
  unitCost: number;
  currency: string;
  destination: string;
  isApproved: boolean;
  isTopProject: boolean;
}

interface Frequencies {
  [key: string]: Frequency;
}

interface Frequency {
  minQuantity: number;
  options: OptionsEntity[];
}

export interface Gateways {
  paypal: Paypal;
  stripe: Stripe;
  offline?: Offline;
}
export interface Paypal {
  methods?: string[] | null;
  account: string;
  authorization: AuthorizationPaypal;
}

export interface AuthorizationPaypal {
  client_id: string;
}

export interface Stripe {
  methods?: string[] | null;
  account: string;
  authorization: AuthorizationStripe;
}

export interface AuthorizationStripe {
  stripePublishableKey: string;
  accountId: string;
}

export interface Offline {
  methods?: string[] | null;
  account: string;
}

export interface OptionsEntity {
  id?: string;
  caption: string | null;
  description: string | null;
  icon: string | null;
  quantity: number | null;
  isDefault: boolean;
}

export interface Recurrency {
  supported: boolean;
  methods: string[] | null;
}

export interface Country {
  countryName: string;
  countryCode: string;
  currencyName: string;
  currencyCode: string;
  currencyCountryFlag: string;
  languageCode: string;
}

export type CountryProperty = keyof Country;

export interface CurrencyList {
  [key: string]: string;
}

export interface OnBehalfDonor {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ShowPaymentMethodParams {
  paymentMethod: "card" | "giropay" | "sofort" | "sepa_debit";
  countries?: string[];
  currencies?: string[];
  authenticatedMethod?: boolean;
}

export interface ConfigResponse {
  appVersions: {
    ios: string;
    android: string;
  };
  clientIp: string;
  country?: string;
  currency: string;
  cdnMedia: {
    images: string;
    cache: string;
    pdfs: string;
  };
  loc: {
    latitude: string;
    longitude: string;
    city: string;
    postalCode: string;
    countryCode: string;
    regionCode: string;
    timezone: string;
  };
}

export interface PaypalApproveData extends OnApproveData {
  type: string;
}

export interface PaypalErrorData {
  type: string;
  status: "error";
  errorMessage?: unknown;
  [key: string]: unknown;
}

export interface UpdateDonationResponse {
  data: UpdateDonationData;
  [key: string]: unknown;
}

export type UpdateDonationData =
  | UpdateDonationSuccessData
  | UpdateDonationFailureData
  | UpdateDonationActionRequiredData;

type UpdateDonationSuccessData = {
  paymentStatus?: string; //TODOO - May not be there. Check and remove.
  status: "success" | "pending" | "paid";
  id: string;
  response?: {
    type: "transfer_required";
    account: BankTransferDetails;
  };
};

type UpdateDonationFailureData = {
  paymentStatus?: string; //TODOO - May not be there. Check and remove.
  status: "failed";
  id: string;
  errorCode: string;
  message: string;
};

type UpdateDonationActionRequiredData = {
  paymentStatus?: string; //TODOO - May not be there. Check and remove.
  status: "action_required";
  id: string;
  response: {
    type: string;
    requires_action: boolean;
    payment_intent_client_secret: string;
    account: string;
  };
};
