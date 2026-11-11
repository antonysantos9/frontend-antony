
"use server";

import { cookies } from "next/headers";

// LISTAR MATRÍCULAS
export async function getMatriculasLista() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Erro: Token não encontrado";
    }

    let response: Response;

    try {
        response = await fetch(`${process.env.API_URL}/matriculas`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["pegarListaMatriculas"] },
        });

    } catch (e) {
        console.error(e);
        return "Falha na requisição";
    }

    const data = await response.json();

    console.log(data);

    return data;
}


// LISTAR ALUNOS PARA O SELECT
export async function getAlunosLista() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Erro: Token não encontrado";
    }

    try {
        const response = await fetch(`${process.env.API_URL}/alunos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();

    } catch (e) {
        console.error(e);
        return "Falha ao buscar alunos";
    }
}


// LISTAR CURSOS PARA O SELECT
export async function getCursosLista() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Erro: Token não encontrado";
    }

    try {
        const response = await fetch(`${process.env.API_URL}/cursos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();

    } catch (e) {
        console.error(e);
        return "Falha ao buscar cursos";
    }
}


// CADASTRAR MATRÍCULA
export async function createMatricula(formData: FormData) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return {
            sucesso: false,
            erro: "Token não encontrado."
        };
    }

    // Dados recebidos do formulário
    const matricula = {
        alunoId: Number(formData.get("alunoId")),
        cursoId: Number(formData.get("cursosId")),
        data: formData.get("data"),
    };

    try {
        const response = await fetch(`${process.env.API_URL}/matriculas`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(matricula),
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
                erro: data.erro || data.message || "Não foi possível cadastrar a matrícula."
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
