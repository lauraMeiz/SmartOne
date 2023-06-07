import ResultElementSCSS from "../Style/ResultElement.module.scss";

export default function ResultElement({ result, times }) {
  console.log(result, times);

  return (
    <>
      <div className={ResultElementSCSS.busyColumn}>
        <div>{result.date}</div>
        <div>{result.hours > 0 ? result.hours : 0}</div>
        {/* <div>{result.hours}</div> */}
      </div>
    </>
  );
}
