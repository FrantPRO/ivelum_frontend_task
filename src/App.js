import './App.css';
import RepoList from './components/RepoList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Public GitHub Repositories</h1>
            </header>
            <RepoList />
        </div>
    );
}

export default App;
