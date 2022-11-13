import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncTodos } from "../../features/todos/todosSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoItems, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch]);

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>{error}</p>;

  return (
    <ul className="list-group">
      {todoItems.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
