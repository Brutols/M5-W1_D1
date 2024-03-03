import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentsList: [],
  loading: false,
  commentRefresh: false,
  error: "",
  formData: {
    rating: 0,
    inputValue: "",
    isEditing: false,
    commentId: "",
  },
};

export const getComments = createAsyncThunk(
  "comments/GETComments",
  async (id) => {
    try {
      const res = await axios.get(
        `https://striveschool-api.herokuapp.com/api/books/${id}/comments/`,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDk0NzYyMDAsImV4cCI6MTcxMDY4NTgwMH0.YeJD-StjZWn9oOh1EahV20sUB2hJwwICdl1EcrBpw5Q",
          },
        }
      );
      return await res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const postComment = createAsyncThunk(
  "comments/POSTComments",
  async ({ commentText, commentRate, commentId }) => {
    await axios.post(
      "https://striveschool-api.herokuapp.com/api/comments/",
      {
        comment: commentText,
        rate: commentRate,
        elementId: commentId,
      },
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDk0NzYyMDAsImV4cCI6MTcxMDY4NTgwMH0.YeJD-StjZWn9oOh1EahV20sUB2hJwwICdl1EcrBpw5Q",
          "Content-Type": "application/json",
        },
      }
    );
  }
);

export const editComment = createAsyncThunk(
  "comments/PUTComments",
  async ({ commentText, commentRate, commentId }) => {
    await axios.put(
      `https://striveschool-api.herokuapp.com/api/comments/${commentId}`,
      {
        comment: commentText,
        rate: commentRate,
      },
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDk0NzYyMDAsImV4cCI6MTcxMDY4NTgwMH0.YeJD-StjZWn9oOh1EahV20sUB2hJwwICdl1EcrBpw5Q",
          "Content-Type": "application/json",
        },
      }
    );
  }
);

export const deleteComment = createAsyncThunk(
  "comments/DELETEComments",
  async (id) => {
    await axios.delete(
      `https://striveschool-api.herokuapp.com/api/comments/${id}`,
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDk0NzYyMDAsImV4cCI6MTcxMDY4NTgwMH0.YeJD-StjZWn9oOh1EahV20sUB2hJwwICdl1EcrBpw5Q",
        },
      }
    );
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    handleError: (state, { payload }) => {
      const { value } = payload;
      state.error = value;
    },
    handleCommentRefresh: (state) => {
      state.commentRefresh = !state.commentRefresh;
    },
    handleFormData: (state, { payload }) => {
      const { type, value } = payload;
      switch (type) {
        case "replace":
          state.formData = value;
          break;
        case "editRating":
          state.formData = { ...state.formData, rating: value };
          break;
        case "editInput":
          state.formData = { ...state.formData, inputValue: value };
          break;
        case "editIsEditing":
          state.formData = { ...state.formData, isEditing: value };
          break;
        case "editCommentId":
          state.formData = { ...state.formData, commentId: value };
          break;
        case "reset":
          state.formData = initialState.formData;
          break;
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsList = action.payload.reverse();
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(postComment.fulfilled, (state) => {
        state.commentRefresh = !state.commentRefresh;
      })
      .addCase(editComment.fulfilled, (state) => {
        state.commentRefresh = !state.commentRefresh;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.commentRefresh = !state.commentRefresh;
      });
  },
});

export const allComments = (state) => state.commentsData.commentsList;
export const isAllCommentsLoading = (state) => state.commentsData.loading;
export const isCommentRefreshed = (state) => state.commentsData.commentRefresh;
export const allFormData = (state) => state.commentsData.formData;
export const isAllCommentsError = (state) => state.commentsData.error;
export const { handleCommentRefresh, handleFormData, handleError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
