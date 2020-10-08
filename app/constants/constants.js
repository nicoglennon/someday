export const initialState = {
  mode: "light",
  color: "purple",
  current: null,
  user: {
    email: null,
    isRegistered: false,
  },
  lists: {
    today: {
      id: "today",
      title: "today",
      order: 0,
      items: [
        { id: 2, text: "Pull request", done: false, createdAt: Date.now() },
      ],
    },
    tomorrow: {
      id: "tomorrow",
      title: "tomorrow",
      order: 1,
      items: [{ id: 1, text: "Walk dog", done: false, createdAt: Date.now() }],
    },
    someday: {
      id: "someday",
      title: "someday",
      order: 2,
      items: [
        { id: 3, text: "Other stuff", done: false, createdAt: Date.now() },
        { id: 4, text: "Other thangs", done: false, createdAt: Date.now() },
      ],
    },
  },
};

export const emojiSets = {
  pink: {
    today: "👛",
    tomorrow: "🌷",
    someday: "💘",
    done: "🍭",
    checkboxColor: "deeppink",
  },
  purple: {
    today: "💅",
    tomorrow: "☂️",
    someday: "🔮",
    done: "🕺",
    checkboxColor: "darkorchid",
  },
  blue: {
    today: "🦋",
    tomorrow: "🌊",
    someday: "🛰",
    done: "🏄🏻‍♂️",
    checkboxColor: "royalblue",
  },
  green: {
    today: "🍀",
    tomorrow: "🥑",
    someday: "🐸",
    done: "⛳️",
    checkboxColor: "mediumseagreen",
  },
  yellow: {
    today: "🐝",
    tomorrow: "🍋",
    someday: "🌻",
    done: "🤠",
    checkboxColor: "gold",
  },
  orange: {
    today: "🦊",
    tomorrow: "⛵️",
    someday: "🧶",
    done: "🥕",
    checkboxColor: "darkorange",
  },
  red: {
    today: "🌹",
    tomorrow: "🐙",
    someday: "🎈",
    done: "🥤",
    checkboxColor: "crimson",
  },
};
