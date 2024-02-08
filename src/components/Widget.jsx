import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useState } from "react";

Widget.propTypes = {
  widget: PropTypes.shape({
    location: PropTypes.string,
    temperature: PropTypes.string,
    last_updated: PropTypes.string,
    condition_text: PropTypes.string,
    condition_icon: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default function Widget({ widget, handleDelete }) {
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowRemoveConfirmation(true);
  };

  const handleCancel = () => {
    setShowRemoveConfirmation(false);
    setRemoving(false);
  };

  const handleRemove = () => {
    setRemoving(true);
    handleDelete(widget.id);
  };

  const renderWidget = () => {
    if (showRemoveConfirmation) {
      return (
        <Card className="card flex-container flex-column">
          <Card.Title>Remove widget?</Card.Title>
          <div className="flex-container flex-row" style={{ gap: "5px" }}>
            <Button variant="outline-danger" size="sm" onClick={handleRemove}>
              Remove
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Card>
      );
    }
    if (removing) {
      return (
        <Card className="card">
          <Card.Title>Removing widget...</Card.Title>
        </Card>
      );
    }
    if (widget.length === 0) {
      return (
        <Card className="card">
          <Card.Title>Loading widget...</Card.Title>
        </Card>
      );
    }
    return (
      <Card className="card" onContextMenu={(e) => handleRightClick(e)}>
        <Card.Img
          variant="top"
          src={widget.condition_icon}
          style={{ width: "80px", height: "80px", marginBottom: "-25px" }}
        />
        <Card.Body>
          <Card.Title>{widget.location}</Card.Title>
          <Card.Title>{widget.temperature} </Card.Title>
          <Card.Subtitle className="mb-2 text" style={{ fontSize: "80%" }}>
            {widget.condition_text}
          </Card.Subtitle>
          <Card.Subtitle
            className="mb-2 text-muted"
            style={{ fontSize: "75%" }}
          >
            {widget.last_updated}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  };

  return renderWidget();
}
