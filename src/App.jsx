import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Component/Form";
import getNewId from "./Common/id";

function App() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("times");
    if (null === data) {
      localStorage.setItem("times", JSON.stringify([]));
      setTimes([]);
    } else {
      setTimes(JSON.parse(data));
    }
  }, []);

  const createBusyTimeList = (data) => {
    const time = {
      id: getNewId(),
      dateBusy: data.dateBusy,
      hoursBusy: data.hoursBusy,
    };
    // localStorage logic
    const newData = [...times, time];
    localStorage.setItem("times", JSON.stringify(newData));
    //

    setTimes((times) => [...times, time]);
  };
  return (
    <>
      <div className="App">
        <Form createBusyTimeList={createBusyTimeList} />
      </div>
    </>
  );
}

export default App;
