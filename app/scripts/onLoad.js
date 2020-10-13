import { addDays } from "date-fns";
export const onLoad = (state, setState) => {
  const { lists } = state;
  console.log("****** INITIALIZATION:");
  const tomorrow = addDays(new Date(), 1);
  const itemsOutOfDate = lists.tomorrow.items.filter(
    (item) => new Date(item.day).toDateString() !== tomorrow.toDateString(),
  );
  const itemsInDate = lists.tomorrow.items.filter(
    (item) => new Date(item.day).toDateString() === tomorrow.toDateString(),
  );

  //   move the overdue todos from yesterday to today
  if (itemsOutOfDate.length > 0) {
    setState({
      lists: {
        ...lists,
        tomorrow: { ...lists.tomorrow, items: itemsInDate },
        today: {
          ...lists.today,
          items: [...lists.today.items, ...itemsOutOfDate],
        },
      },
    });
  }
};
