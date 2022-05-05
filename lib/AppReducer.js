export const initialState = {
  user: 0,
  content_state: {
    storedActiveContent: {
      conversations: true,
    },
    storedActiveMenu: {
      conversations: true,
    },
  },
  theme_state: {
    name: "light",
    body: "#fefffb",
    text: "#232425",
    topMenuBackground: "#6eaaff",
    span: "#777 !important",
    LGActive: "#6eaaff",
    border: "#ddd",
    danger: "#b00400",
  },
  selected_conversation: 0,
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.payload;
    }
    case "set_user": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "set_content_state": {
      return {
        ...state,
        content_state: action.payload,
      };
    }
    case "set_selected_conversation": {
      return {
        ...state,
        selected_conversation: action.payload,
      };
    }
  }
};
