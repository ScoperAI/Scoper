import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";

function Patent(props) {
  const { searchText } = props;
  // get patent id from url
  const { id } = useParams();
  const [patentData, setPatentData] = useState(null);
  const [patentImages, setPatentImages] = useState(null);
  const [description, setDescription] = useState(null);
  const [claims, setClaims] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [currImage, setCurrImage] = useState(0);

  const handleHover = (image, length) => {
    setHovered({
      image: image,
      length: length,
    });
  };

  const handleHoverExit = () => {
    setHovered(null);
  };

  useEffect(() => {
    console.log(id);
    if (!patentData) {
      axios({
        method: "GET",
        url: "http://halps.mynetgear.com:50100/patentFetch",
        params: {
          id: id,
        },
      })
        .then((response) => {
          // set searchResults to response.data
          setPatentData(response.data);
          console.log(response.data);
        })
        .then(() => {
          axios({
            method: "GET",
            url: "http://halps.mynetgear.com:50100/patentImageFetch",
            params: {
              id: id,
            },
          }).then((response) => {
            // set searchResults to response.data
            setPatentImages(response.data);
            console.log(response.data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (!description) {
      axios({
        method: "GET",
        url: "http://halps.mynetgear.com:50100/descriptionFetch",
        params: {
          id: id,
        },
      })
        .then((response) => {
          // set searchResults to response.data
          setDescription(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [description]);

  useEffect(() => {
    if (!claims) {
      axios({
        method: "GET",
        url: "http://halps.mynetgear.com:50100/claimFetch",
        params: {
          id: id,
        },
      })
        .then((response) => {
          // set searchResults to response.data
          setClaims(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [claims]);

  return (
    <div className="flex flex-row justify-start w-full">
      {/* <div className="flex flex-col justify-start items-start w-1/2">
        {patentData && (
          // create a box that contains a list of all the image download urls and have a button that says download all
          <button
            className="bg-slate-800 text-white p-2 rounded-xl"
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(patentData.images).slice(1, -1) + ", "
              );
            }}
          >
            Copy Image Links
          </button>
        )}
      </div> */}
      {hovered && (
        <div
          style={{ zIndex: 100 }}
          className="fixed top-20 right-10 text-black bg-slate-800 text-white p-4 rounded-xl overflow-auto"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height:
                patentImages.images[currImage].orientation === "sideways"
                  ? "auto"
                  : "500px",
              width:
                patentImages.images[currImage].orientation === "sideways"
                  ? "500px"
                  : "auto",
            }}
          >
            <img
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                transform:
                  patentImages.images[currImage].orientation === "sideways" &&
                  "rotate(90deg)",
              }}
              className="border-black border p-2 bg-white"
              src={hovered.image}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            {patentImages.short_figure_descriptions.linked[currImage].map(
              (item, i) => (
                <p className="my-2" key={i}>
                  {item}
                </p>
              )
            )}
          </div>
        </div>
      )}
      <div className="text-black flex min-w-1/2 w-1/2 flex-col mx-32 mt-12 lg-my-64">
        {/* <Document>
                    <Page size="A4" pageNumber={1} />
                    <View style={{ position: "absolute", top: 0, left: 0 }}>
                      <Image
                        src={`https://patentimages.storage.googleapis.com/${result.patent.figures[0].full}`}
                      />
                    </View>
                  </Document> */}
        <Link to="/">
          <button className="bg-slate-800 text-white p-2 rounded-xl">
            Back to Search
          </button>
        </Link>
        {patentData && (
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h1 className="text-lg font-bold"> {patentData.title} </h1>
            </div>
            <div className="flex flex-col my-4">
              {patentData.abstract && (
                <div className="flex flex-col">
                  <h2 className="text-lg mr-8">Abstract</h2>
                  <div className="flex flex-col text-sm text-black rounded-lg py-2">
                    <p className="my-2">{patentData.abstract.split("\n")[2]}</p>
                  </div>
                </div>
              )}
              {/* horizontally scrollable image carousel */}
              {patentImages && patentImages.images && (
                <div className="flex flex-col my-8">
                  <h2 className="text-lg mr-8">Images</h2>
                  <div className="h-128 py-4 bg-gray-300 mt-4 overflow-x-scroll flex flex-row rounded-lg">
                    {patentImages.images.map((image, i) => (
                      <div className="flex flex-col justify-center items-center">
                        <div
                          className="flex p-4 justify-center items-center bg-white"
                          style={{
                            minWidth: 250,
                            maxHeight: 250,
                            minHeight: 250,
                          }}
                        >
                          <img
                            className="w-full py-1"
                            src={image.url}
                            alt="patent image"
                            style={{
                              objectFit: "contain",
                              maxHeight: 250,
                              maxWidth: 250,

                              // width: "200px",
                              // if image.orientation == "sideways" then rotate 90deg
                              transform:
                                // get orientation using curImage
                                patentImages.images[i].orientation ==
                                  "sideways" && "rotate(90deg)",
                            }}
                            onMouseEnter={() => {
                              handleHover(
                                patentImages.images[i].url,
                                patentImages.images.length
                              );
                              setCurrImage(i);
                            }}
                            onMouseLeave={() => {
                              handleHoverExit();
                              setCurrImage(0);
                            }}
                          />
                        </div>
                        {/* <h2 className="text-black">
                          FIG.{" "}
                          {patentData.short_figure_descriptions.pages[i] &&
                            patentData.short_figure_descriptions.pages[i].map(
                              (item, i) => {
                                return item + ", ";
                              }
                            )}
                        </h2> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {patentImages && patentImages.short_figure_descriptions && (
                <div className="flex flex-col">
                  <h2 className="text-lg mr-8">Figure Description</h2>
                  <div className="flex flex-col text-sm text-black rounded-lg py-2">
                    {patentImages.short_figure_descriptions.array.map(
                      (item, i) => (
                        <p className="my-2" key={i}>
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-16 mx-8 min-w-1/2 w-1/2">
        <div className="flex flex-row justify-start">
          <div className="flex flex-col justify-start items-start">
            {patentData && !description && (
              <div className="flex flex-row justify-center items-center py-4">
                <h2 className="text-lg mr-8">
                  Relevant Description (Powered by AI):{" "}
                </h2>
                <BarLoader
                  className="mt-1"
                  color={"#000000"}
                  loading={true}
                  size={150}
                />
              </div>
            )}
            {description && (
              <div className="flex flex-col">
                <h2 className="py-4 text-lg">
                  Relevant Description (Powered by AI):{" "}
                </h2>
                <div className="flex flex-col bg-slate-500 rounded-lg text-white px-4 py-2">
                  {description.split("\n").map((item, i) => (
                    <p className="my-2" key={i}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          {patentData && !claims && (
            <div className="flex flex-row space-between justify-start items-center py-4">
              <h2 className="text-lg mr-8">
                Relevant Claims (Powered by AI):{" "}
              </h2>
              <BarLoader
                className="mt-1"
                color={"#000000"}
                loading={true}
                size={150}
              />
            </div>
          )}
          {claims && (
            <div className="flex flex-col">
              <h2 className="py-4 text-lg">
                Relevant Claims (Powered by AI):{" "}
              </h2>
              <div className="flex flex-col w-full bg-slate-500 rounded-lg text-white px-4 py-2 w-1/2">
                {claims.split("\n").map((item, i) => (
                  <p className="my-2" key={i}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Patent;
