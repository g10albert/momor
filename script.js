document.addEventListener("DOMContentLoaded", function () {
  // =========================================
  // 1. Contador de Mensagens (Ato II)
  // =========================================

  const contadorMensagens = document.getElementById("contador-mensagens");
  const valorAlvo = 60000; // O número total de mensagens que você definiu
  let inicioContagem = 0;

  // Função para animar o contador
  function animarContador() {
    const duracao = 2000; // 2 segundos
    const incremento = valorAlvo / (duracao / 10); // Aumenta a cada 10ms

    const intervalo = setInterval(() => {
      inicioContagem += incremento;
      if (inicioContagem < valorAlvo) {
        // Arredonda para não ter números decimais
        contadorMensagens.textContent =
          Math.ceil(inicioContagem).toLocaleString("pt-BR");
      } else {
        clearInterval(intervalo);
        contadorMensagens.textContent = "+" + valorAlvo.toLocaleString("pt-BR");
      }
    }, 10);
  }

  // Observador para iniciar a contagem quando o usuário chegar na seção
  const observerContador = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === "contador-mensagens") {
          animarContador();
          observerContador.unobserve(entry.target); // Para que conte apenas uma vez
        }
      });
    },
    { threshold: 0.8 }
  ); // Inicia quando 80% do elemento estiver visível

  // Observa o elemento do contador de mensagens
  if (contadorMensagens) {
    observerContador.observe(contadorMensagens);
  }

  // =========================================
  // 3. Animação das Fotos (Fade-in na Rolagem - Ato I)
  // =========================================

  const memorias = document.querySelectorAll(".memoria");

  const observerMemorias = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Adiciona a classe que o CSS usa para o fade-in
          entry.target.classList.add("visivel");
          observer.unobserve(entry.target); // Para que a animação não se repita
        }
      });
    },
    { threshold: 0.4 }
  ); // Dispara quando 40% da foto está visível

  memorias.forEach((memoria) => {
    observerMemorias.observe(memoria);
  });

  // =========================================
  // 4. Contagem Regressiva (Ato III)
  // =========================================

  // *************************************************************
  // ** AJUSTE A DATA E HORA DO SEU PRÓXIMO ENCONTRO OU CASAMENTO AQUI! **
  // Exemplo: 1º de Janeiro de 2026, 10:00:00 (Fuso Horário Local)
  const dataAlvo = new Date("March 2, 2026 23:00:00").getTime();
  // *************************************************************

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  function atualizarContador() {
    // Pega a data e hora atual
    const agora = new Date().getTime();

    // Calcula a diferença
    const diferenca = dataAlvo - agora;

    // Se o tempo acabou
    if (diferenca < 0) {
      clearInterval(intervaloContador);
      // Mensagem de conclusão
      if (diasEl) {
        diasEl.textContent = "0";
        horasEl.textContent = "0";
        minutosEl.textContent = "0";
        segundosEl.textContent = "0";
        document.querySelector(".para-frase-final").textContent =
          "O GRANDE DIA CHEGOU!";
      }
      return;
    }

    // Cálculos de tempo (muito importante!)
    const segundos = Math.floor((diferenca / 1000) % 60);
    const minutos = Math.floor((diferenca / 1000 / 60) % 60);
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    // Insere no HTML, usando a função padStart para adicionar um zero (ex: 09)
    if (diasEl) {
      diasEl.textContent = dias.toString();
      horasEl.textContent = horas.toString().padStart(2, "0");
      minutosEl.textContent = minutos.toString().padStart(2, "0");
      segundosEl.textContent = segundos.toString().padStart(2, "0");
    }
  }

  // Atualiza o contador a cada segundo
  const intervaloContador = setInterval(atualizarContador, 1000);
  // Chama uma vez imediatamente para evitar atraso no primeiro segundo
  atualizarContador();
});
