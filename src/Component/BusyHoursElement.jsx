export default function BusyHoursElement({ time, deleteElement, show }) {
  const handleDelete = (id) => {
    deleteElement(parseInt(id));
  };
  return (
    <>
      <div>{time.dateBusy}</div>
      <div>{time.hoursBusy}</div>
      <div className="buttons">
        <button onClick={() => handleDelete(time.id)} className="">
          Delete
        </button>
        <button className="edit" onClick={() => show(time.id)}>
          Edit
        </button>
      </div>
    </>
  );
}
