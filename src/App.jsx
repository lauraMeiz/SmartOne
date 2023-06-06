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
  const [results, setResults] = useState([]);

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
  useEffect(() => {
    let data2 = localStorage.getItem("result");
    if (null === data2) {
      localStorage.setItem("result", JSON.stringify([]));
      setResults([]);
    } else {
      setResults(JSON.parse(data2));
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
  const sliceGoals = GetGoals?.slice(-1).pop();
  console.log(sliceGoals);
  const lastTypedDate = GetGoals === [] || GetGoals === null ? [] : sliceGoals;
  const gotGoals = sliceGoals ? sliceGoals.date : null;

  const currentDateNumber = currentDate.split("-");

  console.log(gotGoals, currentDate);

  let date1 = new Date(currentDate);
  let date2 = new Date(gotGoals);

  // To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of hours between two dates
  let Difference_In_Hours = Difference_In_Time / (1000 * 3600);
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //To display the final no. of days (result)
  console.log(Difference_In_Hours);
  const maxHoursNeeded = sliceGoals.volume / Difference_In_Days;

  // render array of dates
  const getDatesInRange = (startDate, endDate) => {
    // const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    const start = new Date(new Date(startDate));
    const end = new Date(new Date(endDate));

    const date = new Date(start.getTime());

    const dates = [];
    const maxHoursNeeded = sliceGoals.volume / Difference_In_Days;
    while (date <= end) {
      const sleep = "8";
      const eat = "1";
      const total = "24" - sleep - eat;
      const hours =
        total > parseInt(maxHoursNeeded) ? parseInt(maxHoursNeeded) : total;

      dates.push({
        id: getNewId(),
        date: new Date(date),
        hours: hours,
      });
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const res = getDatesInRange(currentDate, gotGoals);

  const resFormated = res.map((e) => {
    const hours = e.hours;

    const date = e.date;

    let day = "" + date.getDate();

    let month = "" + (date.getMonth() + 1);
    let year = date.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    let letsDate = `${year}-${month}-${day}`;

    return { date: letsDate, hours: hours };
  });

  //
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

  //console.log(JSON.parse(localStorage.getItem("times")));
  const getTimes = JSON.parse(localStorage.getItem("times"));
  //
  console.log(getTimes);
  const resFormated2 = JSON.parse(localStorage.getItem("result"));

  console.log(resFormated2);

  const arrayTime = [];
  const elementTimes = getTimes
    ? getTimes.forEach((e) => {
        const date = e.dateBusy;
        const hours = e.hoursBusy;
        arrayTime.push({ date: date, hours: hours });
        return arrayTime;
      })
    : null;
  console.log(arrayTime);
  const arrayResult = [];
  const elementResult = resFormated
    ? resFormated.forEach((e) => {
        const date = e.date;
        const hours = e.hours;
        arrayResult.push({ date: date, hours: hours });
        return arrayResult;
      })
    : null;
  const arrayConcat = arrayResult.concat(arrayTime);
  console.log(arrayConcat);

  const sum = arrayConcat
    ? arrayConcat.reduce((acc, cur) => {
        const found = acc.find((val) => val.date === cur.date);
        if (found) {
          found.hours -= Number(cur.hours);
        } else {
          acc.push({ ...cur, hours: Number(cur.hours) });
        }
        return acc;
      }, [])
    : null;

  console.log(sum);

  const getResult = (data2) => {
    const result = {
      id: getNewId(),
      resFormated,
    };

    // localStorage logic
    const newData = [...results, result];
    localStorage.setItem("result", JSON.stringify(newData));
    //

    setResults((results) => [...results, result]);
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
          // getArrayRes={getArrayRes}
          getResult={getResult}
          resFormated={resFormated}
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
