
"use server";

import { refresh, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// LISTAR ALUNOS
export async function getAlunosLista() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Erro: Token não encontrado";
    }

    let response: Response;

    try {
        response = await fetch(`${process.env.API_URL}/alunos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["pegarListaAlunos"] },
        });

    } catch (e) {
        console.error(e);
        return "Falha na requisição";
    }

    const data = await response.json();

    console.log(data);

    return data;
}


// CADASTRAR ALUNO
export async function createAluno(formData: FormData) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return {
            sucesso: false,
            erro: "Token não encontrado."
        };
    }

    // Dados recebidos do formulário
    const aluno = {
        matricula: formData.get("matricula"),
        cpf: formData.get("cpf"),
        nome: formData.get("nome"),
        email: formData.get("email"),
        nascimento: formData.get("nascimento"),
        telefone: formData.get("telefone") ? +formData.get("telefone")! : null,
        endereco: formData.get("endereco"),
        sexo: formData.get("sexo"),
    };

    try {
        const response = await fetch(`${process.env.API_URL}/alunos`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(aluno),
        });


        // Recebe a resposta da API
        const texto = await response.json();

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
                erro: data.erro || data.message || "Não foi possível cadastrar o aluno."
            };
        }

        revalidateTag("pegarListaAlunos", "max")
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
