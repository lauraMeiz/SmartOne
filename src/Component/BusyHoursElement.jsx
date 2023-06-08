import BusyHoursElementSCSS from "../Style/BusyHoursElement.module.scss";
import ButtonSCSS from "../Style/Button.module.scss";
export default function BusyHoursElement({ time, deleteElement, show }) {
  const handleDelete = (id) => {
    deleteElement(parseInt(id));
  };
  return (
    <>
      <div className={BusyHoursElementSCSS.busyColumn}>
        <div>{time.dateBusy}</div>
        <div>{time.hoursBusy}</div>
        <div className={ButtonSCSS.listButton}>
          <button
            className={ButtonSCSS.buttonDeleteBusy}
            onClick={() => handleDelete(time.id)}
          >
            Delete
          </button>
          <button
            className={ButtonSCSS.buttonBusyCancel}
            onClick={() => show(time.id)}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}
