import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { fetchVolunteers } from "../../Features/volunteerSlice";

export default function VolunteerDetails() {
  const { volunteerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const volunteers = useSelector((state) => state.volunteers.volunteers);
  const volunteer = volunteers.find(({ _id }) => _id === volunteerId);

  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Volunteer Details</h1>
        <p>
          <strong>Name:</strong> {volunteer.name.toUpperCase()}
        </p>
        <p>
          <strong>Phone No:</strong> {volunteer.phoneNo}
        </p>
        <p>
          <strong>Address:</strong> {volunteer.address}
        </p>
        <p>
          <strong>Availability:</strong>{" "}
          {volunteer.availability ? "Available" : "Not Available"}
        </p>
        <p>
          <strong>Skills:</strong> {volunteer.skills}
        </p>
        <p>
          <strong>Interest:</strong> {volunteer.interest}
        </p>
        <p>
          <strong>Assign Event:</strong> {volunteer.event}
        </p>

        <Button
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
          onClick={() => {
            navigate(`/volunteer/edit/${volunteer._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
