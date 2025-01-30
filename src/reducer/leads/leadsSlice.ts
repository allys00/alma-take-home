import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { leads } from "./mock.data";
import { Lead } from "@/definitions/lead";


export interface LeadsSlice {
    list: Lead[];
}

const initialState: LeadsSlice = {
    list: [],
};

export const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        setLeads: (state, action: PayloadAction<Lead[]>) => {
            state.list = action.payload;
        },
        updateLead(state, action: PayloadAction<Partial<Lead>>) {
            const lead = state.list.find((lead) => lead.id === action.payload.id);
            if (lead) {
                Object.assign(lead, action.payload);
            }
            state.list = [...state.list];
        },
    }
});

export const { setLeads, updateLead } = leadsSlice.actions;
export const leadsReducer = leadsSlice.reducer;