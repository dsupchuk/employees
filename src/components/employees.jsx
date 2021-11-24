import { useState, useEffect } from "react";
function Employees() {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [data, setData] = useState([]);
  const [localState, setLocalState] = useState([]);
  useEffect(() => {
    fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);
  useEffect(() => {
    if (localStorage.length) {
      for (var i = 0; i < localStorage.length; i++) {
        let curentId = document.getElementById(localStorage.key(i));
        if (curentId) {
          curentId.checked = "checked";
          let user = JSON.parse(localStorage[localStorage.key(i)]);
          let selectedTitle = document.getElementById(`${user.lastName}`);
          // console.log(selectedTitle);
          selectedTitle.style.color = "blue";
        }
      }
    }
  });
  useEffect(() => {
    let allData = [];
    for (var i = 0; i < localStorage.length; i++) {
      allData.push(localStorage[localStorage.key(i)]);
    }
    setLocalState(allData);
  }, []);

  function selectItem(e, i) {
    i.select = true;
    let title = document.getElementById(i.lastName);
    let input = document.getElementById(i.id);
    input.checked = "checked";
    title.style.color = "blue";
    setLocalState((prevState) => {
      return [...prevState, JSON.stringify(i)];
    });
    localStorage.setItem(i.id, JSON.stringify(i));
  }

  function removeDate(e, i) {
    i.select = false;
    localStorage.removeItem(i.id);
    console.log(localState);
    let indexElement = localState.findIndex((el) => {
      let some = JSON.parse(el);
      return some.id === i.id;
    });
    console.log(indexElement);
    let newLocalState = [...localState];
    newLocalState.splice(indexElement, 1);
    setLocalState(newLocalState);
    let title = document.getElementById(i.lastName);
    let input = document.getElementById(i.id + 1);
    input.checked = "checked";
    title.style.color = "black";
  }
  // console.log(localState);
  function getSome(i) {
    return data.map((item, index) => {
      if (i === item.firstName[0]) {
        return (
          <div key={index}>
            <div>
              <h4 id={item.lastName}>
                {item.firstName}&nbsp;
                {item.lastName}
              </h4>
              <input
                type="radio"
                name={item.id}
                id={item.id + 1}
                value="false"
                onChange={(e) => {
                  removeDate(e, item);
                }}
                defaultChecked
              />
              <label htmlFor={item.id + 1}>No Active</label>
              <br></br>
              <input
                type="radio"
                name={item.id}
                id={item.id}
                value="true"
                onChange={(e) => {
                  // setRadio(true);
                  selectItem(e, item);
                }}
              />
              <label htmlFor={item.id}>Active</label>
            </div>
          </div>
        );
      }
    });
  }
  function some() {
    return abc.split("").map((i) => {
      return (
        <div className="item_list">
          <h2>{i}</h2>
          {getSome(i).every((elem) => elem === undefined) ? (
            <p>----</p>
          ) : (
            getSome(i)
          )}
        </div>
      );
    });
  }
  function getData(date) {
    date = new Date(date);
    date.toISOString().substring(0, 10);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    switch (month) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        console.error(`eror`);
    }

    return <>{year + "-" + month + "-" + dt}</>;
  }
  function takeData() {
    var dat = [];
    if (localState.length !== 0) {
      for (var i = 0; i < localState.length; i++) {
        const list = JSON.parse(localState[i]);
        dat.push(
          <div>
            <h4 className="selectedData">
              {list.firstName} {list.lastName} --- {getData(list.dob)}
            </h4>
          </div>
        );
      }
      return dat;
    } else return <h4 className="selectedData">Employees List is empty</h4>;
  }
  return (
    <div className="container">
      <div className="colum-left">
        <h2>Employees</h2>
        <div className="item">{data.length ? some() : null}</div>
      </div>
      <div className="colum-right">
        <h2>Employees birthday</h2>
        <div className="savedData">{takeData()}</div>
      </div>
    </div>
  );
}
export default Employees;
