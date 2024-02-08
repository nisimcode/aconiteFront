import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  ADD_WEATHER_WIDGET_URL,
  GET_WEATHER_WIDGETS_URL,
  REMOVE_WEATHER_WIDGET_URL,
} from "../utils/url.js";
import AuthContext from "../context/AuthContext.jsx";
import Widget from "../components/Widget.jsx";
import { Form, Button } from "react-bootstrap";

export default function Weather() {
  const { authHeadersConfig } = useContext(AuthContext);
  const [widgets, setWidgets] = useState([]);
  const [newLocation, setNewLocation] = useState("");

  const getWeather = () => {
    axios
      .get(GET_WEATHER_WIDGETS_URL, authHeadersConfig)
      .then((response) => {
        console.log("DATA RECEIVED: ", response.data);
        setWidgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching widgets:", error);
      });
  };

  useEffect(() => {
    getWeather();
  }, [widgets]); // Empty dependency array ensures the effect runs only once on component mount

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("weatherFetchTime");
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (!lastFetchTime || currentTime - parseInt(lastFetchTime, 10) > oneHour) {
      getWeather();
      localStorage.setItem("weatherFetchTime", currentTime.toString());
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  const handleNewLocationSubmit = (e) => {
    e.preventDefault();
    // Send new location name to Django to create a new widget instance
    axios
      .post(
        ADD_WEATHER_WIDGET_URL,
        { location: newLocation },
        authHeadersConfig
      )
      .then((response) => {
        console.log("response status: ", response.status);
        if (response.status === 201) {
          setWidgets([...widgets, response.data]); // Add the new widget to the existing list
          setNewLocation(""); // Clear the input field
        }
      })
      .catch((error) => {
        console.error("Error creating widget:", error);
      });
  };

  const handleDelete = (widgetId) => {
    console.log("DELETING: ", widgetId);
    axios
      .patch(REMOVE_WEATHER_WIDGET_URL, { id: widgetId }, authHeadersConfig)
      .then((response) => {
        if (response.status === 204) {
          setWidgets(widgets.filter((widget) => widget.id !== widgetId));
        }
      })
      .catch((error) => {
        console.error("Error deleting widget:", error);
      });
  };

  const renderWeatherWidgets = () => {
    if (widgets.length === 0) {
      return <h3>Loading widgets...</h3>;
    }
    return widgets.map((widget) => (
      <Widget key={widget.id} widget={widget} handleDelete={handleDelete} />
    ));
  };

  return (
    <div className="flex-container flex-column">
      <Form className="header" onSubmit={handleNewLocationSubmit}>
        <Form.Group controlId="formBasicLocation">
          <Form.Control
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter location name"
          />
        </Form.Group>
        <Button variant="outline-success" size="sm" type="submit">
          Add Widget
        </Button>
      </Form>
      <div
        className="flex-container flex-row"
        style={{ flexWrap: "wrap", width: "75%" }}
      >
        {renderWeatherWidgets()}
      </div>
      <div className="footer">
        <a
          href="https://www.weatherapi.com/"
          title="Free Weather API"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
            border="0"
          />
        </a>
      </div>
    </div>
  );
}
