# Compensação TypeScript

**Aluna:** Letícia da Silva Trunfio
**Turma:** Ciência da Computação, turma A — noturno
**Data:** 22/09/2026

Projeto de compensação de carga horária sobre Git, GitHub, TypeScript, variáveis, escopo e tipagem.

## Ambiente usado

Não consegui instalar o Node.js no computador disponível, então o `src/Estatisticas.ts` foi executado no **Playground oficial do TypeScript** (typescriptlang.org/play), conforme sugestão do professor. A saída obtida está registrada no item B5 do `RESPOSTAS.md`.

O Playground exibe o JavaScript gerado ao lado do código original e mostra os erros de tipo antes da execução. Os comandos `npm run dev` e `npm run build` dependem do Node instalado e não puderam ser executados.

## Estrutura

```text
compensacao-typescript/
├── dist/
│   └── Estatisticas.js      # JavaScript gerado a partir do arquivo .ts
├── src/
│   └── Estatisticas.ts      # projeto integrador
├── .gitignore
├── README.md
├── RESPOSTAS.md             # Partes A, B e C + relato de estudo
├── package.json
└── tsconfig.json
```

## Scripts

| Script | Comando | Para que serve |
| --- | --- | --- |
| `dev` | `tsx src/Estatisticas.ts` | Executa o TypeScript direto, sem gerar arquivo intermediário. |
| `build` | `tsc` | Transpila `src/` para JavaScript na pasta `dist/`. |
| `start` | `node dist/Estatisticas.js` | Roda o JavaScript compilado, como em produção. |

## O que o programa calcula

Média, mínimo, máximo, amplitude, desvio padrão populacional e mediana das temperaturas informadas no array `temperaturas`. Resultado obtido com o conjunto `[21.5, 19.0, 24.3, 22.8, 20.1, 25.6, 23.0]`: média 22,33 °C, mínimo 19,00 °C, máximo 25,60 °C, amplitude 6,60 °C, desvio padrão 2,14 °C e mediana 22,80 °C.

## Por que copiar o array antes de ordenar?

O método `sort()` ordena o array **no lugar**, ou seja, altera o próprio array original. Declarar o array com `const` impede apenas que a variável passe a apontar para outro array — não impede que o conteúdo seja modificado. Por isso, `[...dados].sort((a, b) => a - b)` cria uma cópia antes de ordenar: o cálculo da mediana usa a cópia, e o array original continua na ordem em que foi declarado — o que importa quando a ordem das temperaturas representa a sequência dos dias.
