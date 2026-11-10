
"use server";

import { cookies } from "next/headers";

// LISTAR FUNCIONÁRIOS
export async function getFuncionariosLista() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Erro: Token não encontrado";
    }

    let response: Response;

    try {
        response = await fetch(`${process.env.API_URL}/funcionarios`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["pegarListaFuncionarios"] },
        });

    } catch (e) {
        console.error(e);
        return "Falha na requisição";
    }

    const data = await response.json();

    console.log(data);

    return data;
}


// CADASTRAR FUNCIONÁRIO
export async function createFuncionario(formData: FormData) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return {
            sucesso: false,
            erro: "Token não encontrado."
        };
    }

    // Dados recebidos do formulário
    const funcionario = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        cargo: formData.get("cargo"),
        nascimento: formData.get("nascimento"),
        senha: formData.get("senha"),
        telefone: formData.get("telefone"),
        endereco: formData.get("endereco"),
    };

    try {
        const response = await fetch(`${process.env.API_URL}/funcionarios`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(funcionario),
        });

        // Recebe a resposta da API
        const texto = await response.text();

        let data: { erro?: string; message?: string } = {};

        try {
            data = texto ? JSON.parse(texto) : {};
        } catch {
            data = {};
        }

        // Verifica se ocorreu algum erro
        if (!response.ok) {
            return {
                sucesso: false,
                erro: data.erro || data.message || "Não foi possível cadastrar o funcionário."
            };
        }

        return {
            sucesso: true,
            erro: ""
        };

    } catch (e) {
        console.error(e);

        return {
            sucesso: false,
            erro: "Falha ao conectar com o servidor."
        };
    }
}
