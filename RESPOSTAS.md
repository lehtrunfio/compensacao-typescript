# RESPOSTAS — Compensação TypeScript

> Antes de entregar, substitua os campos entre colchetes pelos seus dados e pelas versões instaladas na sua máquina.

## Parte A — Git e GitHub

### A1. Qual comando resolve cada situação?

**a) Configurar nome e e-mail dos commits**

```bash
git config --global user.name "[Seu Nome]"
git config --global user.email "[seu-email@exemplo.com]"
```

**b) Trazer pela primeira vez o repositório publicado pelo professor**

```bash
git clone URL_DO_REPOSITORIO_DO_PROFESSOR
```

**c) Descobrir para qual repositório remoto a pasta local aponta**

```bash
git remote -v
```

**d) Registrar localmente, com mensagem, todas as alterações**

```bash
git add .
git commit -m "Descreve as alterações realizadas"
```

**e) Trazer as mudanças que os colegas já enviaram**

```bash
git pull origin main
```

**f) Passar a apontar para o repositório próprio**

```bash
git remote set-url origin URL_DO_SEU_REPOSITORIO
```

**g) Ver os arquivos alterados que ainda não entraram no commit**

```bash
git status
```

### A2. O ciclo do dia a dia

( 3 ) git commit -m "..."
( 1 ) editar o arquivo no VS Code
( 5 ) git push origin main
( 4 ) git add .
( 2 ) git pull origin main

O `pull` vem antes de editar porque atualiza a cópia local com o que já foi publicado. Assim, a edição parte da versão mais recente do projeto: o risco de conflito diminui e não se constrói trabalho novo sobre uma base desatualizada.

### A3. Situação-problema: conflito de merge

**a)** O conflito aconteceu porque você e a colega alteraram a mesma região do mesmo arquivo. O Git não tem como decidir qual das duas versões deve prevalecer e interrompe a operação para que uma pessoa escolha.

**b)** O Git escreve estas marcações dentro do arquivo:

```text
<<<<<<< HEAD
(a sua versão local)
=======
(a versão que veio do repositório remoto)
>>>>>>> identificação-do-commit-da-colega
```

**c) Resolução em três passos:**

1. Abrir o arquivo, comparar os dois blocos, deixar o conteúdo correto (ou a combinação dos dois) e apagar as linhas `<<<<<<<`, `=======` e `>>>>>>>`.
2. Marcar como resolvido e registrar: `git add index.html` e depois `git commit -m "Resolve conflito em index.html"`.
3. Enviar a resolução: `git push origin main`.

### A4. Caça ao erro

**a) Causa do erro:** o `git clone` fez o `origin` apontar para o repositório do professor. Como a aluna não tem permissão de escrita nele, o GitHub recusa o `push` com erro de permissão (403 / `Permission denied`). O problema não está no `add` nem no `commit`, que funcionam localmente, e sim no destino do envio. A correção é criar um repositório vazio na própria conta e apontar o `origin` para ele — além de ter a autenticação configurada (chave SSH ou token pessoal).

**b) Sequência que resolve, do repositório vazio até o push bem-sucedido:**

```bash
git clone URL_DO_REPOSITORIO_DO_PROFESSOR
cd NOME_DA_PASTA
git remote -v
git remote set-url origin URL_DO_SEU_REPOSITORIO_VAZIO
git add .
git commit -m "Entrega da atividade"
git branch -M main
git push -u origin main
```

Se as alterações já tinham sido commitadas antes da troca do remoto, os comandos `git add` e `git commit` não precisam ser repetidos.

### A5. Prática

URL do repositório público: **[COLE AQUI A URL REAL DO SEU REPOSITÓRIO]**

Primeiro commit feito pela linha de comando, depois de criar no GitHub um repositório vazio chamado `compensacao-typescript`:

```bash
mkdir compensacao-typescript
cd compensacao-typescript
git init
# criar o README.md com nome, turma e data
git add README.md
git commit -m "Cria README inicial"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## Parte B — TypeScript: ambiente, tipagem e transpilação

### B1. Prevendo a saída em JavaScript puro

```js
const soma = (a, b) => a + b;
```

| Chamada | Resultado | Por quê? |
| --- | --- | --- |
| `soma(7, 3)` | `10` | Os dois operandos são números, então o `+` soma. |
| `soma('7', '3')` | `'73'` | Os dois operandos são textos, então o `+` concatena. |
| `soma('7', 3)` | `'73'` | Com pelo menos uma string, o número é convertido em texto e concatenado. |
| `soma(true, 1)` | `2` | `true` é convertido em `1` na operação numérica. |
| `soma(10, '')` | `'10'` | A string vazia força a conversão do número em texto. |

Em TypeScript, com `const soma = (a: number, b: number): number => a + b;`, **somente `soma(7, 3)` é aceita**. As outras quatro são recusadas:

- `soma('7', '3')` → `Argument of type 'string' is not assignable to parameter of type 'number'.`
- `soma('7', 3)` → `Argument of type 'string' is not assignable to parameter of type 'number'.`
- `soma(true, 1)` → `Argument of type 'boolean' is not assignable to parameter of type 'number'.`
- `soma(10, '')` → `Argument of type 'string' is not assignable to parameter of type 'number'.`

### B2. Detetive da transpilação

```text
C  "use strict";
C  Object.defineProperty(exports, "__esModule", { value: true });
V  const dobro = (n) => n * 2;
V  console.log(dobro(21));
C  //# sourceMappingURL=App.js.map
```

| Linha | Para que serve |
| --- | --- |
| `"use strict";` | Liga o modo estrito: regras mais rígidas na execução, por exemplo usar variável sem declarar vira erro em vez de criar uma global por acidente. |
| `Object.defineProperty(...__esModule...)` | Marca o arquivo como módulo, etiquetando que ele veio de um módulo ES. É a ponte de compatibilidade entre ESM e CommonJS. |
| `//# sourceMappingURL=...` | Aponta para o source map, que liga o JavaScript gerado de volta às linhas do TypeScript original, permitindo depurar no `.ts`. |

A anotação `(n: number): number` desapareceu no arquivo gerado porque o JavaScript não tem tipos — eles só existem em tempo de compilação. Esse comportamento se chama **type erasure (apagamento de tipos)**: o `tsc` remove as anotações e produz JS limpo, que roda em qualquer lugar.

### B3. Escolhendo o executor certo

| Cenário | Escolha | Justificativa |
| --- | --- | --- |
| a) Sistema legado em Node 16, que ninguém pode atualizar agora | `ts-node` | É o executor tradicional e funciona nas versões antigas do Node, enquanto o `tsx` exige versões mais recentes. |
| b) Projeto novo em Node 22, priorizando velocidade e configuração mínima | `tsx` | Executa TypeScript na hora, com muito menos configuração e mais desempenho que o `ts-node`. |
| c) Script único em Node 23, sem instalar dependências extras | Suporte nativo do Node | O Node 23 executa TypeScript diretamente (com apagamento de tipos), sem precisar instalar nem `tsx` nem `ts-node`. |

### B4. Sistemas de módulos

| Aspecto | CommonJS | ES Modules |
| --- | --- | --- |
| Palavra usada para importar | `require()` | `import` |
| Forma de exportar | `module.exports = ...` ou `exports.nome = ...` | `export` / `export default` |
| Origem | Sistema clássico do Node.js (2009) | Padrão oficial da linguagem, definido no ES2015 |
| O que escrever no `package.json` | `"type": "commonjs"` (ou omitir o campo `type`) | `"type": "module"` |

Para projetos novos a recomendação é **ES Modules**. É o padrão atual da linguagem, funciona tanto no Node quanto no navegador, permite *tree shaking* (o empacotador descarta o que não é usado) e a sintaxe `import`/`export` é a mesma que os frameworks modernos usam.

### B5. Prática: montando o projeto

Comandos executados dentro da pasta do repositório da Parte A:

```bash
npm init -y
npx tsc --init
npm install -D typescript @types/node tsx
```

Saídas obtidas na máquina:

```text
node -v: [EXECUTE E COLE A VERSÃO REAL, EX.: v22.14.0]
npx tsc -v: [EXECUTE E COLE A VERSÃO REAL, EX.: Version 5.9.2]
```

Bloco `scripts` do `package.json`:

```json
{
  "scripts": {
    "dev": "tsx src/Estatisticas.ts",
    "build": "tsc",
    "start": "node dist/Estatisticas.js"
  }
}
```

- **dev:** executa o `.ts` direto, sem gerar arquivo intermediário — é o comando do dia a dia enquanto se programa.
- **build:** chama o compilador `tsc` e transpila `src/` para JavaScript na pasta `dist/`.
- **start:** roda o JavaScript já gerado com o Node, simulando o que iria para produção.

## Parte C — Variáveis: var, let e const

### C1. Compila ou não compila?

| Linha | OK / ERRO | Razão |
| --- | --- | --- |
| 1) `const taxa = 0.1; taxa = 0.2;` | ERRO | Constante não pode ser reatribuída. |
| 2) `let dias = 7; dias = 10;` | OK | `let` permite reatribuição. |
| 3) `const cores = ["azul"]; cores.push("verde");` | OK | Muda o conteúdo do mesmo array; a referência continua a mesma. |
| 4) `const cores = ["azul"]; cores = ["verde"];` | ERRO | Tenta fazer a constante apontar para outro array. |
| 5) `let nome = "Ana"; let nome = "Bia";` | ERRO | `let` não aceita redeclaração no mesmo escopo. |
| 6) `const limite;` | ERRO | Toda declaração `const` precisa ser inicializada. |
| 7) `let idade: number = "19";` | ERRO | Uma string não é atribuível ao tipo `number`. |
| 8) `var x = 1; var x = 2;` | OK | `var` aceita redeclaração no mesmo escopo (comportamento perigoso). |

O `const` protege a **referência**, ou seja, o vínculo entre o nome e o valor. Em um array, ele impede que a variável passe a apontar para outro array, mas continua permitindo alterar os itens existentes (`push`, `sort`, `cores[0] = ...`). Para congelar também o conteúdo, seria necessário `Object.freeze()` ou o tipo `readonly`.

### C2. Caça ao vazamento

**a) Saída prevista:**

```text
15 4
```

Como `var` ignora blocos e aceita redeclaração, o `pontos` de dentro do `for` é a mesma variável do lado de fora. Na última volta, ela recebe `3 * 5 = 15`. A variável `i` também escapa do laço e termina valendo `4`.

**b) Versão com `let` / `const`:**

```ts
let pontos = 0;

for (let i = 0; i < 4; i++) {
  const pontos = i * 5;
  console.log(`Pontos na iteração: ${pontos}`);
}

console.log(pontos); // 0
// console.log(i);   // ERRO: Cannot find name 'i'.
```

Com escopo de bloco, o `pontos` interno é outra variável e não afeta o externo, que continua `0`. O `i` também fica confinado ao `for` — tentar usá-lo depois gera `Cannot find name 'i'.`

**c) O clássico do laço:**

Com `var`, existe **uma única variável `j`** para todas as voltas. Quando o `setTimeout` finalmente executa (depois que o laço terminou), o valor já é `3` — por isso aparece `3, 3, 3`. Com `let`, **cada iteração cria uma nova ligação `k`**, então cada callback enxerga o valor da sua própria volta: `0, 1, 2`.

### C3. Detetive de tipos

| Declaração | Tipo inferido |
| --- | --- |
| `const uf = "SP";` | `"SP"` (tipo literal) |
| `let cidade = "Sumaré";` | `string` |
| `let habitantes = 290000;` | `number` |
| `const capital = false;` | `false` (tipo literal) |
| `const notas = [7.5, 8];` | `number[]` |
| `const densidade = habitantes / 153;` | `number` |
| `let area;` | `any` (implícito) |

`uf` e `cidade` guardam o mesmo tipo de valor, mas com declarações diferentes. Em uma `const`, o valor não pode ser trocado, então o TypeScript pode inferir o **tipo literal** `"SP"`. Em uma `let`, o valor pode mudar, então o tipo é **alargado** para `string`. A diferença aparece, por exemplo, em uma função que aceita só `"SP" | "RJ"`: passar `uf` compila, mas passar `cidade` gera `Argument of type 'string' is not assignable to parameter of type '"SP" | "RJ"'.`

`let area;` é um problema porque, sem valor inicial e sem anotação, o TypeScript não tem de onde inferir o tipo e atribui `any` — o que desliga a verificação naquela variável. Correção: anotar e inicializar, por exemplo `let area: number; area = 153;` ou, melhor ainda, `const area = 153;`.

### C4. Refatorando com "const por padrão"

Código original:

```ts
let limite = 20;
let lista = [18.5, 22.0, 27.4, 19.9];
let t = 0;
for (let v of lista) { t = t + v; }
let m = t / lista.length;
let f = m > limite;
let msg = "Media: " + m;
console.log(msg, f);
```

Código refatorado:

```ts
const LIMITE_MEDIA = 20;                       // configuração: UPPER_SNAKE_CASE
const valores: number[] = [18.5, 22.0, 27.4, 19.9]; // coleção: plural + tipo anotado

let total = 0; // let porque é acumulador: recebe um novo valor a cada iteração
for (const valor of valores) {
  total += valor;
}

const media = total / valores.length;
const acimaDoLimite = media > LIMITE_MEDIA;
const mensagem = `Média: ${media}`;

console.log(mensagem, acimaDoLimite);
```

**Sobrou apenas uma variável como `let`: `total`**, justificado pelo comentário — ela é reatribuída dentro do laço para acumular a soma. Todas as outras viraram `const`, porque os valores são calculados uma única vez. A variável de iteração ficou como `const` porque cada volta cria uma ligação nova e ela não é reatribuída dentro da volta.

### C5. Lendo as mensagens do compilador

| Mensagem | Causa provável | Correção |
| --- | --- | --- |
| `Cannot assign to 'X' because it is a constant.` (TS2588) | Tentativa de reatribuir uma variável declarada com `const`. | Trocar para `let` se a mudança for realmente necessária, ou criar outra constante. |
| `'const' declarations must be initialized.` (TS1155) | Declaração `const x;` sem valor. | Inicializar na própria declaração. |
| `Block-scoped variable 'X' used before its declaration.` (TS2448) | Uso de `let`/`const` antes da linha da declaração — zona morta temporal. | Mover a declaração para antes do uso. |
| `Variable 'X' is used before being assigned.` (TS2454) | A variável foi lida sem ter recebido valor em algum caminho. | Inicializar na declaração ou atribuir em todos os caminhos antes da leitura. |
| `Cannot find name 'X'.` (TS2304) | Nome inexistente, fora do escopo ou escrito errado. | Corrigir a grafia ou mover o uso para o escopo correto. |
| `Type 'string' is not assignable to type 'number'.` (TS2322) | Atribuição de texto onde se espera número. | Corrigir o dado, mudar o tipo da variável ou converter com `Number(...)`. |

Lendo a linha de erro `src/Variaveis.ts:12:1 - error TS2588: Cannot assign to 'TAXA_IOF' because it is a constant.`:

| Parte | O que indica |
| --- | --- |
| `src/Variaveis.ts:12:1` | Arquivo `src/Variaveis.ts`, linha 12, coluna 1 — onde o erro foi detectado. |
| `TS2588` | Código do diagnóstico, que pode ser pesquisado na documentação do TypeScript. |
| Texto da mensagem | Diz que houve tentativa de atribuir valor a `TAXA_IOF`, que é uma constante. |

### C6. Escopo e zona morta temporal

Trecho com problemas:

```ts
console.log(META);
const META = 100;

function classificar(valor: number) {
  if (valor > META) {
    const rotulo = "acima";
  } else {
    const rotulo = "abaixo";
  }
  return rotulo;
}

let saida: string;
console.log(saida.toUpperCase());
```

| # | Mensagem do compilador | Como corrigir |
| --- | --- | --- |
| 1 | `Block-scoped variable 'META' used before its declaration.` (TS2448) | Declarar `const META = 100;` antes do `console.log`. |
| 2 | `Cannot find name 'rotulo'.` (TS2304) | O `rotulo` de cada ramo morre no bloco do `if`/`else`. Retornar dentro de cada ramo ou declarar a variável no escopo da função. |
| 3 | `Variable 'saida' is used before being assigned.` (TS2454) | Atribuir um valor a `saida` antes de usar `toUpperCase()`. |

Versão corrigida completa, sem nenhum `var`:

```ts
const META = 100;
console.log(META);

function classificar(valor: number): string {
  if (valor > META) {
    return "acima";
  }

  return "abaixo";
}

const saida: string = classificar(120);
console.log(saida.toUpperCase());
```

## Parte D — Projeto integrador

O arquivo `src/Estatisticas.ts` calcula média, mínimo, máximo, amplitude, desvio padrão populacional e mediana do conjunto de temperaturas. Roda com `npm run dev` e a `dist/` é gerada com `npm run build`. O código está no repositório, junto com o `package.json`, o `tsconfig.json` e o JS transpilado.

Resultados obtidos com o conjunto `[21.5, 19.0, 24.3, 22.8, 20.1, 25.6, 23.0]` na última execução do programa: veja a saída real do `npm run dev` na sua máquina e cole aqui, se o professor pedir.

## Relato de estudo

O conceito das três apostilas que eu considerei mais difícil foi a diferença entre proteger a referência e proteger o conteúdo no `const`. No começo eu achava que `const` deixava tudo imutável, mas entendi que ele trava apenas a ligação entre o nome e o valor: `cores.push("verde")` funciona, `cores = ["verde"]` não. O que me ajudou foi pensar na metáfora da etiqueta colada na caixa: a etiqueta não pode ser transferida para outra caixa, mas o conteúdo da caixa pode ser trocado. Um bug concreto que o TypeScript pegaria e o JavaScript deixaria passar é uma função declarada como `soma(a: number, b: number)` recebendo `soma("7", 3)`: em JavaScript isso roda e devolve o texto `"73"` em vez do número `10`, e o erro só aparece muito depois, quando algum cálculo resulta em `NaN`. Em TypeScript, o editor recusa na hora, antes de o programa rodar. Para alguém que nunca programou, eu explicaria `let` como uma caixa onde você pode guardar coisas diferentes ao longo do dia, e `const` como uma gaveta etiquetada que sempre mantém a mesma etiqueta e o mesmo lugar — o que está dentro pode até mudar, mas a gaveta não se muda para outro armário. Como padrão, uso `const`; só troco para `let` quando existe uma reatribuição real, como um contador ou um acumulador. Também ficou claro por que `var` não entra em código novo: por ignorar blocos e aceitar redeclaração, ela cria vazamentos silenciosos que geram bugs difíceis de achar.

## Checklist de entrega

| OK | Item |
| --- | --- |
| ( ) | Repositório público `compensacao-typescript` criado e com README |
| ( ) | `RESPOSTAS.md` com as Partes A, B e C respondidas |
| ( ) | `package.json` com os scripts `dev`, `build` e `start` |
| ( ) | `tsconfig.json` presente |
| ( ) | `src/Estatisticas.ts` rodando com `npm run dev` |
| ( ) | Pasta `dist/` gerada por `npm run build` |
| ( ) | Relato de estudo escrito |
| ( ) | URL do repositório enviada ao professor dentro do prazo |
