import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    // console.log("fetching");
    const response = await axios.get(
      "https://volunteer-management.sweta4b.repl.co/volunteers"
    );
    // console.log(response.data);
    return response.data;
  }
);

export const deleteVolunteer = createAsyncThunk(
  "volunteers/deleteVolunteer",
  async (volunteerId) => {
    console.log("deleting Student", volunteerId);
    try {
      const response = await axios.delete(
        `https://volunteer-management.sweta4b.repl.co/volunteers/${volunteerId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editVolunteer = createAsyncThunk(
  "volunteers/editVolunteer",
  async ({ volunteerId, volunteerData }) => {
    const response = await axios.post(
      `https://volunteer-management.sweta4b.repl.co/volunteers/${volunteerId}`,
      volunteerData
    );
    // console.log(response.data);
    return response.data;
  }
);

export const addVolunteer = createAsyncThunk(
  "volunteers/addVolunteer",
  async (newVolunteer) => {
    const response = await axios.post(
      `https://volunteer-management.sweta4b.repl.co/volunteers`,
      newVolunteer
    );
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  volunteers: [],
  status: "idle",
  error: null
};

export const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      (state.status = "success"), (state.volunteers = action.payload);
    },
    [fetchVolunteers.rejected]: (state, action) => {
      (state.status = "error"), console.log(action.error.message);
      state.error = action.error.message;
    },
    [deleteVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== action.payload.data._id
      );
    },
    [deleteVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [editVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex(
        (volunteer) => volunteer._id === updatedVolunteer._id
      );
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
    },
    [editVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload.data);
    },
    [addVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default volunteersSlice.reducer;
