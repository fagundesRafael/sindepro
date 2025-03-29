//app/login/page.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PreviewFooter from '../../components/PreviewFooter';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    declaracao: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.declaracao) {
      setError('Você precisa aceitar os termos para continuar');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        senha: formData.senha,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou senha inválidos');
        return;
      }

      router.push('/');
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com logo e texto */}
      <header className="bg-white shadow-md py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Image
              src="/logos/logo-sindepro-maior.png"
              alt="Logo Sindepro"
              width={80}
              height={20}
              className="h-20 w-auto"
              style={{ height: "auto" }}
            />
            <div className="flex flex-col ml-2 justify-center items-center">
              <h1 className="text-7xl text-red-700 font-bold">SINDEPRO</h1>
              <p className="text-[10px]">SINDICATO DOS DELEGADOS DE POLÍCIA CIVIL DO ESTADO DE RONDÔNIA</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-2xl font-bold text-red-700">Seja bem-vindo(a)!</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="senha" className="sr-only">Senha</label>
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <input
                id="declaracao"
                name="declaracao"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={formData.declaracao}
                onChange={handleChange}
              />
              <label htmlFor="declaracao" className="text-center ml-2 block text-xs text-gray-900">
                Declaro estar ciente das regras de uso do sistema SINDEPRO.
              </label>
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-sm text-gray-900">
                Não tem uma conta? <Link href="/signin" className="text-red-700">Crie uma conta!</Link>
              </h2>
              <h2 className="text-sm text-gray-900">
                Ainda não é filiado? <Link href="/filiacao" className="text-red-700">Filie-se aqui!</Link>
              </h2>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading || !formData.declaracao}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  (loading || !formData.declaracao) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
          <div className="text-center">
                <Link
                  href="/"
                  className=" text-slate-800 text-sm hover:text-red-800 font-medium"
                >
                  Voltar para a página inicial
                </Link>
              </div>
        </div>
      </main>
      <PreviewFooter />
    </div>
  );
} 