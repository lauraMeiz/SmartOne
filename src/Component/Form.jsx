import { useEffect, useState } from "react";
import FormSCSS from "../Style/Form.module.scss";
import EditBusyHours from "./EditBusyHours";
import ButtonSCSS from "../Style/Button.module.scss";
export default function Form({
  times,
  editElement,
  cancel,
  modal,
  time,
  fixGoal,
  goals,
  setGoals,
  getResult,
  getArrayRes,
  resFormated,
  willDo,
}) {
  const [volume, setVolume] = useState("0");
  const [date, setDate] = useState("");

  const handleGoal = () => {
    const dataGoal = {
      volume: volume,
      date: date,
    };
    const resultGoal = {
      resFormated: resFormated,
    };
    fixGoal(dataGoal);
    getResult(resultGoal);
    willDo();
    setDate("");
    setVolume("0");
  };

  // const calculate = () => {
  //   const result = {
  //     volume: (goals.volume = +times.hoursBusy),
  //   };
  //   getResult(result);
  // };

  const handleInput = (e, d) => {
    switch (d) {
      case "volume":
        setVolume(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;

      default:
    }
  };

  return (
    <>
      <div className={FormSCSS.comment}>
        Please, enter your how much hours you need and finally date (not include
        hours)
      </div>
      <div className={FormSCSS.formRow}>
        {/* <form> */}
        {/* <div className={FormSCSS.column}> */}
        <label htmlFor="volume">volume</label>
        <input
          type="number"
          id="volume"
          placeholder="Total Hours"
          value={volume}
          onChange={(e) => handleInput(e, "volume")}
        />
        {/* </div> */}

        <label htmlFor="date">Deadline</label>
        <input
          type="date"
          id="date"
          placeholder="Deadline"
          volume={date}
          onChange={(e) => handleInput(e, "date")}
        />
      </div>

      <div className={ButtonSCSS.buttonBusy}>
        {" "}
        <button
          className={ButtonSCSS.buttonSaveBusy}
          onClick={handleGoal}
          type="submit"
        >
          {/* <button onClick={getResult} type="submit"> */}
          Show a result
        </button>
      </div>
      {/* </form> */}

      <div>
        {modal ? (
          <EditBusyHours
            editElement={editElement}
            time={time}
            cancel={cancel}
            times={times}
          />
        ) : null}
      </div>
    </>
  );
}
