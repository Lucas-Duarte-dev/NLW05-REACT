import { useEffect } from "react";

/**
 * SPA: Single Page Aplication | Dados retornados apenas quando o usuário acessa a página
 * referente ao dado
 *
 * SSR: Server-Side Rendering | Dados são renderizados pelo node interno do next e é entrege no momento
 * que entramos na home, e os dados permanecem mesmo sem o JS habilitado
 *
 * SSG: Static Site Generation | Dados são pegos pelo o backend do next e com esses dados ele criar
 * uma página estatica (um HTML) com esse dados que será fornecido para todos os usuários que acessarem o mesmo,
 * porem você deve estar pensando, então a pagina não terá uma atualização dinamica? e quando os dados mudarem?
 * Aí que vem a carta chave, você pode passar uma propriedade chamada *revalidade* e passar um tempo especifico
 * para o momento que o node do next irá atualizar esse html com os novos dados, assim criando um outro HTML com
 * os novos dados. QUE BAGUI BIZARROOO
 * @returns
 */

export default function Home(props) {
  return <div></div>;
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
