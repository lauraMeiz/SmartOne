import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Component/Form";
import getNewId from "./Common/id";
import CreateBusyHours from "./Component/CreateBusyHours";
import BusyHoursList from "./Component/BusyHoursList";
import ResultList from "./Component/ResultList";
import React from "react";

function App() {
  const [times, setTimes] = useState([]);
  const [modal, setModal] = useState(0);
  const [goals, setGoals] = useState([]);
  const [results, setResults] = useState([]);
  const [onTime, setOnTime] = useState(0);

  //
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

  const lastTypedDate = GetGoals === [] || GetGoals === null ? [] : sliceGoals;
  const gotGoals = sliceGoals ? sliceGoals.date : null;

  const currentDateNumber = currentDate.split("-");

  let date1 = new Date(currentDate);
  let date2 = new Date(gotGoals);

  // To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of hours between two dates
  let Difference_In_Hours = Difference_In_Time / (1000 * 3600);
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //To display the final no. of days (result)

  //const maxHoursNeeded = sliceGoals.volume / Difference_In_Days;

  // render array of dates
  const getDatesInRange = (startDate, endDate) => {
    // const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    const start = new Date(new Date(startDate));
    const end = new Date(new Date(endDate) - 1);

    const date = new Date(start.getTime());

    const dates = [];
    const maxHoursNeededPerDay = sliceGoals
      ? +sliceGoals.volume / Difference_In_Days
      : null;

    while (date <= end && +sliceGoals.volume) {
      const sleep = "8";
      const eat = "4";
      const total = "24" - sleep - eat; //12

      //const r = total;

      const hours =
        total > parseInt(maxHoursNeededPerDay)
          ? parseInt(maxHoursNeededPerDay)
          : total;

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
  console.log(getTimes);
  //

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

  let total = sliceGoals ? +sliceGoals.volume : null;

  const sumArray = arrayConcat
    ? arrayConcat.reduce((acc, cur) => {
        const found = acc.find((val) => val.date === cur.date);

        if (found) {
          found.hours -= Number(cur.hours);

          total -= Number(cur.hours);
        } else {
          acc.push({ ...cur, hours: Number(cur.hours) });
        }
        return acc;
      }, [])
    : null;

  console.log(sumArray);

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

  const willDo = () => {
    const isVisoTuriu = Difference_In_Days * 24;
    const sleep = "8";
    const eat = "4";
    const iskrenta = "24" - sleep - eat; //12
    const totalIskrenta = iskrenta * Difference_In_Days;
    let sum = 0;

    for (let i = 0; i < getTimes.length; i++) {
      const element = getTimes[i].hoursBusy;
      sum += +element;
    }

    const kiekPerDienaLieka =
      (isVisoTuriu - totalIskrenta - sum) / Difference_In_Days;

    const kiekReikiaPerDiena = sliceGoals
      ? +sliceGoals.volume / Difference_In_Days
      : null;
    const spesiu =
      kiekReikiaPerDiena < kiekPerDienaLieka ? setOnTime(1) : setOnTime(0);
    return spesiu;
  };

  console.log(onTime);
  return (
    <>
      <div className="App">
        <div>
          <h1>Let's check your chance !</h1>
          <div>Today {currentDate}</div>
        </div>

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
          getResult={getResult}
          resFormated={resFormated}
          willDo={willDo}
        />

        <ResultList
          results={sumArray}
          times={times}
          onTime={onTime}
          willDo={willDo}
        />
      </div>
    </>
  );
}

export default App;
