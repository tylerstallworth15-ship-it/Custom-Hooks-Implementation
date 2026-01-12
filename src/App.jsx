import PaginationDemo from './components/PaginationDemo';
import DebounceSearchDemo from './components/DebounceSearchDemo';

function App() {
  return (
    <div style={{ padding: '20px'}}>
      <h1>Custom Hooks Demo</h1>

      <h2>Pagination Demo</h2>
      <PaginationDemo />

      <hr />

      <h2>Debounce Search Demo</h2>
      <DebounceSearchDemo />
    </div>
  );
}

export default App;