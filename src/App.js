import Header from "./Component/Header";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Events from "./Page/Event/Events";
import EventDetails from "./Page/Event/EventDetails";
import EventForm from "./Page/Event/EventForm";
import Volunteers from "./Page/Volunteer/Volunteers";
import VolunteerDetails from "./Page/Volunteer/VolunteerDetails";
import VolunteerForm from "./Page/Volunteer/VolunteerForm";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/edit/:eventId" element={<EventForm />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/volunteer/:volunteerId" element={<VolunteerDetails />} />
        <Route
          path="/volunteer/edit/:volunteerId"
          element={<VolunteerForm />}
        />
      </Routes>
    </div>
  );
}
