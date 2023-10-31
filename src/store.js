import { configureStore } from "@reduxjs/toolkit";

import { volunteersSlice } from "./Features/volunteerSlice";
import { eventsSlice } from "./Features/eventSlice";

export default configureStore({
  reducer: {
    volunteers: volunteersSlice.reducer,
    events: eventsSlice.reducer
  }
});
