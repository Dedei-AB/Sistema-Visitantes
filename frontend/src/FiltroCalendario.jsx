import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Css/FiltroCalendario.css"

function FiltroCalendario() {
  const [periodo, setPeriodo] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <div className="data-filtro-cadastrados">
        <h3>Selecione um período:</h3>
        <span
          className="descricao-calendario"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <i className="bi bi-calendar-range"></i>
          {periodo[0].startDate.toLocaleDateString()} -{" "}
          {periodo[0].endDate.toLocaleDateString()}
        </span>
      </div>

      {showCalendar && (
        <div className="calendario-cadastrados">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setPeriodo([item.selection])}
            ranges={periodo}
            dateDisplayFormat="dd-MM-yyyy"
            direction="horizontal"
            months={1}
          />
          <button
            onClick={() => setShowCalendar(false)}
            className="botao-calendario"
          >
            OK
          </button>
        </div>
      )}
    </>
  );
}

export default FiltroCalendario;
