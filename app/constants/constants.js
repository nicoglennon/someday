export const initialState = {
  mode: "light",
  color: "purple",
  current: null,
  user: {
    email: "test@test.com",
  },
  lists: {
    today: {
      id: "today",
      title: "today",
      order: 0,
      items: [{ id: 2, text: "Pull request", done: false }],
    },
    tomorrow: {
      id: "tomorrow",
      title: "tomorrow",
      order: 1,
      items: [{ id: 1, text: "Walk dog", done: false }],
    },
    someday: {
      id: "someday",
      title: "someday",
      order: 2,
      items: [
        { id: 3, text: "Other stuff", done: false },
        { id: 4, text: "Other thangs", done: false },
      ],
    },
  },
};

export const emojiSets = {
  purple: {
    today: "💅",
    tomorrow: "☂️",
    someday: "🔮",
    done: "🕺",
    checkboxColor: "orchid",
  },
  red: {
    today: "💄",
    tomorrow: "🐙",
    someday: "🎈",
    done: "🥤",
    checkboxColor: "indianred",
  },
};
