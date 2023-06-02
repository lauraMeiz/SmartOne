import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Component/Form";
import getNewId from "./Common/id";
import CreateBusyHours from "./Component/CreateBusyHours";
import BusyHoursList from "./Component/BusyHoursList";

function App() {
  const [times, setTimes] = useState([]);
  const [modal, setModal] = useState(0);

  useEffect(() => {
    let data = localStorage.getItem("times");
    if (null === data) {
      localStorage.setItem("times", JSON.stringify([]));
      setTimes([]);
    } else {
      setTimes(JSON.parse(data));
    }
  }, []);
  const getTime = () => {
    return times.filter((f) => f.id === modal)[0];
  };

  const cancel = () => {
    setModal(0);
  };

  const show = (id) => {
    setModal(id);
  };

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

  const editElement = (data) => {
    //LocalStorage logic

    const timeCopy = [...times];

    timeCopy.forEach((time, i) => {
      if (time.id === modal) {
        timeCopy[i].dateBusy = data.dateBusy;

        timeCopy[i].hoursBusy = data.hoursBusy;
      }
    });
    localStorage.setItem("times", JSON.stringify(timeCopy));

    setTimes(timeCopy);

    cancel();
  };

  const deleteElement = (id) => {
    // localStorage logic
    const newData = times.filter((time) => time.id !== id);
    localStorage.setItem("times", JSON.stringify(newData));
    //
    setTimes((times) => times.filter((time) => time.id !== id));
  };

  console.log(times);
  return (
    <>
      <div className="App">
        <Form
          times={times}
          createBusyTimeList={createBusyTimeList}
          deleteElement={deleteElement}
          show={show}
          editElement={editElement}
          time={getTime()}
          cancel={cancel}
          modal={modal}
        />
        <CreateBusyHours
          times={times}
          createBusyTimeList={createBusyTimeList}
          deleteElement={deleteElement}
          show={show}
        />
        <BusyHoursList
          show={show}
          deleteElement={deleteElement}
          times={times}
        />
      </div>
    </>
  );
}

export default App;
