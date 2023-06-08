import ResultElementSCSS from "../Style/ResultElement.module.scss";

export default function ResultElement({ result, times, onTime, totalPerDay }) {
  return (
    <>
      <div className={ResultElementSCSS.busyColumn}>
        <div>{result.date}</div>
        <div>{result.hours < 0 && onTime ? null : result.hours}</div>
      </div>
    </>
  );
}
