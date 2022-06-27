import React, { useState, useEffect, useCallback, useContext } from "react";
import { useTranslation, Trans } from "next-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import CountrySelect from "src/Common/InputTypes/AutoCompleteCountry";
import { apiRequest } from "src/Utils/api";
import { QueryParamContext } from "src/Layout/QueryParamContext";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import themeProperties from "styles/themeProperties";
import { ThemeContext } from "styles/themeContext";

interface PlanetCashAccount {
  id: string;
  ownerName: string;
  balance: number;
  debit: number;
  creditLimit: number;
  currency: string;
  country: string;
  topUpThreshold: number;
  topUpAmount: number;
  isActive: boolean;
  fee: number;
}

const PlanetCashSignup = () => {
  const { t, i18n } = useTranslation(["common"]);
  const { getAccessTokenSilently } = useAuth0();
  const { setshowErrorCard } = useContext(QueryParamContext);
  const { theme } = React.useContext(ThemeContext);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState("DE");
  const [planetCashAccounts, setPlanetCashAccounts] = useState<
    PlanetCashAccount[]
  >([]);
  const [currentPlanetCashAccount, setCurrentPlanetCashAccount] =
    useState<PlanetCashAccount | null>(null);

  const usePlanetCashSignupStyles = makeStyles({
    rootContainer: {
      height: 500,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    tcLink: {
      display: "inline",
      color:
        theme === "theme-light"
          ? themeProperties.light.primaryFontColor
          : themeProperties.dark.primaryFontColor,
      "&:hover": {
        color: themeProperties.primaryColor,
      },
    },
  });

  const classes = usePlanetCashSignupStyles();

  const fetchPlanetCashAccounts = useCallback(async () => {
    const token = await getAccessTokenSilently();
    try {
      setLoading(true);
      const options = {
        url: "/app/planetCash",
        token,
        setshowErrorCard,
      };
      const { data } = await apiRequest(options);
      setPlanetCashAccounts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [apiRequest, getAccessTokenSilently]);

  useEffect(() => {
    fetchPlanetCashAccounts();
  }, [fetchPlanetCashAccounts]);

  useEffect(() => {
    const _planetCashAccount = planetCashAccounts.find(
      (planetCashAccount) =>
        planetCashAccount.country.toLowerCase() === country.toLowerCase()
    );

    if (_planetCashAccount) {
      setCurrentPlanetCashAccount(_planetCashAccount);
    } else {
      setCurrentPlanetCashAccount(null);
    }
  }, [country, planetCashAccounts]);

  const onChangeCountry = (_country: string) => {
    setCountry(_country);
    const _currentPlanetCashAccount = planetCashAccounts.find((account) => {
      return account.country === _country;
    });
    if (_currentPlanetCashAccount) {
      setCurrentPlanetCashAccount(_currentPlanetCashAccount);
    } else setCurrentPlanetCashAccount(null);
  };

  const handleActivatePlanetCashAccount = useCallback(async () => {
    if (currentPlanetCashAccount) {
      const token = await getAccessTokenSilently();
      try {
        const options = {
          method: "POST",
          url: `/app/planetCash/${currentPlanetCashAccount.id}/activate`,
          token,
          setshowErrorCard,
        };
        await apiRequest(options);
        router.reload();
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentPlanetCashAccount]);

  const handleCreatePlanetCashAccount = async () => {
    const token = await getAccessTokenSilently();
    try {
      const options = {
        method: "POST",
        url: "/app/planetCash",
        token,
        data: {
          country,
          activate: true,
        },
        setshowErrorCard,
      };
      await apiRequest(options);
      router.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.rootContainer}>
      <div>
        {!loading && currentPlanetCashAccount ? (
          <p className="title-text mb-20">{t("activatePlanetCash")}</p>
        ) : (
          <p className="title-text mb-20">{t("planetCashSignup")}</p>
        )}

        {!loading && currentPlanetCashAccount ? (
          <p className="mb-20">
            {t("activatePlanetCashMsg", {
              currency: currentPlanetCashAccount.currency,
            })}
          </p>
        ) : (
          <p className="mb-20">{t("noPlanetCashAccount")}</p>
        )}

        <div className={"form-field mb-20"}>
          <CountrySelect
            allowedCountries={["DE", "ES", "US"]}
            label={t("country")}
            name="country"
            onChange={onChangeCountry}
            defaultValue={country}
          />
        </div>
        <div className="mb-20">
          <Trans i18nKey={"common:planetCashTC"}>
            <a
              className={classes.tcLink}
              rel="noopener noreferrer"
              href={`https://pp.eco/legal/${i18n.language}/terms`}
              target={"_blank"}
            ></a>
          </Trans>
        </div>
        <p>{t("planetCashIUnderstand")}</p>
      </div>
      {!loading && currentPlanetCashAccount ? (
        <button
          onClick={handleActivatePlanetCashAccount}
          className="primary-button w-100 mt-30"
        >
          {t("activatePlanetCash")}
        </button>
      ) : (
        <button
          onClick={handleCreatePlanetCashAccount}
          className="primary-button w-100 mt-30"
        >
          {t("createPlanetCashAccount")}
        </button>
      )}
    </div>
  );
};

export default PlanetCashSignup;
