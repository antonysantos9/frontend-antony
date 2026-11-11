
"use server";

import { cookies } from "next/headers";

// LISTAR CURSOS
export async function getCursosLista() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Erro: Token não encontrado";
    }

    let response: Response;

    try {
        response = await fetch(`${process.env.API_URL}/cursos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["pegarListaCursos"] },
        });

    } catch (e) {
        console.error(e);
        return "Falha na requisição";
    }

    const data = await response.json();

    console.log(data);

    return data;
}


// CADASTRAR CURSO
export async function createCurso(formData: FormData) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return {
            sucesso: false,
            erro: "Token não encontrado."
        };
    }

    // Dados recebidos do formulário
    const curso = {
        nome: formData.get("nome"),
        descricao: formData.get("descricao"),
        cargaHoraria: formData.get("cargaHoraria") ? +formData.get("cargaHoraria")! : null,
    };

    try {
        const response = await fetch(`${process.env.API_URL}/cursos`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(curso),
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
                erro: data.erro || data.message || "Não foi possível cadastrar o curso."
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
