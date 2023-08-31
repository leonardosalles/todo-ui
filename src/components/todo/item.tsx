export type Todo = {
  title: string
  isDone: boolean
  id: number
  onDelete: (id: number) => void
}

export function TodoItem({ title, isDone, id, onDelete }: Todo) {
  return (
    <div className="flex items-center mb-2">
      <span className="flex-1">{title}</span>
      <span className="flex-1 text-right mr-4">{isDone ? 'Done' : 'Todo'}</span>

      <button onClick={() => onDelete(id)} type="button" className="bg-red-500 p-2">Delete</button>
    </div>  
  )
}
