import { Button } from "./components/ui/button"

function App() {

  const handleLogout = ()=> {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
     <div className="flex items-center justify-center h-screen">
      <h1>hello</h1> <br />
      <Button onClick={handleLogout}>Logout</Button>
     </div>
    </>
  )
}

export default App
