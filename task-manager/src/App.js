
import './App.css';
import Tasks from './components/tasks/task/task';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          A simple Task Manager web app that lets a user create, view,
          edit, and delete tasks
        </p>
        <h2>CRUD Operation and Task Manager (made by Vlad Vasinev)</h2>
        <Tasks></Tasks>
      </header>
    </div>
  );
}

export default App;
