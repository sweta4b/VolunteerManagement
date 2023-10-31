import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  console.log("fetching");
  const response = await axios.get(
    "https://volunteer-management.sweta4b.repl.co/events"
  );
  // console.log(response.data);
  return response.data;
});

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    console.log("deleting Student", eventId);
    try {
      const response = await axios.delete(
        `https://volunteer-management.sweta4b.repl.co/events/${eventId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ eventId, eventData }) => {
    const response = await axios.post(
      `https://volunteer-management.sweta4b.repl.co/events/${eventId}`,
      eventData
    );
    // console.log(response.data);
    return response.data;
  }
);

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (newEvent) => {
    const response = await axios.post(
      `https://volunteer-management.sweta4b.repl.co/events`,
      newEvent
    );
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  events: [],
  status: "idle",
  error: null
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      (state.status = "success"), (state.events = action.payload);
    },
    [fetchEvents.rejected]: (state, action) => {
      (state.status = "error"), console.log(action.error.message);
      state.error = action.error.message;
    },
    [deleteEvent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload.data._id
      );
    },
    [deleteEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editEvent.pending]: (state) => {
      state.status = "loading";
    },
    [editEvent.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event._id === updatedEvent._id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [editEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addEvent.pending]: (state) => {
      state.status = "loading";
    },
    [addEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload.data);
    },
    [addEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default eventsSlice.reducer;
