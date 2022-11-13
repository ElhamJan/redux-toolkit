import { useSelector } from "react-redux";

const TotalCompleteTodo = () => {
  const { todoItems } = useSelector((state) => state.todos);

  return (
    <h4 className="mt-3">
      Total complete items: {todoItems.filter((t) => t.completed).length}
    </h4>
  );
};

export default TotalCompleteTodo;
