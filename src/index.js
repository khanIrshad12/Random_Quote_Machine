import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import ReactDom, { render } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faTwitter,
  faFontAwesome,
  faTumblr
} from "@fortawesome/free-brands-svg-icons";
//

library.add(faTwitter, faFontAwesome, faTumblr);

function Machine() {
  const [qutos, setQutos] = useState([]);
  const [randomQutos, setRandomQutos] = useState([]);
  const [color, setColor] = useState("#111");

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://type.fit/api/quotes");
      let data = await response.json();
      setQutos(data);
      let randomIndex = Math.floor(Math.random() * data.length);

      setRandomQutos(data[randomIndex]);
    }
    fetchData();
  }, []);
  function getNxtQuot() {
    var colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];
    let randomIndex = Math.floor(Math.random() * qutos.length);
    let randomColor = Math.floor(Math.random() * colors.length);
    console.log(randomIndex);
    console.log(qutos);
    setRandomQutos(qutos[randomIndex]);
    setColor(colors[randomColor]);
  }

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container pt-5 ">
        <div className="h-100 p-5 bg-light border rounded-3">
          <div className="card">
            <div className="card-header">
              <h5>Inspiring Quotos</h5>
            </div>
            <div className="card-body">
              {randomQutos ? (
                <>
                  <h5 className="card-title">
                    -{randomQutos.author || "no Author"}
                  </h5>
                  <p className="card-text">
                    <span style={{ fontSize: "50px", color: color }}>
                      <FaQuoteLeft />
                    </span>
                    {randomQutos.text}
                  </p>
                </>
              ) : (
                <h2>Loading...</h2>
              )}
              <div className="col">
                <button
                  className="btn  ml-5 btn-sm"
                  style={{ color: "#fff", backgroundColor: color }}
                  onClick={getNxtQuot}
                >
                  Next Quots
                </button>
                <a
                  className="twitter"
                  style={{ color: color }}
                  rel="noopener"
                  href={
                    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                    encodeURIComponent(
                      '"' + randomQutos.text + '" ' + randomQutos.author
                    )
                  }
                >
                  <FontAwesomeIcon icon="fa-brands fa-twitter" />
                </a>
                <a
                  className="tumbler "
                  style={{ color: color }}
                  rel="noopener"
                  href={
                    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                    encodeURIComponent(randomQutos.author) +
                    "&content=" +
                    encodeURIComponent(randomQutos.text) +
                    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                  }
                >
                  <FontAwesomeIcon icon="fa-brands fa-tumblr" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ReactDom.render(<Machine />, document.getElementById("root"));
