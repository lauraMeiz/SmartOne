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

  const deleteElement = (id) => {
    // localStorage logic
    const newData = times.filter((time) => time.id !== id);
    localStorage.setItem("time", JSON.stringify(newData));
    //
    setTimes((times) => times.filter((time) => time.id !== id));
  };

  return (
    <>
      <div className="App">
        <Form
          times={times}
          createBusyTimeList={createBusyTimeList}
          deleteElement={deleteElement}
        />
      </div>
    </>
  );
}

export default App;
