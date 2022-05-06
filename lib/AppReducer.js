// export const initialState = {
//   user: 0,
//   content_state: {
//     storedActiveContent: {
//       conversations: true,
//     },
//     storedActiveMenu: {
//       conversations: true,
//     },
//   },
//   theme_state: {
//     name: "light",
//     body: "#fefffb",
//     text: "#232425",
//     topMenuBackground: "#6eaaff",
//     span: "#777 !important",
//     LGActive: "#6eaaff",
//     border: "#ddd",
//     danger: "#b00400",
//   },
//   selected_conversation: 0,
// };

export const initialState = {
  user: {
    photoURL:
      'https://avatars.dicebear.com/api/identicon/2lde5OKQAQ14bJkZa76kAJ11rDasaLJOpK6KQ2fJeb8mKyOs5HlezvcNe8J1bwx1Mvags6ue7pLQoBBeoOrHuhPevHwBml7gJuPo.svg',
    contacts: [
      '60a532c9266a4f2cc69925f6',
      '60a5344d266a4f2cc69925fc',
      '60dd2b58eeda4429a8f4c123',
    ],
    conversations: [
      '626218633e20668a886565c7',
      '626218633e20668a886565c8',
      '626d890f137d6f1d8862c639',
      '626d892ea5c65e1d9dd6948b',
    ],
    _id: '60dd2b58eeda4429a8f4ca91',
    givenName: 'Keaton',
    familyName: 'Brewster',
    email: 'keaton.brewster@gmail.com',
    phoneNum: '+17859698002',
    uid: '108306498626918685024',
    __v: 2,
    createdAt: '2022-04-30T19:07:59.428Z',
  },
  content: {
    storedActiveContent: {
      conversations: true,
    },
    storedActiveMenu: {
      conversations: true,
    },
  },
  theme: {
    name: 'light',
    body: '#fefffb',
    text: '#232425',
    topMenuBackground: '#6eaaff',
    span: '#777 !important',
    LGActive: '#6eaaff',
    border: '#ddd',
    danger: '#b00400',
  },
  last_conversation: '626218633e20668a886565c8',
}

export const Reducer = (state, action) => {
  switch (action.type) {
    case 'init_stored': {
      return action.payload
    }
    case 'set_user': {
      return {
        ...state,
        user: action.payload,
      }
    }
    case 'set_content_state': {
      return {
        ...state,
        content_state: action.payload,
      }
    }
    case 'set_selected_conversation': {
      return {
        ...state,
        selected_conversation: action.payload,
      }
    }
  }
}
