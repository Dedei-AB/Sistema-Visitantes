import "./Css/App.css";
import NovaPessoa from "./NovaPessoa";
import ListaPresentes from "./ListaPresentes";
import ListaCadastrados from "./ListaCadastrados";
import { VisitasProvider } from "./VisitasContext";

function App() {
  return (
    <VisitasProvider>
      <div className="app-layout">
        <NovaPessoa />
        <div className="busca">
          <ListaPresentes />
          <ListaCadastrados />
        </div>
      </div>
    </VisitasProvider>
  );
}

export default App;
