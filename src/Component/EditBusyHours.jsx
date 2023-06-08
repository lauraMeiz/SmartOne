import { useEffect, useState } from "react";
import EditBusyHoursSCSS from "../Style/EditBusyHours.module.scss";
import ButtonSCSS from "../Style/Button.module.scss";
export default function EditBusyHours({ editElement, time, cancel }) {
  const [dateBusy, setDateBusy] = useState("");
  const [hoursBusy, setHoursBusy] = useState("0");

  useEffect(() => {
    setDateBusy(time.dateBusy);
    setHoursBusy(time.hoursBusy);
  }, [time]);
  const handleCancel = () => {
    cancel();
  };

  const handleEditList = () => {
    const data = {
      dateBusy: dateBusy,
      hoursBusy: hoursBusy,
    };
    editElement(data);

    setDateBusy("");
    setHoursBusy("0");
  };

  const handleInput = (e, d) => {
    switch (d) {
      case "dateBusy":
        setDateBusy(e.target.value);
        break;
      case "hoursBusy":
        setHoursBusy(e.target.value);
        break;

      default:
    }
  };

  return (
    <>
      <div className={EditBusyHoursSCSS.modal}>
        <div className={EditBusyHoursSCSS.modalForm}>
          <div className={EditBusyHoursSCSS.editTitle}>Edit busy hours</div>
          <label htmlFor="dateBusy">Date</label>
          <input
            className={EditBusyHoursSCSS.input}
            type="date"
            id="dateBusy"
            placeholder="Date of Busy Hours"
            value={dateBusy}
            onChange={(e) => handleInput(e, "dateBusy")}
          />
          <label htmlFor="hoursBusy">Busy Hours</label>
          <input
            className={EditBusyHoursSCSS.input}
            type="number"
            id="hoursBusy"
            placeholder="Busy Hours"
            value={hoursBusy}
            onChange={(e) => handleInput(e, "hoursBusy")}
          />
          <div className={ButtonSCSS.button}>
            <button className={ButtonSCSS.buttonSave} onClick={handleEditList}>
              Save
            </button>
            <button className={ButtonSCSS.buttonCancel} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
