export const initialState = {
  theme: "light",
  current: null,
  lists: {
    today: {
      id: "today",
      title: "today",
      emoji: "💅",
      order: 0,
      items: [{ id: 2, text: "Pull request", done: false }],
    },
    tomorrow: {
      id: "tomorrow",
      title: "tomorrow",
      emoji: "☂️",
      order: 1,
      items: [{ id: 1, text: "Walk dog", done: false }],
    },
    someday: {
      id: "someday",
      title: "someday",
      emoji: "🔮",
      order: 2,
      items: [
        { id: 1, text: "Other stuff", done: false },
        { id: 2, text: "Other thangs", done: false },
      ],
    },
  },
};
