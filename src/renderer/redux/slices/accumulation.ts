import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAccumulationState = {
  accumulation: [],
};

export interface IAccumulationState {
  accumulation?: Array<object>;
}

export const userSlice = createSlice({
  name: 'accumulation',
  initialState,
  reducers: {
    _update: (state, action: PayloadAction<IAccumulationState>) => {
      const accumulation = action.payload?.accumulation;
      const newState: any = { ...state };
      state.accumulation = newState;
    },
    _add: (state, action: PayloadAction<IAccumulationState>) => {
      const accumulation = action.payload?.accumulation;
      const newState:any = state.accumulation
      newState.push(accumulation)
      state.accumulation = newState;
    },
    _remove: (state,action: PayloadAction<IAccumulationState>) => {
     const id:any = action.payload?.accumulation;
     const newState:any = state.accumulation
     state.accumulation = newState.filter((data:any,index:any)=>index !== id.id);

    },
  },
  extraReducers: (builder) => {},
});

export const { _update, _add, _remove } = userSlice.actions;
export default userSlice.reducer;
