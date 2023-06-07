import { useState } from "react";
import BusyHoursSCSS from "../Style/BusyHours.module.scss";

export default function CreateBusyHours({ createBusyTimeList }) {
  const [dateBusy, setDateBusy] = useState("");
  const [hoursBusy, setHoursBusy] = useState("0");

  const handleCreateList = () => {
    const data = {
      dateBusy: dateBusy,
      hoursBusy: hoursBusy,
    };
    createBusyTimeList(data);
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
      <div className={BusyHoursSCSS.busyHoursRow}>
        <label htmlFor="dateBusy">Date</label>
        <input
          type="date"
          id="dateBusy"
          placeholder="Date of Busy Hours"
          value={dateBusy}
          onChange={(e) => handleInput(e, "dateBusy")}
        />
        <label htmlFor="hoursBusy">Busy Hours</label>
        <input
          type="number"
          id="hoursBusy"
          placeholder="Busy Hours"
          value={hoursBusy}
          onChange={(e) => handleInput(e, "hoursBusy")}
        />
        <button onClick={handleCreateList}>Save and tape other</button>
      </div>
    </>
  );
}
