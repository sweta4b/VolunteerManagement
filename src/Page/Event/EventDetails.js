import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { fetchEvents } from "../../Features/eventSlice";
import { fetchVolunteers } from "../../Features/volunteerSlice";

export default function EventDetails() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.events);
  const volunteers = useSelector((state) => state.volunteers.volunteers);
  const event = events.find(({ _id }) => _id === eventId);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchVolunteers());
  }, [dispatch]);

  const volunteerNames = volunteers.filter(
    (volunteer) => volunteer.event === event.name
  );

  return (
    <div className="container">
      <div className="container-data">
        <h1>Event Details</h1>
        <p>
          <strong>Name:</strong> {event.name.toUpperCase()}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Time:</strong> {event.time}
        </p>
        <p>
          <strong>Description:</strong> {event.description.toUpperCase()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>No of Volunteer:</strong> {event.volunteers}
        </p>
        <p>
          <strong>Volunteer Role:</strong> {event.volunteerRole.toUpperCase()}
        </p>
        <p>
          <strong>Volunteer Names:</strong>{" "}
          {volunteerNames.map((volunteer) => volunteer.name)}
        </p>

        <Button
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
          onClick={() => {
            navigate(`/edit/${event._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
