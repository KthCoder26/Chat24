import "../src/index.css"
import { Maincontainer } from "./MainContainer/Maincontainer";
import { Navbar } from "./Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Maincontainer/>
    </div>
  );
}

export default App;
