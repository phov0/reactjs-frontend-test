import {useDispatch, useSelector} from "react-redux";

import {useForm} from "react-hook-form";
import {actions} from "../reducers/user.actions";
import {ControlledTextField} from "../components/inputs";
import {Box, Button, Card, CardContent, Divider, Modal, Typography} from "@mui/material";
import ControlledZipCodeTextField from "../components/inputs/ControlledZipCodeTextField";
import {useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import {actions as routeActions, types as routes} from "../reducers/routes.actions";
import LoadingScreen from "../components/LoadingScreen";
import ControlledDateField from "../components/inputs/ControlledDateField";

const UserPage = () => {
    const dispatch = useDispatch();
    const {loading, data, address, id} = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const rules = {};
    const initialValues = {
        nome: "",
        dataNascimento: "",
        cep: "",
        cidade: "",
        uf: ""
    };

    const formProps = {
        ...useForm({defaultValues: initialValues}),
        rules,
        initialValues,
    };

    useEffect(() => {
        if (data) {
            formProps.setValue("nome", data?.nome);
            formProps.setValue("dataNascimento", data?.dataNascimento);
            formProps.setValue("cep", data?.cep);
            formProps.setValue("cidade", data?.cidade);
            formProps.setValue("uf", data?.uf);
        }
    }, [data?.id]);

    useEffect(() => {
        if (!address) return;
        formProps.setValue("cidade", address?.localidade);
        formProps.setValue("uf", address?.uf);
    }, [address?.localidade]);

    const handleSubmit = (values) => {

        if(!isFormValid(values)){
          setIsModalOpen(true);
          return
        }

        dispatch(actions.saveUser.request(values));
    };

    const isFormValid = (values)=>{
      const splitDate = values.dataNascimento.split('/');
      const dia = parseInt(splitDate[0], 10);
      const mes = parseInt(splitDate[1], 10);
      const ano = parseInt(splitDate[2], 10);

      const data = new Date(ano, mes - 1, dia);

      if (data.getDate() !== dia || data.getMonth() !== mes - 1 || data.getFullYear() !== ano)  return false;

      if(values.nome.trim() === "" ||values.cep.trim() === "" || values.cidade.trim() === "" || values.uf.trim() === "") return false;

      return true;
    }
    const findCep = (cep) => {
        dispatch(actions.getAddress.request(cep));
    }

    if (loading) {
        return <LoadingScreen/>
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Erro ao salvar usuário
                    </Typography>
                    <Typography id="modal-modal-description">
                        Favor preencher todos os campos corretamente.
                    </Typography>
                </Box>
            </Modal>
            <div className={"page-container"}>
                <Card>
                    <CardContent>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "1rem"
                        }}>
                            <Typography variant="h6" component="h2">Usuário #{id}</Typography>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Button onClick={() =>
                                    dispatch(
                                        routeActions.redirectTo(routes.HOME)
                                    )
                                }>
                                    <ArrowBack/>
                                </Button>
                            </div>
                        </div>

                        <form onSubmit={formProps.handleSubmit(handleSubmit)}>
                            <div className={"form-inputs"}>
                                <ControlledTextField label="Nome" name={"nome"} formProps={formProps}/>
                                <ControlledDateField label="Data de Nascimento" name={"dataNascimento"}
                                                     formProps={formProps}/>
                                <ControlledZipCodeTextField label="CEP" name={"cep"} formProps={formProps}
                                                            onBlur={findCep}/>
                                <ControlledTextField
                                    label="Cidade"
                                    name={"cidade"}
                                    formProps={formProps}
                                />
                                <ControlledTextField label="UF" name={"uf"} formProps={formProps}/>
                            </div>
                            <div style={{padding: "1rem 0px 1rem 0px"}}>
                                <Divider variant="middle"/>
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button type={"submit"}>GRAVAR</Button>
                            </div>
                        </form>
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

export default UserPage;
