import './App.css';
import { ducks } from './demo.tsx';
import DuckItems from './DuckItems.tsx';

function App() {
    return (
        <div>
            <h1>Ducks</h1>
            {ducks.map((duck) => {
                return (
                    <DuckItems key={Math.random()} duck={duck}></DuckItems>
                );
            })}
        </div>
    );
}

export default App;
