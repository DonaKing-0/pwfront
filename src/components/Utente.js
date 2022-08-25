
const Utente = ({ element }) => {

    //per ogni utente nuova riga se nessuno -->nessuno
    return <tr>
      <td>{element._id}</td>
      <td>{element.username}</td>
    </tr>

};
export default Utente;
