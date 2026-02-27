import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import api from "./lib/api"

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {

  const [ todos, setTodos] = useState<Todo[]>([]);
  const [ input, setInput] = useState("");

  useEffect(()=> {
    ambilDataTodos();
  }, []);

  const ambilDataTodos = async ()=> {
    const res = await api.getTodo();
    if (res.todos) {
      setTodos(res.todos);
    }
  }

  const tambahTodo = async ()=> {
    if (!input.trim()) return;
    const res = await api.tambahTodo(input);
    if (res.todo) {

      setTodos([...todos, res.todo])
      setInput("");
      toast.success("tugas berhasil di tambahkan")
    }
  }

  const updateTodo = async (todo: Todo)=> {
    const res = await api.upadteTodo(todo.id, todo.title, !todo.completed);
    if (res.todo) {
      setTodos(todos.map((todo)=> todo.id === res.todo.id ? res.todo : todo))
      toast.success("tugas berhadil di update")
    }
  }

  const hapusTodo = async (id: number)=> {
    const res = await api.hapusTodo(id);
    setTodos(todos.filter((todo)=> todo.id != id))
    toast.success("tugas berhasil di hapus")
  }

  const handleLogout = ()=> {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
     <div className="min-h-screen max-w-full flex flex-col items-center mx-20 justify-center">
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">todoList</h1>
        <Button size="sm" variant="destructive" onClick={handleLogout} className="p-4 ">
          Logout
        </Button>
      </div>

      <div className="w-full max-w-3xl flex gap-2 mb-8">
        <Input 
          className="focus-visible:ring-0" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && tambahTodo()}
        />
        <Button onClick={tambahTodo} className="rounded-md px-6">Tambah</Button>
      </div>

      <div className="w-full max-w-3xl">
        {todos.map((todo)=> (
          <div key={todo.id} className="flex gap-2">
            <div className="flex w-full gap-2 items-center justify-between p-4 group">
                <input type="checkbox" checked={todo.completed} onChange={()=> updateTodo(todo)}/>

              {todo.completed ? (
                <span className="line-through text-gray-800">{todo.title}</span>
              ) : (
                <span className="text-gray-800">{todo.title}</span>
              )}

              <Button variant="destructive" onClick={()=> hapusTodo(todo.id)} className="p-4">Hapus</Button>

            </div>
          </div>
        ))};
      </div>
     </div>
    </>
  )
}

export default App
