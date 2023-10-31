import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";

import { addEvent, deleteEvent, fetchEvents } from "../../Features/eventSlice";

export default function Events() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    volunteers: "",
    volunteerRole: "",
    location: ""
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const handleAddEvent = () => {
    // console.log(newEvent);
    handleClose();
    dispatch(addEvent(newEvent));
  };

  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="container">
      <div className="container-data">
        <h1>Events List</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {events?.map((event) => (
          <div key={event._id}>
            <p>
              <strong>Name:</strong> {event.name.toUpperCase()}{" "}
            </p>
            <div className="link-btn">
              <button onClick={() => handleDelete(event._id)}>Delete</button>
              <Link to={`/event/${event._id}`}>View Details</Link>
            </div>
          </div>
        ))}
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
        >
          Add Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Event Form
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              variant="standard"
              type="time"
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Volunteer Role "
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewEvent({ ...newEvent, volunteerRole: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="No of Volunteer"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewEvent({ ...newEvent, volunteers: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Location"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddEvent}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
