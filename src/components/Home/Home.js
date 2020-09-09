import React,{useState, useContext, useEffect, useRef} from "react";

import { Card, Icon, Button } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { Appcontext } from "../Context/ContextProvider";

const Home = (props) => {
    const {command } = useContext(Appcontext);
    const el = useRef(null);
  const Movies = [
    {
      _id: 1,
      Name: "Jigarthanda",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/jigarthanda1_PIdYou0Zl.jpg",
      Duration: "2h 51m",
      featured: true,
    },
    {
      _id: 2,
      Name: "Thithi",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/Tithi_UT7MRU-giO.jpg",
      Duration: "2h 3m",
      featured: false,
    },
    {
      _id: 3,
      Name: "Super Deluxe",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/SuperDeleuxe_NEszo3XYg.jpg",
      Duration: "2h 56m",
      featured: false,
    },
    {
      _id: 4,
      Name: "Pariyerum Perumal",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/Pariyerum-1_rrH41tVD-.jpg",
      Duration: "2h 34m",
      featured: false,
    },
    {
      _id: 5,
      Name: "Cat Sticks",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/CatSticks_O5nP66Mt1.jpg",
      Duration: "1h 34m",
      featured: false,
    },
    {
      _id: 6,
      Name: "Andhadhun",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/AndhaDhun_LYHHBmTRG.jpg",
      Duration: "2h 30m",
      featured: true,
    },
    {
      _id: 7,
      Name: "The Pick-up Artist",
      imageUrl:
        "https://ik.imagekit.io/i8wrodkqzr/ThePickupArtist_JqjeRYcepP.jpg",
      Duration: "1h 21m",
      featured: false,
    },
    {
      _id: 8,
      Name: "Care of Kancharapalem",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/co_gskABDVN-.jpg",
      Duration: "2h 32m",
      featured: true,
    },
    {
      _id: 9,
      Name: "Premam",
      imageUrl: "https://ik.imagekit.io/i8wrodkqzr/premam_TClGpcE5so.jpg",
      Duration: "2h 44m",
      featured: true,
    },
  ];
  useEffect(() => {
    voiceCommands()
  }, [command])

  const voiceCommands=()=>{


    switch (command) {
      case "form":
        props.history.push("/FormPage");
        break;
      case "HomePage":
        props.history.push("/");
        break;
      case "bottom":
        el.current.scrollIntoView({ block: "end", behavior: "smooth" });
        break;
      case "top":
        el.current.scrollIntoView({ block: "start", behavior: "smooth" });
        break;
     
      
  
      default:
        break;
    }
  }



  return (
    <div id={"el"} ref={el} style={{overflow:'hidden'}} >
      <Row>
        {Movies.length === 0 ? (
          <h2>sasasa</h2>
        ) : (
          Movies.map((game, i) => (
            <Col key={game._id} xs={12} xl={3}>
              <Card
                key={game._id}
                style={{ width: 300, margin: 20 }}
                cover={
                  <img
                    src={game.imageUrl}
                    alt="Logo"
                    style={{ width: 300, height: 250 }}
                  />
                }
              >
                <Icon
                  type="star"
                  style={{
                    float: "right",
                    fontSize: 25,
                    color: game.featured ? "#1E77EB" : "unset",
                  }}
                />
                <h2>{game.Name}</h2>
                <strong>{game.Duration}</strong>
                <br />
                <br />
                <div style={{ display: "flex" }}>
                  <Button style={{ width: "50%", paddingRight: 10 }}>
                    <Icon type="edit" />
                  </Button>
                  &nbsp;
                  <Button style={{ width: "50%" }}>
                    <Icon type="delete" />
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Home;
