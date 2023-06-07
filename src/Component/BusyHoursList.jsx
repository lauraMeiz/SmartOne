import BusyHoursElement from "./BusyHoursElement";
import BusyHoursElementSCSS from "../Style/BusyHoursElement.module.scss";
export default function BusyHoursList({ times, deleteElement, show }) {
  console.log(times);
  return (
    <>
      <div className={BusyHoursElementSCSS.busyRow}>
        {times.map((time) => (
          <BusyHoursElement
            key={time.id}
            time={time}
            deleteElement={deleteElement}
            show={show}
          />
        ))}
      </div>
    </>
  );
}
