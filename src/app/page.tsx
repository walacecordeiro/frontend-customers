"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { api } from "@/services/api";
import { FiTrash } from "react-icons/fi";
import Alert from "sweetalert2";

interface CustomersProps {
 id: string;
 name: string;
 email: string;
 status: boolean;
 created_at: string;
}

export default function Home() {
 const [customers, setCustomers] = useState<CustomersProps[]>([]);
 const nameRef = useRef<HTMLInputElement | null>(null);
 const emailRef = useRef<HTMLInputElement | null>(null);

 useEffect(() => {
  loadCustomers();
 }, []);

 async function loadCustomers() {
  const response = await api.get("/customers");
  setCustomers(response.data);
 }

 async function handleSubmit(event: FormEvent) {
  event.preventDefault();

  if (!nameRef.current?.value || !emailRef.current?.value) {
   alert("Preencha todos os campos!");
   return;
  }

  const response = await api.post("/customer", {
   name: nameRef.current?.value,
   email: emailRef.current?.value,
  });

  setCustomers((allCustomers) => [...allCustomers, response.data]);
  nameRef.current.value = "";
  emailRef.current.value = "";
 }

 async function handleDelete(id: string) {
  Alert.fire({
   title: "Tem certeza que quer deletar?",
   text: "Você não poderá reverter isso!",
   icon: "warning",
   iconColor: "#EF4444",
   showCancelButton: true,
   confirmButtonColor: "#86EFAC",
   cancelButtonColor: "#EF4444",
   confirmButtonText: "Sim, deletar",
   cancelButtonText: "Não, cancelar",
  }).then(async (result) => {
   if (result.isConfirmed) {
    try {
     await api.delete("/customer", {
      params: {
       id: id,
      },
     });

     const allCustomers = customers.filter((customer) => customer.id !== id);
     setCustomers(allCustomers);
    } catch (err) {
     console.log(err);
    }
   }
  });
 }

 return (
  <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
   <main className="my-9 w-full md:max-w-2xl">
    <h1 className="text-4xl font-medium text-white">Clientes</h1>

    <form onSubmit={handleSubmit} className="flex flex-col my-4">
     <label htmlFor="name" className="font-medium text-white">
      Nome:{" "}
     </label>
     <input
      id="name"
      type="text"
      placeholder="Digite seu nome completo"
      ref={nameRef}
      autoComplete="name"
      className="w-full mb-5 p-2 rounded"
     />
     <label htmlFor="email" className="font-medium text-white">
      Email:{" "}
     </label>
     <input
      id="email"
      type="email"
      placeholder="Digite seu email principal"
      ref={emailRef}
      autoComplete="email"
      className="w-full mb-5 p-2 rounded"
     />

     <input
      value="Cadastrar"
      type="submit"
      className="cursor-pointer w-full p-2 bg-green-300 rounded font-medium hover:scale-[1.03] duration-200"
     />
    </form>

    <section className="flex flex-col-reverse gap-4">
     {customers.map((customer) => (
      <article
       key={customer.id}
       className="w-full bg-white rounded p-2 relative hover:scale-[1.03] duration-200"
      >
       <p>
        <span className="font-medium">Nome: </span> {customer.name}
       </p>
       <p>
        <span className="font-medium">Email: </span> {customer.email}
       </p>
       <p>
        <span className="font-medium">Status: </span> {customer.status ? "Ativo" : "Inativo"}
       </p>

       <button
        onClick={() => handleDelete(customer.id)}
        className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -top-2 right-2"
       >
        <FiTrash size={18} color="fff" />
       </button>
      </article>
     ))}
    </section>
   </main>
  </div>
 );
}
