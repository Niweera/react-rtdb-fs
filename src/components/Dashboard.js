import React from "react";
import { useSelector } from "react-redux";
import {
  useFirebase,
  useFirestore,
  useFirebaseConnect,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from "react-redux-firebase";

export default () => {
  const firebase = useFirebase();
  const firestore = useFirestore();

  useFirebaseConnect([
    "todos" // { path: '/todos' } // object notation
  ]);

  useFirestoreConnect([
    { collection: "todos" } // or 'todos'
  ]);

  const todos = useSelector(state => state.firebase.ordered.todos);

  const todos_fs = useSelector(state => state.firestore.ordered.todos);

  if (!isLoaded(todos)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(todos)) {
    return (
      <div>
        Todos List Is Empty<button onClick={addSampleTodo}>Add</button>
      </div>
    );
  }

  function addSampleTodo() {
    const sampleTodo = { text: Math.random(), done: false };
    return firebase.push("todos", sampleTodo);
  }

  function addToFirestore() {
    const sampleTodo = { text: Math.random() };
    return firestore.add("todos", sampleTodo);
  }

  return (
    <div>
      <h1>New Sample Todo</h1>
      <button onClick={addSampleTodo}>Add to Firebase</button>
      <button onClick={addToFirestore}>Add to Firestore</button>
      <br />
      {Object.keys(todos).map(key => (
        <React.Fragment key={key}>
          {todos[key].value.text}
          <br />
        </React.Fragment>
      ))}
      <br />
      {todos_fs &&
        Object.keys(todos_fs).map(key => (
          <React.Fragment key={key}>
            {todos_fs[key].text}
            <br />
          </React.Fragment>
        ))}
    </div>
  );
};
