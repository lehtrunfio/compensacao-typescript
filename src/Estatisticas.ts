const CASAS_DECIMAIS = 2;
const temperaturas: number[] = [21.5, 19.0, 24.3, 22.8, 20.1, 25.6, 23.0];

function validarDados(dados: number[]): void {
  if (dados.length === 0) {
    throw new Error("O conjunto de dados não pode estar vazio.");
  }
}

function calcularMedia(dados: number[]): number {
  validarDados(dados);

  let soma = 0; // acumulador do laço: recebe um novo total a cada iteração
  for (const valor of dados) {
    soma += valor;
  }

  return soma / dados.length;
}

function calcularMinimo(dados: number[]): number {
  validarDados(dados);

  let minimo = dados[0]; // resultado parcial: pode diminuir durante a busca
  for (const valor of dados) {
    if (valor < minimo) {
      minimo = valor;
    }
  }

  return minimo;
}

function calcularMaximo(dados: number[]): number {
  validarDados(dados);

  let maximo = dados[0]; // resultado parcial: pode aumentar durante a busca
  for (const valor of dados) {
    if (valor > maximo) {
      maximo = valor;
    }
  }

  return maximo;
}

function calcularAmplitude(dados: number[]): number {
  return calcularMaximo(dados) - calcularMinimo(dados);
}

function calcularDesvioPadrao(dados: number[]): number {
  validarDados(dados);

  const media = calcularMedia(dados);
  let somaDosQuadrados = 0; // acumulador do laço: soma os desvios elevados ao quadrado

  for (const valor of dados) {
    const desvio = valor - media;
    somaDosQuadrados += desvio ** 2;
  }

  const varianciaPopulacional = somaDosQuadrados / dados.length;
  return Math.sqrt(varianciaPopulacional);
}

function calcularMediana(dados: number[]): number {
  validarDados(dados);

  const dadosOrdenados = [...dados].sort((a, b) => a - b);
  const meio = Math.floor(dadosOrdenados.length / 2);

  if (dadosOrdenados.length % 2 !== 0) {
    return dadosOrdenados[meio];
  }

  return (dadosOrdenados[meio - 1] + dadosOrdenados[meio]) / 2;
}

const media = calcularMedia(temperaturas);
const minimo = calcularMinimo(temperaturas);
const maximo = calcularMaximo(temperaturas);
const amplitude = calcularAmplitude(temperaturas);
const desvioPadrao = calcularDesvioPadrao(temperaturas);
const mediana = calcularMediana(temperaturas);

const temperaturasFormatadas = temperaturas.map((t) => t.toFixed(1)).join(", ");

console.log(`Temperaturas: ${temperaturasFormatadas} °C`);
console.log(`Média: ${media.toFixed(CASAS_DECIMAIS)} °C`);
console.log(`Mínimo: ${minimo.toFixed(CASAS_DECIMAIS)} °C`);
console.log(`Máximo: ${maximo.toFixed(CASAS_DECIMAIS)} °C`);
console.log(`Amplitude: ${amplitude.toFixed(CASAS_DECIMAIS)} °C`);
console.log(`Desvio padrão populacional: ${desvioPadrao.toFixed(CASAS_DECIMAIS)} °C`);
console.log(`Mediana: ${mediana.toFixed(CASAS_DECIMAIS)} °C`);
