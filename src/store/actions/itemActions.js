export const removeItemFromRTDB = key => async firebase => {
  try {
    await firebase.remove(`todos/${key}`);
  } catch (e) {
    console.log(e.message);
  }
};

export const removeItemFromFS = key => async firestore => {
  try {
    await firestore.delete(`todos/${key}`);
  } catch (e) {
    console.log(e.message);
  }
};

export const addItemToRTDB = sampleTodo => async firebase => {
  try {
    await firebase.push("todos", sampleTodo);
  } catch (e) {
    console.log(e.message);
  }
};

export const addItemToFS = sampleTodo => async firestore => {
  try {
    await firestore.add("todos", sampleTodo);
  } catch (e) {
    console.log(e.message);
  }
};
