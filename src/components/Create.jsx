import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const [trophies, setTrophies] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const teamsCollection = collection(db, 'teams');

  const store = async (e) => {
    e.preventDefault();
    await addDoc(teamsCollection, {
      name: name,
      city: city,
      trophies: trophies,
    });
    navigate('/');
  };

  return (
    <>
      <h5>Create Team</h5>
      <form onSubmit={store}>
        <input
          type="text"
          id="name"
          placeholder="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          id="city"
          placeholder="City name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="number"
          id="trophies"
          placeholder="Number of trophies"
          value={trophies}
          onChange={(e) => setTrophies(e.target.value)}
          min={0}
          required
        />
        <button type="submit">Create</button>
        <Link to={'/'}>
          <button className="outline">Go back</button>
        </Link>
      </form>
    </>
  );
};

export default Create;
