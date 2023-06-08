import ResultElement from "./ResultElement";
import ResultListSCSS from "../Style/ResultList.module.scss";
export default function ResultList({
  results,
  onTime,
  willDo,
  totalPerDay,
  times,
  sliceGoals,
}) {
  //   const busyHours = times.map((m, i) => m.hoursBusy);
  willDo();
  return (
    <>
      <div>
        <div>You need {sliceGoals ? sliceGoals.volume : null} hours</div>
        {onTime ? (
          <>
            <div style={{ color: "blue" }}>
              You will be on time, your work schedule is here
            </div>

            <div style={{ color: "blue", fontStyle: "italic" }}>
              {" "}
              You have free time in day {totalPerDay}{" "}
              <div style={{ color: "brown", fontStyle: "italic" }}>
                Please, choose the dates when you want to compensate the hours
                taken and add how much you could allocate
              </div>
            </div>
            <div></div>
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
      <div className={ResultListSCSS.resultRow}>
        {results.map((m, i) => (
          <>
            <ResultElement
              key={m.id}
              result={m}
              onTime={onTime}
              totalPerDay={totalPerDay}
              times={times}
            />
          </>
        ))}
      </div>
    </>
  );
}
