import BusyHoursSCSS from "../Style/BusyHours.module.scss";

export default function BusyHours() {
  return (
    <>
      <div className={BusyHoursSCSS.busyHoursRow}>
        <label htmlFor="busyHours">busyHours</label>
        <input
          type="date"
          id="date2"
          placeholder="Date of Busy Hours"
          // value
          // onChange
        />
        <input
          type="number"
          id="hours"
          placeholder="Busy Hours"
          // value
          // onChange
        />
        <button>Save and tape other</button>
      </div>
    </>
  );
}
