# Compensação TypeScript

**Aluno:** [LETÍCIA DA SILVA TRUNFIO]
**Turma:** [CIENCIA DA COMPUTAÇÃO, TURMA A - NOTURNO]
**Data:** [22/09/2026]

Projeto de compensação de carga horária sobre Git, GitHub, TypeScript, variáveis, escopo e tipagem.

## Estrutura

```text
compensacao-typescript/
├── dist/
│   └── Estatisticas.js      # JavaScript transpilado
├── src/
│   └── Estatisticas.ts      # projeto integrador
├── .gitignore
├── README.md
├── RESPOSTAS.md             # Partes A, B e C + relato de estudo
├── package.json
└── tsconfig.json
```

## Requisitos

- Node.js instalado (recomendado: versão LTS, 20 ou superior).
- npm, que já vem com o Node.

## Como rodar

Clone o repositório e, dentro da pasta, instale as dependências:

```bash
git clone URL_DO_REPOSITORIO
cd compensacao-typescript
npm install
```

Para executar o projeto em TypeScript, com recompilação automática ao salvar:

```bash
npm run dev
```

Para gerar a pasta `dist/` com o JavaScript transpilado:

```bash
npm run build
```

Para executar o JavaScript já compilado:

```bash
npm start
```

## Scripts

| Script | Comando | Para que serve |
| --- | --- | --- |
| `dev` | `tsx src/Estatisticas.ts` | Executa o TypeScript direto, sem gerar arquivo intermediário. |
| `build` | `tsc` | Transpila `src/` para JavaScript na pasta `dist/`. |
| `start` | `node dist/Estatisticas.js` | Roda o JavaScript compilado, como em produção. |

## O que o programa calcula

Média, mínimo, máximo, amplitude, desvio padrão populacional e mediana das temperaturas informadas no array `temperaturas`.

## Por que copiar o array antes de ordenar?

O método `sort()` ordena o array **no lugar**, ou seja, altera o próprio array original. Declarar o array com `const` impede apenas que a variável passe a apontar para outro array — não impede que o conteúdo seja modificado. Por isso, `[...dados].sort((a, b) => a - b)` cria uma cópia antes de ordenar: o cálculo da mediana usa a cópia, e o array original continua na ordem em que foi declarado.
