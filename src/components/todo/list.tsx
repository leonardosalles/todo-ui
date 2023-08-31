import { PropsWithChildren } from "react"
import { Todo, TodoItem } from "./item"


type TodoListProps = PropsWithChildren & {
  items: Todo[]
  onDelete: (id: number) => void
}

export function TodoList({ items, onDelete }: TodoListProps) {
  if (!items || items.length === 0) {
    return <span className="block text-center my-6">No items found</span>
  }

  return items.map((item: Todo, index: number) => (
    <TodoItem key={`todo_item_${index}`} id={item.id} title={item.title} isDone={item.isDone} onDelete={onDelete} />
  ))
}
