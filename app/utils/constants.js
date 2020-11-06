import { addDays } from "date-fns";

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
      items: [{ id: 2, text: "call bestie", done: false, day: Date.now() }],
    },
    tomorrow: {
      id: "tomorrow",
      title: "tomorrow",
      order: 1,
      items: [
        {
          id: 1,
          text: "learn about bitcoin",
          done: false,
          day: addDays(Date.now(), 1),
        },
      ],
    },
    someday: {
      id: "someday",
      title: "someday",
      order: 2,
      items: [
        { id: 3, text: "go to mars with elon", done: false, day: Date.now() },
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
