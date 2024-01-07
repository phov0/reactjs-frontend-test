import {useDispatch, useSelector} from "react-redux";
import {
    actions as routeActions,
    types as routes,
} from "../reducers/routes.actions";
import {Add, DeleteOutline, Edit} from "@mui/icons-material";
import {useCallback, useMemo, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress, Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import {actions} from "../reducers/user.actions";

const HomePage = () => {
    const dispatch = useDispatch();
    const {loading, data} = useSelector((state) => state.home);

    const [confirmDelete, setConfirmDelete] = useState({idToDelete:null,isOpen:false});

    if (loading) {
        return <LoadingScreen/>
    }

    const calculateAge = (date) => {
        const now = new Date();
        const dateSplited = date.split("/");
        const birthDate = new Date(dateSplited[2], dateSplited[1], dateSplited[0]);
        const diff = Math.abs(now - birthDate);
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
        return age;
    }

    const sortByAge = (a, b) => {
        const aSplited = a.dataNascimento.split("/");
        const bSplited = b.dataNascimento.split("/");
        const aDate = new Date(aSplited[2], aSplited[1], aSplited[0]);
        const bDate = new Date(bSplited[2], bSplited[1], bSplited[0]);
        return aDate - bDate;
    }

    return (
        <>
            <Modal
                open={confirmDelete.isOpen}
                onClose={()=>setConfirmDelete({idToDelete:null,isOpen: false})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tem certeza que deseja excluir este usuário?
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Esta operação não pode ser desfeita.
                    </Typography>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                      <Button onClick={() => {
                          dispatch(actions.deleteUser.request(confirmDelete.idToDelete))
                          setConfirmDelete({idToDelete:null,isOpen: false})
                        }
                      }>
                        <Typography id="modal-modal-description" >
                         Excluir
                        </Typography>
                      </Button>
                    </div>
                </Box>
            </Modal>
            <div className={"page-container"}>
                <Card>
                    <CardContent>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Typography variant="h6" component="h2">
                              Usuários
                            </Typography>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Button variant="contained" onClick={() =>
                                    dispatch(
                                        routeActions.redirectTo(routes.NEW)
                                    )
                                }>
                                    <Add/>
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Typography>Nome</Typography></TableCell>
                                    <TableCell align={"right"}> <Typography>Idade</Typography></TableCell>
                                    <TableCell> <Typography>Cidade/UF</Typography></TableCell>
                                    <TableCell align={"center"}> <Typography>Ações</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.sort(sortByAge).map((u) => {
                                    return (
                                        <TableRow key={u.id}>
                                            <TableCell> <Typography>{u.nome}</Typography></TableCell>
                                            <TableCell align={"right"}> <Typography>{calculateAge(u.dataNascimento)}</Typography></TableCell>
                                            <TableCell> <Typography>{u.cidade}/{u.uf}</Typography></TableCell>
                                            <TableCell align={"center"}>
                                                <Button onClick={() =>
                                                    dispatch(
                                                        routeActions.redirectTo(routes.USER, {id: u.id})
                                                    )
                                                }>
                                                    <Edit/>
                                                </Button>
                                                <Button onClick={() =>
                                                    setConfirmDelete({idToDelete:u.id,isOpen:true})
                                                }>
                                                    <DeleteOutline/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:1,
  display:"flex",
  flexDirection:"column",
  gap:4,
  p: 4,
};

export default HomePage;
