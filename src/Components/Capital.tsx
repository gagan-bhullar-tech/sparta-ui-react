import { FC, useEffect, useState } from "react";
import Progress from "../Common/Progress";
import { IDeposit } from "../Interfaces/Deposit";
import HttpService from "../Services/HttpService";
import ToastService from "../Services/ToastService";

const Capital: FC = () => {
  const [deposits, setDeposits] = useState<IDeposit[]>();

  useEffect(() => {
    const getRecentCapital = async () => {
      try {
        const response = await HttpService.get("/v1/recent/capital");
        if (response.capital) {
          setDeposits(response.capital.deposits);
        }
      } catch (error) {
        ToastService.error("Unable to get recent capital");
        return;
      }
    };
    getRecentCapital();
  }, []);

  if (!deposits) {
    return <Progress />;
  }

  return <></>;
};

export default Capital;
