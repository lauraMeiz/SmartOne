import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Component/Form";
import getNewId from "./Common/id";
import CreateBusyHours from "./Component/CreateBusyHours";
import BusyHoursList from "./Component/BusyHoursList";

function App() {
  const [times, setTimes] = useState([]);
  const [modal, setModal] = useState(0);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("times");
    if (null === data) {
      localStorage.setItem("times", JSON.stringify([]));
      setTimes([]);
    } else {
      setTimes(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    let data1 = localStorage.getItem("goals");
    if (null === data1) {
      localStorage.setItem("goals", JSON.stringify([]));
      setGoals([]);
    } else {
      setGoals(JSON.parse(data1));
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
  // Date today

  const dateT = new Date();

  let day = "" + dateT.getDate();
  let month = "" + (dateT.getMonth() + 1);
  let year = dateT.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  let currentDate = `${year}-${month}-${day}`;

  //Days from today untill deadline

  const GetGoals = JSON.parse(localStorage.getItem("goals"));
  console.log(GetGoals);
  const lastTypedDate = GetGoals.slice(-1).pop();
  const lastTypedDateNumber = lastTypedDate.date.split("-");

  const currentDateNumber = currentDate.split("-");

  console.log(lastTypedDateNumber, currentDateNumber);

  //hours from today

  // const daysLeft =
  //   Number(Math.abs(lastTypedDateNumber[2])) -
  //   Number(Math.abs(currentDateNumber[2]));
  // console.log(daysLeft);
  // const monthLeft =
  //   Number(Math.abs(lastTypedDateNumber[1])) -
  //   Number(Math.abs(currentDateNumber[1]));
  // console.log(monthLeft);

  //const months_left = Number(Math.abs(calcFormat[1]) - 1);
  // const years_left = Number(Math.abs(calcFormat[2]) - 1970);

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

  const fixGoal = (data1) => {
    const goal = {
      id: getNewId(),
      volume: data1.volume,
      date: data1.date,
    };
    // localStorage logic
    const newData1 = [...goals, goal];
    localStorage.setItem("goals", JSON.stringify(newData1));
    //

    setGoals((goals) => [...goals, goal]);
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

  return (
    <>
      <div className="App">
        <div>{currentDate}</div>
        <Form
          times={times}
          createBusyTimeList={createBusyTimeList}
          deleteElement={deleteElement}
          show={show}
          editElement={editElement}
          time={getTime()}
          cancel={cancel}
          modal={modal}
          fixGoal={fixGoal}
          goals={goals}
          setGoals={setGoals}
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
