import BusyHoursElement from "./BusyHoursElement";

export default function BusyHoursList({ times, deleteElement, show }) {
  return (
    <>
      <div>
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
