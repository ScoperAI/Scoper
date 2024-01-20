import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function Main(props) {
  const {
    searchText,
    setSearchText,
    loading,
    setLoading,
    search,
    setSearch,
    boolean,
    setBoolean,
    data,
    setData,
    booleanQueries,
    setBooleanQueries,
    selectedBoolean,
    setSelectedBoolean,
    multiQuery,
    setMultiQuery,
    multiQueryEnabled,
    setMultiQueryEnabled,
  } = props;
  useEffect(() => {
    console.log("booleanQueries", booleanQueries);
    console.log("selectedBoolean", selectedBoolean);
    console.log("multiQuery", multiQuery);
    console.log("multiQueryEnabled", multiQueryEnabled);
    console.log("search", search);
    console.log("boolean", boolean);
  }, [
    booleanQueries,
    selectedBoolean,
    multiQuery,
    multiQueryEnabled,
    search,
    boolean,
  ]);

  useEffect(() => {
    if (selectedBoolean == null) {
      setData([]);
      setBoolean("");
      return;
    }
    setLoading(true);
    axios
      .get(
        "http://halps.mynetgear.com:50100/?query=" +
          // turn the string into a url friendly string
          encodeURIComponent(search) +
          "&boolean=" +
          encodeURIComponent(boolean)
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      });
  }, [selectedBoolean]);

  useEffect(() => {
    setBoolean("");
    setSelectedBoolean(null);
    setData([]);
  }, [multiQueryEnabled]);
  const searchDatabase = () => {
    setSelectedBoolean(null);
    setBoolean("");
    setLoading(true);
    setBooleanQueries([]);
    axios
      .get(
        "http://halps.mynetgear.com:50100/boolean?query=" +
          encodeURIComponent(search)
      )
      .then((res) => {
        const formattedData = res.data.map((item) => ({
          editing: false,
          used: false,
          query: item,
        }));
        console.log(formattedData);
        setData([]); // Reset data if necessary
        setBoolean("");
        setBooleanQueries([...formattedData]);
        setLoading(false);
      });

    // axios
    //   // .get("https://3a57-69-112-96-246.ngrok-free.app/?query=" + search)
    //   // pass query and boolean
    //   .get(
    //     "http://localhost:5000/?query=" +
    //       // turn the string into a url friendly string
    //       encodeURIComponent(search) +
    //       "&boolean=" +
    //       encodeURIComponent(boolean)
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setData(res.data);
    //     setLoading(false);
    //     setBooleanQueries([]);
    //   });
  };
  const multiQuerySearch = () => {
    let newBoolean = multiQuery;
    for (let i = 0; i < booleanQueries.length; i++) {
      newBoolean = newBoolean.replace("Q" + (i + 1), booleanQueries[i].query);
    }
    console.log(newBoolean);
    setBoolean(newBoolean);
    axios
      .get(
        "http://halps.mynetgear.com:50100/?query=" +
          // turn the string into a url friendly string
          encodeURIComponent(search) +
          "&boolean=" +
          encodeURIComponent(newBoolean)
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/scoperWhite.png" className="App-logo" alt="logo" />
        <div className="flex w-full flex-col justify-center items-center">
          <textarea
            className="text-sm px-4 py-2 w-2/3 rounded-lg text-black"
            placeholder="Enter a paragraph describing your idea here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="flex flex-row h-full mt-4 justify-center items-center space-x-4">
            <button
              className="drop-shadow-xl bg-white text-black text-sm hover:bg-gray-300 font-bold py-2 px-4 rounded"
              onClick={() => {
                searchDatabase();
              }}
            >
              Search for your idea
            </button>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={multiQueryEnabled}
                class="sr-only peer"
                onChange={(e) => setMultiQueryEnabled(e.target.checked)}
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">
                Multi-Query
              </span>
            </label>
          </div>
        </div>
        {/* <input
          className="text-md px-4 py-2 w-2/3 mt-8 rounded-lg text-black"
          placeholder="Enter your boolean query here"
          onChange={(e) => setBoolean(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              axios
                // .get("https://3a57-69-112-96-246.ngrok-free.app/?query=" + search)
                // pass query and boolean
                .get(
                  "http://localhost:5000/?query=" +
                    // turn the string into a url friendly string
                    encodeURIComponent(search) +
                    "&boolean=" +
                    encodeURIComponent(boolean)
                )
                .then((res) => {
                  console.log(res.data);
                  setData(res.data);
                  setLoading(false);
                });
            }
          }}
          value={boolean}
        /> */}
        {/* <p className="text-gray-400 text-sm text-left mt-4">
          Boolean query example: (apple AND fruit) OR (orange AND fruit)
          {"http://localhost:5000/?query=" +
            // turn the string into a url friendly string
            encodeURIComponent(search) +
            "&boolean=" +
            encodeURIComponent(boolean)}
        </p> */}

        {multiQueryEnabled && booleanQueries.length > 0 && (
          <div className="flex flex-row justify-center items-center w-full">
            <input
              className="mt-4 mx-4 mb-4 text-sm w-1/2 px-4 py-2 rounded-lg text-black"
              placeholder="Enter your multi-query here. Ex: (Q1 | Q2) & Q3"
              onChange={(e) => setMultiQuery(e.target.value)}
              value={multiQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  multiQuerySearch();
                }
              }}
            />
            <button
              className="drop-shadow-xl bg-white text-black text-sm hover:bg-gray-300 font-bold py-2 px-4 rounded"
              onClick={() => {
                multiQuerySearch();
              }}
            >
              Conduct Multi-Search
            </button>
          </div>
        )}

        {booleanQueries.map((item, index) => (
          <div className="bg-gray-600 flex justify-center items-center m-2 p-1 rounded-lg">
            {item.editing ? (
              <input
                className="text-sm px-4 py-2 w-2/3 rounded-lg text-black"
                placeholder="Enter your boolean query here"
                onChange={(e) => {
                  const newQueries = [...booleanQueries];
                  newQueries[index].query = e.target.value;
                  setBooleanQueries(newQueries);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const newQueries = [...booleanQueries];
                    newQueries[index].editing = false;
                    setBooleanQueries(newQueries);
                  }
                }}
                value={item.query}
              />
            ) : (
              <p className="text-gray-400 text-sm text-left">
                Q{index + 1}. {item.query}
              </p>
            )}

            {/* create an edit button and allow user to edit text when selected */}
            {item.editing ? (
              <button
                className="text-sm ml-4 rounded-lg bg-blue-400 p-1"
                onClick={() => {
                  const newQueries = [...booleanQueries];
                  newQueries[index].editing = false;
                  setBooleanQueries(newQueries);
                }}
              >
                Done
              </button>
            ) : (
              <button
                className="text-sm ml-4 rounded-lg bg-gray-400 px-1"
                onClick={() => {
                  const newQueries = [...booleanQueries];
                  newQueries[index].editing = true;
                  setBooleanQueries(newQueries);
                }}
              >
                Edit
              </button>
            )}
            {selectedBoolean === index && (
              <button
                onClick={() => {
                  // remove this index from selectedBoolean
                  setSelectedBoolean(null);
                }}
                className="text-gray-400 text-md text-left ml-4"
              >
                ✅
              </button>
            )}
            {!(selectedBoolean === index) && !multiQueryEnabled && (
              <button
                className="text-sm ml-4 rounded-lg bg-blue-400 p-1"
                onClick={() => {
                  setBoolean(item.query);
                  setSelectedBoolean(index);
                }}
              >
                Choose
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex flex-col justify-center items-center my-20">
            <ClipLoader color="#ffffff" loading={true} size={50} />
            <p className="text-xl mt-4">Loading...</p>
          </div>
        )}
        {data.map((item) => (
          <div className="flex flex-col mx-20">
            <div className="flex flex-row justify-start text-left items-end">
              <h1 className="text-2xl mr-8">{item.title}</h1>
            </div>
            <div className="flex flex-row justify-start text-left items-end">
              <p className="text-sm">Patent ID: {item.id}</p>
              <p className="text-sm ml-2">Year: {item.date}</p>
              {/* Link to https://patents.google.com/patent/US{item.id} */}
              {/*  CLicking on the link should open new tab */}
              <a
                className="text-sm ml-2 text-blue-500"
                href={"https://patents.google.com/patent/US" + item.id}
                target="_blank"
              >
                View on Google Patents
              </a>
              <Link
                className="text-sm rounded-lg bg-blue-400 ml-2 px-1"
                to={"/patent/US" + item.id}
              >
                View More
              </Link>
            </div>

            {/* get only the next 100 words after "SUMMARY" in all caps found in item.summary*/}
            {/* ALSO INCLUDE THE WORD SUMMARY AS FIRST WORD */}
            <p className="text-gray-400 text-sm text-left">
              {/* get first 100 words in summary */}
              {item.summary.split(" ").slice(0, 100).join(" ")}
            </p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default Main;
