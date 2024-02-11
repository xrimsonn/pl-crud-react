import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Show = () => {
  const [teams, setTeams] = useState([]);
  const teamsCollection = collection(db, 'teams');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getTeams = async () => {
    const data = await getDocs(teamsCollection);
    setTeams(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteTeam = async (id) => {
    const teamDoc = doc(db, 'teams', id);
    await deleteDoc(teamDoc);
    getTeams();
  };

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>City</th>
            <th>Trophy Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams
            .sort((a, b) => b.trophies - a.trophies)
            .map((team) => (
              <Fragment key={team.id}>
                {showModal && (
                  <dialog open>
                    <article>
                      <h3>Delete {selectedTeam.name}?</h3>
                      <p>
                        If you delete this team you will lose all the
                        information related
                      </p>
                      <footer>
                        <div className="grid">
                          <button
                            onClick={() => setShowModal(false)}
                            role="button"
                            className="outline modal"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              deleteTeam(selectedTeam.id);
                              setShowModal(false);
                            }}
                            role="button"
                            className="modal"
                          >
                            Confirm
                          </button>
                        </div>
                      </footer>
                    </article>
                  </dialog>
                )}
                <tr>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{team.trophies}</td>
                  <td>
                    <div className="grid">
                      <Link to={`/edit/${team.id}`}>
                        <button>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedTeam(team);
                          setShowModal(true);
                        }}
                        className="button"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>
      <Link to="/create" className="button">
        <button>Add Team</button>
      </Link>
    </>
  );
};

export default Show;
