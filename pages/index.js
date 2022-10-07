import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  ListGroup,
  ListGroupItem,
  Stack,
  Row,
  Col,
} from "react-bootstrap";
import { CheckSquare, Eye, Trash } from "react-bootstrap-icons";
import api from "../services/api";

export default function Home() {
  const [lista, setLista] = useState([]);
  const [tarefa, setTarefa] = useState("");

  useEffect(() => {
    api.listarTodasAsTarefas().then((r) => {
      setLista(r);
    });
  }, []);

  async function adicionarNaLista() {
    if (lista.filter((e) => e.title === tarefa).length > 0) {
      alert("Tarefa repetida");
    } else if (tarefa !== "") {
      const tarefaCriada = await api.criarTarefa(tarefa);
      if (tarefaCriada.id) {
        api.listarTodasAsTarefas().then((r) => {
          setLista(r);
        });
        setTarefa("");
      } else {
        alert("Falha ao criar tarefa, tente novamente");
      }
    } else {
      alert("Tarefa vazia");
    }
  }

  async function removerDaLista(tarefa) {
    const result = await api.deletarTarefa(tarefa.id);
    if (result.id === undefined) {
      api.listarTodasAsTarefas().then((r) => {
        setLista(r);
      });
    } else {
      alert("Falha ao remover tarefa");
    }
  }

  async function alternarRealizado(tarefa) {
    await api.alternarRealizado(tarefa.id);
    api.listarTodasAsTarefas().then((r) => {
      setLista(r);
    });
  }

  return (
    <Container>
      <h1>Tarefas</h1>
      <Stack gap={3}>
        <FormControl
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Insira sua tarefa"
        ></FormControl>
        <Button onClick={adicionarNaLista}>Adicionar</Button>
        <ListGroup>
          {lista.map((tarefa) => (
            <ListGroupItem key={tarefa.id}>
              <Row className="d-flex justify-content-between">
                <Col>
                  <div>{tarefa.title}</div>
                </Col>
                <Col className="text-end">
                  <Link href={`/tarefas/${tarefa.id}`}>
                    <Eye size={24} style={{ cursor: "pointer" }} />
                  </Link>
                  <CheckSquare
                    className="m-2"
                    onClick={() => alternarRealizado(tarefa)}
                    size={24}
                    style={{ cursor: "pointer" }}
                    color={tarefa.completed ? "green" : "gray"}
                  />
                  <Trash
                    size={24}
                    onClick={() => removerDaLista(tarefa)}
                    style={{ cursor: "pointer" }}
                    color="red"
                  />
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Stack>
    </Container>
  );
}
