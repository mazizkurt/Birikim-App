import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAccumulationState = {
  accumulation: undefined,
};

export interface IAccumulationState {
  accumulation?: any;
}

export const userSlice = createSlice({
  name: 'accumulation',
  initialState,
  reducers: {
    _update: (state, action: PayloadAction<IAccumulationState>) => {
      const accumulation = action.payload?.accumulation;
      const newState: any = { ...state };
      newState[accumulation.id] = accumulation;
      state.accumulation = newState;
    },
    _add: (state, action: PayloadAction<IAccumulationState>) => {
      const accumulation = action.payload?.accumulation;
      const newState: any = { ...state , accumulation};
      state.accumulation = newState;
    },
    _remove: (state,action: PayloadAction<IAccumulationState>) => {
      const accumulation = action.payload?.accumulation;
      const newState: any = { ...state };
      newState.filter((data: any) => data.id !== accumulation.id);
      state.accumulation = newState;
    },
  },
  extraReducers: (builder) => {},
});

export const { _update, _add, _remove } = userSlice.actions;
export default userSlice.reducer;
