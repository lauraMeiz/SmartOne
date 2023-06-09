import ResultElement from "./ResultElement";
import ResultListSCSS from "../Style/ResultList.module.scss";
export default function ResultList({
  results,
  onTime,
  willDo,
  totalPerDay,

  sliceGoals,
}) {
  willDo();

  return (
    <>
      <div className={ResultListSCSS.commentRow}>
        <div>You need {sliceGoals ? sliceGoals.volume : null} hours</div>

        <div>
          {onTime ? (
            <>
              <div style={{ color: "blue" }}>
                To be on time, you must have your work schedule
              </div>
            </>
          ) : (
            <>
              <div style={{ color: "red", fontStyle: "bold" }}>
                You won't make it because...
              </div>

              <div style={{ color: "red", fontStyle: "italic" }}>
                {" "}
                You have free time in day {totalPerDay}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={ResultListSCSS.resultRow}>
        {results.map((m) => (
          <>
            <ResultElement key={m.id} result={m} onTime={onTime} />
          </>
        ))}
      </div>
    </>
  );
}
