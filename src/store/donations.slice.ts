import { SupaClient } from "@/utils/supabase";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Database } from "../../types/supabase";
import { PostType } from "@prisma/client";

export const fetchIntialDonations = createAsyncThunk<
  any,
  { type: PostType },
  {
    rejectValue: any;
  }
>(
  "/donations/fetchIntialDonations",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("Posts")
        .select("*,List(*),User(name,username,image,email,phone)")
        .eq("type", _payload.type)
        .order("createdAt", { ascending: false })
        .limit(10);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchMyDonations = createAsyncThunk<
  any,
  { id: string; type: PostType },
  {
    rejectValue: any;
  }
>(
  "/donations/fetchMyDonations",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("Posts")
        .select("*,List(*),User(name,username,image,email,phone)")
        .eq("userId", _payload.id)
        .eq("type", _payload.type)
        .order("createdAt", { ascending: false })
        .limit(10);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export type DonationsProps = Database["public"]["Tables"]["Posts"]["Row"] & {
  User: Pick<
    Database["public"]["Tables"]["User"]["Row"],
    "username" | "image" | "name" | "email" | "phone"
  >;
  List: Database["public"]["Tables"]["List"]["Row"][];
};

const DonationsAdapter = createEntityAdapter<DonationsProps>({
  selectId: (donation) => donation.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const DonationsSlice = createSlice({
  name: "donations",
  reducers: {
    removeOnePost : DonationsAdapter.removeOne
  },
  initialState: DonationsAdapter.getInitialState<{ isLoading: boolean }>({
    isLoading: false,
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchIntialDonations.pending, (state, _action) => {
        state.isLoading = true;
      })
      .addCase(fetchIntialDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        DonationsAdapter.setAll(state, action.payload);
      });

    builder
      .addCase(fetchMyDonations.pending, (state, _action) => {
        state.isLoading = true;
      })
      .addCase(fetchMyDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        DonationsAdapter.setAll(state, action.payload);
      });
  },
});

export const DonationsSelector = DonationsAdapter.getSelectors<RootState>(
  (state) => state.donations
);

export const {removeOnePost} = DonationsSlice.actions
