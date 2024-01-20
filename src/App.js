import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import Patent from "./pages/Patent";

function App() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [boolean, setBoolean] = useState("");
  const [data, setData] = useState([]);
  const [booleanQueries, setBooleanQueries] = useState([]);
  const [selectedBoolean, setSelectedBoolean] = useState();
  const [multiQuery, setMultiQuery] = useState("");
  const [multiQueryEnabled, setMultiQueryEnabled] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchText={searchText}
                setSearchText={setSearchText}
                loading={loading}
                setLoading={setLoading}
                search={search}
                setSearch={setSearch}
                boolean={boolean}
                setBoolean={setBoolean}
                data={data}
                setData={setData}
                booleanQueries={booleanQueries}
                setBooleanQueries={setBooleanQueries}
                selectedBoolean={selectedBoolean}
                setSelectedBoolean={setSelectedBoolean}
                multiQuery={multiQuery}
                setMultiQuery={setMultiQuery}
                multiQueryEnabled={multiQueryEnabled}
                setMultiQueryEnabled={setMultiQueryEnabled}
              />
            }
          />
          <Route path="/patent/:id" element={<Patent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
