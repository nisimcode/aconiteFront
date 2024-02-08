import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ADD_WEATHER_WIDGET_URL,
  GET_WEATHER_WIDGETS_URL,
  REMOVE_WEATHER_WIDGET_URL,
  VERIFY_LOCATION_URL, // new URL for verifying the location
} from "../utils/url.js";
import AuthContext from "../context/AuthContext.jsx";
import Widget from "../components/Widget.jsx";
import { Form, Button, Modal } from "react-bootstrap";
import { string } from "prop-types"; // import Modal

export default function Weather() {
  const { authHeadersConfig } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [newLocation, setNewLocation] = useState("");
  const [showModal, setShowModal] = useState(false); // state for showing modal
  const [verifiedLocation, setVerifiedLocation] = useState(""); // state for storing verified location

  const {
    data: widgets,
    refetch: getWeather,
    isLoading, // loading state
    isRefetching,
  } = useQuery({
    queryKey: ["weatherWidgets"],
    queryFn: () =>
      axios
        .get(GET_WEATHER_WIDGETS_URL, authHeadersConfig)
        .then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 1 hour in milliseconds
  });

  const addWidgetMutation = useMutation({
    mutationFn: (newLocation) =>
      axios.post(
        ADD_WEATHER_WIDGET_URL,
        { location: newLocation },
        authHeadersConfig
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("weatherWidgets");
      setNewLocation("");
    },
  });

  const deleteWidgetMutation = useMutation({
    mutationFn: (widgetId) =>
      axios.patch(
        REMOVE_WEATHER_WIDGET_URL,
        { id: widgetId },
        authHeadersConfig
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("weatherWidgets");
    },
  });

  const verifyLocationMutation = useMutation({
    mutationFn: (location_to_verify) =>
      axios.post(
        VERIFY_LOCATION_URL,
        { location: location_to_verify },
        authHeadersConfig
      ),
    onSuccess: (response) => {
      setVerifiedLocation(response.data["location_found"]);
      setShowModal(true);
    },
    onError: () => {
      console.log("Error verifying location!");
    },
  });

  const handleNewLocationSubmit = (e) => {
    e.preventDefault();
    verifyLocationMutation.mutate(newLocation);
  };

  const handleConfirmLocation = () => {
    addWidgetMutation.mutate(verifiedLocation);
    setNewLocation("");
    setShowModal(false);
  };

  const handleAbortLocation = () => {
    setNewLocation("");
    setShowModal(false);
  };

  const handleDelete = (widgetId) => {
    deleteWidgetMutation.mutate(widgetId);
  };

  const renderWeatherWidgets = () => {
    if (isLoading) {
      return <h3>Loading widgets...</h3>;
    }
    if (isRefetching) {
      return <h3>Updating widgets...</h3>;
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
      <Modal show={showModal} onHide={handleAbortLocation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You entered: {newLocation} <br />
          Is this the location you meant: {verifiedLocation}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAbortLocation}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmLocation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="flex-container flex-row"
        style={{ flexWrap: "wrap", width: "100%" }}
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
