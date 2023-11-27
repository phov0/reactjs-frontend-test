import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { DeleteOutline, Edit } from "@mui/icons-material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <div>Carregando usuários</div>;
  }

  return (
    <>
      <h2>Usuários</h2>
      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Cidade/UF</td>
            <td>Ações</td>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => {
            return (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>
                  {u.cidade}/{u.uf}
                </td>
                <td>
                  <Edit
                    onClick={() =>
                      dispatch(
                        routeActions.redirectTo(routes.USER, { id: u.id })
                      )
                    }
                  />
                  <DeleteOutline />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
