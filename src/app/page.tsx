'use client'

import { Todo } from "@curotect/components/todo/item";
import { TodoList } from "@curotect/components/todo/list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const API_URL = 'http://localhost:3001'

export default function Home() {
  const [showTodoEdit, setShowTodoEdit] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [isDone, setIsDone] = useState<boolean>(false)

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['todoData'],
    queryFn: () =>
      fetch(`${API_URL}/todo`).then(
        (res) => res.json(),
      ),
  })

  const addTodoMutation = useMutation({
    mutationFn: (formData: any) => {
      return fetch(`${API_URL}/todo`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => {
      return fetch(`${API_URL}/todo/${id}`, {
        method: 'DELETE',
      })
    },
  })

  const items: Todo[] = data

  const toggleTodo =() => {
    setShowTodoEdit(showTodo => !showTodo)
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()
    
    await addTodoMutation.mutateAsync({
      title,
      isDone
    })

    setTitle('')
    setIsDone(false)

    refetch()
    //setShowTodoEdit(false)
  }

  const onChangeField = (fieldName: string) => (event: any) => {
    if (fieldName === 'title') {
      setTitle(event.target.value)
    }

    if (fieldName === 'isDone') {
      setIsDone(event.target.checked)
    }
  }

  const deleteTodo = async(id: number) => {
    await deleteTodoMutation.mutateAsync(id)
    refetch()
  }

  return (
    <main className="max-w-[500px] m-auto">
      <h1 className="font-semibold flex justify-between items-center my-4">
        Todo List

        <button type="button" onClick={toggleTodo} className="bg-blue-500 p-2">+ Add Todo</button>  
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]"><h1>Carregando...</h1></div>
      )}

      {showTodoEdit && (
        <form onSubmit={onSubmit} className="bg-white p-4 flex flex-col">
          <h3 className="text-black text-base font-semibold mb-4 flex justify-between">
            Todo
            <button type="button" onClick={toggleTodo} className="bg-red-500 p-2">Close</button>    
          </h3>


          <input placeholder="Title" value={title} onChange={onChangeField('title')} className="text-black border-solid border-2 border-blue-500 p-2 mb-4" />

          <div className="flex justify-center mb-4">
            <input id="isDone" type="checkbox" onChange={onChangeField('isDone')} checked={isDone} />
            <label className="text-black ml-2" htmlFor="isDone">Is completed?</label>
          </div>

          <button className="bg-blue-500 p-2" disabled={addTodoMutation.isLoading}>
            {addTodoMutation.isLoading ? 'Loading...' : 'Add Todo'}
          </button>
        </form>  
      )}

      {!isLoading && (
        <>
          <h3 className="mt-6 font-semibold text-base">Todo List Items</h3>
          <TodoList items={items} onDelete={deleteTodo} />
        </>
      )}
    </main>
  )
}
