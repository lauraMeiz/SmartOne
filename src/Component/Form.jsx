import FormSCSS from "../Style/Form.module.scss";
import BusyHours from "./BusyHours";
export default function Form() {
  return (
    <>
      <div className={FormSCSS.formRow}>
        <form>
          <div>
            <label htmlFor="volume">volume</label>
            <input
              type="number"
              id="volume"
              placeholder="Total Hours"
              // value
              // onChange
            />
          </div>
          <div>
            <label htmlFor="date">Deadline</label>
            <input
              type="date"
              id="date"
              placeholder="Deadline"
              // value
              // onChange
            />
          </div>

          <BusyHours />

          <button
            //   onClick=
            //
            type="submit"
          >
            Show a result
          </button>
        </form>
      </div>
    </>
  );
}