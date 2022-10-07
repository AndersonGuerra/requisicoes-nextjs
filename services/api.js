const baseUrl = "http://localhost:3001/todos/";

export default {
  async listarTodasAsTarefas() {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
  },

  async obterTarefa(id) {
    const response = await fetch(`${baseUrl}${id}`);
    const result = await response.json();
    return result;
  },

  async criarTarefa(title) {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    return result;
  },

  async deletarTarefa(id) {
    const response = await fetch(`${baseUrl}${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  },

  async alternarRealizado(id) {
    const tarefa = await this.obterTarefa(id);

    const response = await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !tarefa.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    return result;
  },
};
