import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //give an initial state so that the data won't be undefined at start
  const [bids, setBids] = useState([0]);

  function updateBirds(num: number) {
    setBids([...bids, num]);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9001");

    ws.onopen = (event: Event) => {
      console.log("Connection established : ", event);
      ws.send(JSON.stringify({ hello: "world" }));
    };

    ws.onmessage = function (event: MessageEvent) {
      const json = JSON.parse(event.data);
      try {
        console.log("msg received : ", json);
        updateBirds(bids.length);
      } catch (err) {
        console.log(err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //map the first 5 bids
  const firstBids = bids.map((item) => {
    return (
      <div key={`${item}`}>
        <p>{item}</p>
      </div>
    );
  });

  return <div>{firstBids}</div>;
}

export default App;
