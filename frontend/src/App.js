import Table from "./components/Table/index"
import CreateStock from "./components/CreateStock"
import Graph from "./components/Graph";
function App() {

  return (
    <div className="App">
        <CreateStock/>
        <Table/>
        <Graph/>
    </div>
  );
}

export default App;
