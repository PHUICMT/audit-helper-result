import "./App.css";
import { Route, Routes } from "react-router-dom";

import PageHeader from "./components/page_header/PageHeader";
import CsvUploader from "./components/csv_uploader/CsvUploader";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CsvUploader/>} />
        <Route path="/page_header" element={<PageHeader/>} />
      </Routes>
    </div>
  );
}

export default App;
