# Digita Exame

Sistema para digitação e formatação de resultados de exames médicos laboratoriais.

## Descrição

O Digita Exame é uma aplicação web desenvolvida em Next.js que permite aos usuários inserir resultados de exames médicos de forma organizada por categorias. O sistema gera automaticamente um texto formatado que pode ser copiado para uso em prontuários médicos.

## Funcionalidades

- Interface organizada por categorias de exames (Hemograma, Função Renal, Glicemia, etc.)
- Campos de entrada para valores dos exames
- Campo para exames customizados não listados
- Campo para data do exame
- Geração automática de texto formatado
- Botão para copiar resultados
- Botão para limpar todos os campos
- Design responsivo para diferentes dispositivos

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **React 18** - Biblioteca de interface
- **TypeScript** - Linguagem de programação
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Biblioteca de ícones

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/eduardopietre/digita_exame
cd digita_exame
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Scripts Disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa o projeto em modo de produção
- `npm run lint` - Executa o linter para verificar código

## Como Usar

1. **Inserir Data**: Digite a data do exame no campo superior
2. **Preencher Exames**: Insira os valores nos campos correspondentes às categorias de exames
3. **Exames Customizados**: Use o campo "Outros Exames" para inserir exames não listados
4. **Visualizar Resultado**: O texto formatado aparece na seção "Previsão"
5. **Copiar**: Clique em "Copiar" para copiar o texto formatado
6. **Limpar**: Clique em "Limpar" para apagar todos os campos

## Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página principal
│   └── pages.ts         # Configurações de páginas
├── components/          # Componentes reutilizáveis
└── types/              # Definições de tipos TypeScript
```

## Categorias de Exames

O sistema inclui as seguintes categorias de exames:

- Hemograma
- Função Renal
- Glicemia
- Lipidograma
- Eletrólitos
- Função Hepática
- Bilirrubinas/Proteínas
- Coagulação/Inflamação
- Vitaminas
- Ferro
- Hepatites
- Marcadores
- Tireoide
- PSA
- Outros

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
