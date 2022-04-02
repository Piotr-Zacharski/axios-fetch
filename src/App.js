import axios from "axios";
import { useState } from "react";
import { Paper, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function App() {
  const [people, setPerson] = useState([]);
  const [arePeople, setArePeople] = useState(false);

  const fetchPeople = () => {
    axios
      .get(`https://futuramaapi.herokuapp.com/api/v2/characters`)
      .then((res) => {
        console.log(res);
        setPerson(res.data);
        setArePeople(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hidePeople = () => {
    setPerson([]);
    setArePeople(false);
  };

  return (
    <div className="App">
      <h1>Futurama - characters</h1>
      {!arePeople && <Button onClick={() => fetchPeople()}>Fetch</Button>}
      {arePeople && <Button onClick={() => hidePeople()}>Hide</Button>}
      {people.map((person) => {
        return (
          <Paper
            key={uuidv4()}
            elevation={24}
            style={{ width: 630, textAlign: "center", margin: "0 auto" }}
          >
            <h4>Imię: {person.Name}</h4>
            <h5>Zawód: {person.Profession}</h5>
            <h5>Planeta: {person.Planet}</h5>
            <h5>Gatunek: {person.Species}</h5>
            <h5>Pierwszy występ: {person.FirstAppearance}</h5>
            <h6>Wiek: {person.Age}</h6>
            <img src={person.PicUrl} alt={person.Name} />
          </Paper>
        );
      })}
    </div>
  );
}

export default App;
