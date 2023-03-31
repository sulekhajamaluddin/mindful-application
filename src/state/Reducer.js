export default function Reducer(state, action) {
  switch (action.type) {
    case "initialise":
      return onInitialise(action);
    case "create":
      return onCreate(state, action);
    case "update":
      return onUpdate(state, action);
    case "delete":
      return onDelete(state, action);
    case "reset":
      return onReset(state, action);
    default:
      throw new Error("Unhandled action:", action.type);
  }
}

function onInitialise(action) {
  const data = action.payload;
  return data;
}

function onCreate(state, action) {
  const newItem = action.payload;
  return [...state, newItem];
}

function onUpdate(state, action) {
  const updatedItem = action.payload;
  const clonedItems = [...state];
  const itemIndex = clonedItems.findIndex((item) => item.id === updatedItem.id);
  clonedItems[itemIndex] = updatedItem;
  return clonedItems;
}

function onDelete(state, action) {
  const id = action.payload;
  const clonedItems = [...state];
  const itemIndex = clonedItems.findIndex((item) => item.id === id);
  clonedItems.splice(itemIndex, 1);
  return clonedItems;
}

function onReset() {
  return {};
}
