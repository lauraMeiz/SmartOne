import ResultElement from "./ResultElement";
import ResultListSCSS from "../Style/ResultList.module.scss";
export default function ResultList({ results, willDo, onTime }) {
  return (
    <>
      <div>{onTime ? <div>Spesiu</div> : <div>Nespesiu</div>}</div>
      <div className={ResultListSCSS.resultRow}>
        {results.map((m, i) => (
          <>
            <ResultElement key={m.id} result={m} />
          </>
        ))}
      </div>
    </>
  );
}
