import { IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Error from "../Common/Error";
import Progress from "../Common/Progress";
import { BankName } from "../Enums/BankName";
import { IDeposit } from "../Interfaces/Deposit";
import HttpService from "../Services/HttpService";
import ToastService from "../Services/ToastService";

export const inputStyles = {
  cursor: "pointer",
  border: 0,
  width: "50px",
  height: "50px",
  fontSize: "24px",
  borderRadius: 0,
  borderBottom: "3px solid #cbcbcb",
};

export interface ICapitalFormData {
  scotiaBankAmount: number;
  rbcBankAmount: number;
  rbcBusinessBankAmount: number;
  cibcBankAmount: number;
  tangerineBankAmount: number;
  simpliiBankAmount: number;
  eqBankAmount: number;
  pcFinancialBankAmount: number;
  tdBankAmount: number;
  totalAmount: number;
  despositDescription: string;
}

const Capital: FC = () => {
  const [deposits, setDeposits] = useState<IDeposit[]>();
  const [editDeposit, setEditDeposit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { register, setValue, formState, handleSubmit } =
    useForm<ICapitalFormData>({
      defaultValues: {
        scotiaBankAmount: 0,
        rbcBankAmount: 0,
        rbcBusinessBankAmount: 0,
        cibcBankAmount: 0,
        tangerineBankAmount: 0,
        simpliiBankAmount: 0,
        eqBankAmount: 0,
        pcFinancialBankAmount: 0,
        tdBankAmount: 0,
        totalAmount: 0,
        despositDescription: "",
      },
      mode: "onChange",
    });

  const getRecentCapital = async () => {
    try {
      const response = await HttpService.get("/v1/recent/capital");
      if (response.capital?.deposits) {
        setDeposits(response.capital?.deposits);
        setValue(
          "scotiaBankAmount",
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.ScotiaBank
          )
        );
        setValue(
          "rbcBankAmount",
          getDepositValueByBankName(response.capital.deposits, BankName.RBC)
        );
        setValue(
          "rbcBusinessBankAmount",
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.RBC_BUSINESS
          )
        );
        setValue(
          "cibcBankAmount",
          getDepositValueByBankName(response.capital.deposits, BankName.CIBC)
        );
        setValue(
          "tangerineBankAmount",
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.Tangerine
          )
        );
        setValue(
          "simpliiBankAmount",
          getDepositValueByBankName(response.capital.deposits, BankName.Simplii)
        );
        setValue(
          "eqBankAmount",
          getDepositValueByBankName(response.capital.deposits, BankName.EQ)
        );
        setValue(
          "pcFinancialBankAmount",
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.PCFinancial
          )
        );
        setValue(
          "tdBankAmount",
          getDepositValueByBankName(response.capital.deposits, BankName.TD)
        );
        calculateTotalAmount(
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.ScotiaBank
          ),
          getDepositValueByBankName(response.capital.deposits, BankName.RBC),
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.RBC_BUSINESS
          ),
          getDepositValueByBankName(response.capital.deposits, BankName.CIBC),
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.Tangerine
          ),
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.Simplii
          ),
          getDepositValueByBankName(response.capital.deposits, BankName.EQ),
          getDepositValueByBankName(
            response.capital.deposits,
            BankName.PCFinancial
          ),
          getDepositValueByBankName(response.capital.deposits, BankName.TD)
        );
      }
    } catch (error) {
      ToastService.error("Unable to get recent capital");
      return;
    }
  };

  useEffect(() => {
    getRecentCapital();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotalAmount = (
    scotiaBankAmount: number = 0,
    rbcBankAmount: number = 0,
    rbcBusinessBankAmount: number = 0,
    cibcBankAmount: number = 0,
    tangerineBankAmount: number = 0,
    simpliiBankAmount: number = 0,
    eqBankAmount: number = 0,
    pcFinancialBankAmount: number = 0,
    tdBankAmount: number = 0
  ) => {
    const total =
      scotiaBankAmount +
      rbcBankAmount +
      rbcBusinessBankAmount +
      cibcBankAmount +
      tangerineBankAmount +
      simpliiBankAmount +
      eqBankAmount +
      pcFinancialBankAmount +
      tdBankAmount;
    setValue("totalAmount", +total?.toFixed(2));
  };

  const getDepositValueByBankName = (
    deposits: IDeposit[],
    bankName: BankName
  ): number => {
    const bankDeposit = (deposits || []).filter(
      (deposit) => deposit.bank_name === bankName
    );
    if (bankDeposit && bankDeposit.length) {
      return bankDeposit[0].amount;
    }
    return 0;
  };

  const onSubmit = async (data: ICapitalFormData) => {
    try {
      setDisabled(true);
      const response = await HttpService.postFormData("/v1/capital", {
        deposits: [
          {
            bank_name: BankName.ScotiaBank,
            amount: +data.scotiaBankAmount,
          },
          {
            bank_name: BankName.RBC,
            amount: +data.rbcBankAmount,
          },
          {
            bank_name: BankName.RBC_BUSINESS,
            amount: +data.rbcBusinessBankAmount,
          },
          {
            bank_name: BankName.CIBC,
            amount: +data.cibcBankAmount,
          },
          {
            bank_name: BankName.Tangerine,
            amount: +data.tangerineBankAmount,
          },
          {
            bank_name: BankName.Simplii,
            amount: +data.simpliiBankAmount,
          },
          {
            bank_name: BankName.EQ,
            amount: +data.eqBankAmount,
          },
          {
            bank_name: BankName.PCFinancial,
            amount: +data.pcFinancialBankAmount,
          },
          {
            bank_name: BankName.TD,
            amount: +data.tdBankAmount,
          },
        ],
        depositDescription: data.despositDescription,
      });
      if (response) {
        ToastService.success("Deposit information saved successfully");
        getRecentCapital();
        setEditDeposit(false);
        setDisabled(false);
      }
    } catch (error) {
      ToastService.error("Unable to save deposit");
      setDisabled(false);
    }
  };

  if (!deposits) {
    return <Progress />;
  }

  return (
    <div className="container pb-4 container-padding-bottom">
      <form
        className="card"
        style={{ paddingLeft: "0.7rem", paddingRight: "0.7rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row text-center mb-2 d-flex">
          <div className="m-0 p-0 h4 text-bold ">Deposit</div>
        </div>
        {!editDeposit && (
          <div className="text-end" style={{ marginRight: "2rem" }}>
            <IconButton
              color="primary"
              aria-label="Edit deposit"
              title="Edit deposit"
              onClick={(event) => setEditDeposit(true)}
            >
              <i className="fas fa-edit"></i>
            </IconButton>
          </div>
        )}
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label className="fw-bold">Total ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.totalAmount &&
                formState.touchedFields.totalAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter total amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={true}
              type="number"
              step=".01"
              {...register("totalAmount", { required: true })}
            />
            {formState.errors.totalAmount &&
              formState.touchedFields.totalAmount && (
                <Error>Description is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>ScotiaBank ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.scotiaBankAmount &&
                formState.touchedFields.scotiaBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter ScotiaBank amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("scotiaBankAmount", { required: true })}
            />
            {formState.errors.scotiaBankAmount &&
              formState.touchedFields.scotiaBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>RBC ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.rbcBankAmount &&
                formState.touchedFields.rbcBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter RBC amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("rbcBankAmount", { required: true })}
            />
            {formState.errors.rbcBankAmount &&
              formState.touchedFields.rbcBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>RBC Business ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.rbcBusinessBankAmount &&
                formState.touchedFields.rbcBusinessBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter RBC business amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("rbcBusinessBankAmount", { required: true })}
            />
            {formState.errors.rbcBusinessBankAmount &&
              formState.touchedFields.rbcBusinessBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>CIBC ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.cibcBankAmount &&
                formState.touchedFields.cibcBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter CIBC amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("cibcBankAmount", { required: true })}
            />
            {formState.errors.cibcBankAmount &&
              formState.touchedFields.cibcBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>Tangerine ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.tangerineBankAmount &&
                formState.touchedFields.tangerineBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter Tangerine amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("tangerineBankAmount", { required: true })}
            />
            {formState.errors.tangerineBankAmount &&
              formState.touchedFields.tangerineBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>Simplii ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.simpliiBankAmount &&
                formState.touchedFields.simpliiBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter ScotiaBank amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("simpliiBankAmount", { required: true })}
            />
            {formState.errors.simpliiBankAmount &&
              formState.touchedFields.simpliiBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>EQ ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.eqBankAmount &&
                formState.touchedFields.eqBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter EQ amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("eqBankAmount", { required: true })}
            />
            {formState.errors.eqBankAmount &&
              formState.touchedFields.eqBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>PC Financial ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.pcFinancialBankAmount &&
                formState.touchedFields.pcFinancialBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter PC Financial amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("pcFinancialBankAmount", { required: true })}
            />
            {formState.errors.pcFinancialBankAmount &&
              formState.touchedFields.pcFinancialBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        <div className="row mb-2 justify-content-center align-items-center">
          <div className="col-5">
            <label>TD ($)</label>
          </div>
          <div className="col-5 p-1">
            <input
              className={
                "w-100 " +
                (formState.errors.tdBankAmount &&
                formState.touchedFields.tdBankAmount
                  ? "error"
                  : "")
              }
              placeholder="Enter TD amount ($)"
              style={{ ...inputStyles, fontSize: "16px" }}
              disabled={!editDeposit}
              type="number"
              step=".01"
              {...register("tdBankAmount", { required: true })}
            />
            {formState.errors.tdBankAmount &&
              formState.touchedFields.tdBankAmount && (
                <Error>Amount is required</Error>
              )}
          </div>
        </div>
        {editDeposit && (
          <>
            <div className="row mb-2 justify-content-center align-items-center">
              <div className="col-5">
                <label>Description</label>
              </div>
              <div className="col-5 p-1">
                <input
                  className={
                    "w-100 " +
                    (formState.errors.despositDescription &&
                    formState.touchedFields.despositDescription
                      ? "error"
                      : "")
                  }
                  placeholder="Enter description"
                  style={{ ...inputStyles, fontSize: "16px" }}
                  {...register("despositDescription", { required: true })}
                />
                {formState.errors.despositDescription &&
                  formState.touchedFields.despositDescription && (
                    <Error>description is required</Error>
                  )}
              </div>
            </div>
            <div className="row">
              <div
                className="d-flex w-100 mt-3 mb-3"
                style={{
                  rowGap: "20px",
                  columnGap: "20px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline-primary w-50"
                  onClick={() => setEditDeposit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-50"
                  disabled={!formState.isValid || disabled}
                >
                  Submit&nbsp;
                  {disabled && <i className="fa-spin fas fa-spinner ml-2"></i>}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Capital;
