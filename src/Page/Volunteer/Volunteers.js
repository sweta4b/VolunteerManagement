import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";

import {
  addVolunteer,
  deleteVolunteer,
  fetchVolunteers
} from "../../Features/volunteerSlice";
import { fetchEvents } from "../../Features/eventSlice";

export default function Volunteers() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const volunteers = useSelector((state) => state.volunteers.volunteers);
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.volunteers.status);
  const error = useSelector((state) => state.volunteers.error);
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    phoneNo: "",
    address: "",
    availability: "",
    interest: "",
    skills: "",
    event: ""
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
      dispatch(fetchVolunteers());
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const uniqueEvents = events.map((event) => event.name);

  const handleAddVolunteer = () => {
    // console.log(newVolunteer);
    handleClose();
    dispatch(addVolunteer(newVolunteer));
  };

  const handleDelete = (volunteerId) => {
    dispatch(deleteVolunteer(volunteerId));
  };

  return (
    <div className="container">
      <div className="container-data">
        <h1>Volunteers List</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {volunteers?.map((volunteer) => (
          <div key={volunteer._id}>
            <p>
              <strong>Name:</strong> {volunteer.name.toUpperCase()}{" "}
            </p>
            <div className="link-btn">
              <button onClick={() => handleDelete(volunteer._id)}>
                Delete
              </button>
              <Link to={`/volunteer/${volunteer._id}`}>View Details</Link>
            </div>
          </div>
        ))}
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
        >
          Add volunteer
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-availability"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Volunteer Form
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, name: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Phone No"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, phoneNo: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, address: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Availability"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewVolunteer({
                  ...newVolunteer,
                  availability: e.target.value
                })
              }
            />
            <TextField
              id="standard-basic"
              label="Interest "
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, interest: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Skills"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, skills: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, event: e.target.value })
              }
            >
              <option>Select Event</option>
              {uniqueEvents.map((event) => (
                <option value={event}>{event}</option>
              ))}
            </select>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddVolunteer}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
