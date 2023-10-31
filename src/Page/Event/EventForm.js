import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, TextField } from "@mui/material";
import { editEvent, fetchEvents } from "../../Features/eventSlice";

export default function EventForm() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.events);
  const event = events.find(({ _id }) => _id === eventId);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const [updatedData, setUpdatedData] = useState({
    _id: event?._id || "",
    name: event?.name || "",
    date: event?.date || "",
    time: event?.time || "",
    description: event?.description || "",
    volunteers: event?.volunteers || "",
    location: event?.location || "",
    volunteerRole: event?.volunteerRole || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent({ eventId: event._id, eventData: updatedData }));
    navigate(`/event/${event._id}`);
  };

  return (
    <div className="container">
      <div className="outer-form">
        <h1>Edit Details</h1>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            type="text"
            value={updatedData.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            variant="standard"
            type="date"
            value={updatedData.date}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, date: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            variant="standard"
            type="time"
            value={updatedData.time}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, time: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            type="text"
            value={updatedData.description}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, description: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="No of Volunteers"
            variant="standard"
            type="number"
            value={updatedData.volunteers}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, volunteers: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Volunteer Role"
            variant="standard"
            type="text"
            value={updatedData.volunteerRole}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, volunteerRole: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Location"
            variant="standard"
            type="text"
            value={updatedData.location}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, location: e.target.value })
            }
          />
          <Button
            sx={{ width: "50%", display: "block", margin: "1rem auto" }}
            color="secondary"
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
