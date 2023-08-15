document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pedido-form");
  const mensagemDiv = document.getElementById("mensagem");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const nome = formData.get("nome");
    const quantidade = formData.get("quantidade");
    const florada = formData.get("florada");
    const tamanho = formData.get("tamanho");

    const response = await fazerPedido(nome, quantidade, florada, tamanho);

    if (response.success) {
      mensagemDiv.textContent = "Pedido feito com sucesso!";
      mensagemDiv.className = "success";
    } else {
      mensagemDiv.textContent = "Erro ao fazer o pedido. Verifique os valores informados.";
      mensagemDiv.className = "error";
    }

    mensagemDiv.style.display = "block";
    form.reset();
  });
});
