import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterData: null,
  loading: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilterData(state, value) {
      state.filterData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setFilterData, setLoading } = filterSlice.actions;

export default filterSlice.reducer;