import {Link, useLocation} from 'react-router-dom';

export default function GameOver() {
  const location = useLocation();
  const points = location.state;

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Game Over</h1>
      <h2>You made {points} points</h2>
      <Link
        to="/clueless"
        style={{textDecoration: 'none'}}
      >
        <h2>Play Again</h2>
      </Link>
    </div>
  );
}
