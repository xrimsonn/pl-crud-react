import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <main className="container">
        <article>
          <hgroup>
            <h1>Premier League Teams</h1>
            <a href="https://www.github.com/xrimsonn">José Antonio Rosales</a>
          </hgroup>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Show />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </BrowserRouter>
        </article>
      </main>
    </>
  );
}

export default App;
