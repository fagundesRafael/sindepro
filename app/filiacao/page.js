//app/filiacao/page.js
'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PreviewFooter from '../../components/PreviewFooter';

export default function Filiacao() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/filiacao/solicitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Erro ao enviar solicitação');
            }

            setSuccess(true);
            setFormData({ nome: '', email: '' });

        } catch (err) {
            setError(err.message || 'Erro ao processar sua solicitação');
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
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

            <main className="flex-grow flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-6">
                    {success ? (
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
                                Solicitação Enviada com Sucesso!
                            </h2>
                            <p className="text-gray-600 text-center mb-6">
                                Enviamos o formulário de filiação para seu email. Por favor, preencha-o e siga as instruções para completar seu processo de filiação.
                            </p>
                            <div className="text-center">
                                <Link
                                    href="/"
                                    className="text-red-700 hover:text-red-800 font-medium"
                                >
                                    Voltar para a página inicial
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h2 className="text-center text-2xl font-bold text-red-700">Solicitar Filiação</h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Preencha seus dados para receber o formulário de filiação
                                </p>
                            </div>

                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                )}

                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div className="mb-4">
                                        <input
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            required
                                            className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                            placeholder="Nome Completo"
                                            value={formData.nome}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        {loading ? 'Enviando...' : 'Solicitar Filiação'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                    <div className="text-center text-slate-500">
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