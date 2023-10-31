import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, TextField } from "@mui/material";
import { editVolunteer, fetchVolunteers } from "../../Features/volunteerSlice";
import { fetchEvents } from "../../Features/eventSlice";

export default function VolunteerForm() {
  const { volunteerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const volunteers = useSelector((state) => state.volunteers.volunteers);
  const events = useSelector((state) => state.events.events);
  const volunteer = volunteers.find(({ _id }) => _id === volunteerId);

  useEffect(() => {
    dispatch(fetchVolunteers());
    dispatch(fetchEvents());
  }, [dispatch]);

  const [updatedData, setUpdatedData] = useState({
    _id: volunteer?._id || "",
    name: volunteer?.name || "",
    address: volunteer?.address || "",
    event: volunteer?.event || "",
    phoneNo: volunteer?.phoneNo || "",
    availability: volunteer?.availability || "",
    skills: volunteer?.skills || "",
    interest: volunteer?.interest || ""
  });

  const uniqueEvents = events.map(({ name }) => name);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editVolunteer({ volunteerId: volunteer._id, volunteerData: updatedData })
    );
    navigate(`/volunteer/${volunteer._id}`);
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
            label="Address"
            variant="standard"
            type="text"
            value={updatedData.address}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, address: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setUpdatedData({ ...updatedData, event: e.target.value })
            }
          >
            <option>Select Event</option>
            {uniqueEvents.map((event) => (
              <option value={event}>{event}</option>
            ))}
          </select>

          <TextField
            id="standard-basic"
            label="Event"
            variant="standard"
            type="text"
            value={updatedData.event}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, event: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Interest"
            variant="standard"
            type="text"
            value={updatedData.interest}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, interest: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Phone No"
            variant="standard"
            type="number"
            value={updatedData.phoneNo}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, phoneNo: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Availability"
            variant="standard"
            type="boolean"
            value={updatedData.availability}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, availability: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Skills"
            variant="standard"
            type="text"
            value={updatedData.skills}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, skills: e.target.value })
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
