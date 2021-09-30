import React, { ReactElement } from "react";
import { QueryParamContext } from "../../Layout/QueryParamContext";
import getFormatedCurrency from "../../Utils/getFormattedCurrency";
import { getFormattedNumber } from "../../Utils/getFormattedNumber";
import TreeCostLoader from "../../Common/ContentLoaders/TreeCostLoader";
import { useTranslation } from "next-i18next";

interface Props {}

function DonationAmount({}: Props): ReactElement {
  const { t, i18n } = useTranslation(["common", "country"]);

  const { quantity, currency, paymentSetup,amount } =
    React.useContext(QueryParamContext);
  return (
    <div>
      {paymentSetup && paymentSetup.unitCost ? (
        <div className={"w-100 text-center text-bold mt-20"}>
          <span className={"text-primary"} style={{ marginRight: "4px" }}>
            {getFormatedCurrency(
              i18n.language,
              currency,
              amount
            )}
          </span>
          {t("fortreeCountTrees", {
            count: Number(quantity),
            treeCount: getFormattedNumber(i18n.language, Number(quantity)),
          })}
        </div>
      ) : (
        <div className={"text-center mt-20"}>
          <TreeCostLoader width={150} />
        </div>
      )}
    </div>
  );
}

export default DonationAmount;
