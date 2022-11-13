import { Provider } from "react-redux";
import { store } from "./features/store";
import "./App.css";
//import CounterComponent from "./components/Counter";
import AddTodoForm from "./components/todos/AddTodoForm";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./components/todos/TodoList";
import TotalCompleteTodo from "./components/todos/TotalCompleteTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AddTodoForm />
        <TodoList />
        <TotalCompleteTodo />
      </div>
    </Provider>
  );
}

export default App;
