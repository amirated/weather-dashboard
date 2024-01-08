import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const headerTitle = 'Weather Dashboard';

  return (
    <div className="w-screen h-screen bg-yellow-100">
      {/* <Header title={headerTitle} /> */}
      <Dashboard />
    </div>
  );
}

export default App;
