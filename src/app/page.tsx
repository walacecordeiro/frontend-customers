import { FiTrash } from "react-icons/fi";

export default function Home() {
 return (
  <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
   <main className="my-9 w-full md:max-w-2xl">
    <h1 className="text-4xl font-medium text-white">Clientes</h1>

    <form className="flex flex-col my-4">
     <label htmlFor="name" className="font-medium text-white">
      Nome:{" "}
     </label>
     <input
      className="w-full mb-5 p-2 rounded"
      id="name"
      type="text"
      placeholder="Digite seu nome completo"
     />
     <label htmlFor="name" className="font-medium text-white">
      Email:{" "}
     </label>
     <input
      id="name"
      type="text"
      placeholder="Digite seu email principal"
      className="w-full mb-5 p-2 rounded"
     />

     <input type="submit" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
    </form>

    <section className="flex flex-col">
     <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
      <p>
       <span className="font-medium">Nome: </span> Walace
      </p>
      <p>
       <span className="font-medium">Email: </span> walace@teste.com
      </p>
      <p>
       <span className="font-medium">Status: </span> ATIVO
      </p>

      <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -top-2 right-2">
       <FiTrash size={18} color="fff" />
      </button>
     </article>
    </section>
   </main>
  </div>
 );
}
