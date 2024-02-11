import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Edit = () => {
  const [trophies, setTrophies] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const team = doc(db, 'teams', id);
    const data = {
      name: name,
      city: city,
      trophies: trophies,
    };
    await updateDoc(team, data);
    navigate('/');
  };

  const getTeamById = async (id) => {
    const team = await getDoc(doc(db, 'teams', id));
    if (team.exists()) {
      console.log('Document data:', team.data());
      const data = team.data();
      setName(data.name);
      setCity(data.city);
      setTrophies(data.trophies);
    } else {
      console.log('No such document');
    }
  };

  useEffect(() => {
    getTeamById(id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h5>Edit Team</h5>
      <form onSubmit={update}>
        <input
          type="text"
          id="name"
          placeholder="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="city"
          placeholder="City name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="number"
          id="trophies"
          placeholder="Number of trophies"
          value={trophies}
          onChange={(e) => setTrophies(e.target.value)}
          min={0}
        />
        <button type="submit">Update</button>
        <Link to={'/'}>
          <button className="outline">Go back</button>
        </Link>
      </form>
    </>
  );
};

export default Edit;
