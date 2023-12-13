import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";



const app = express();
app.use(express.json());

const repository = new PrismaClient();

app.get('/usuarios', async (req: Request, res: Response) => {
    const usuarios = await repository.usuario.findMany()
    res.status(200).send({
        ok: true,
        message: "Usuário listado com sucesso!",
        data: usuarios,
    })

});

app.post('/usuarios', async (req: Request, res: Response) => {
    const { nome, sobrenome, tipo } = req.body

    if(!nome || !sobrenome || !tipo) {
        return res.status(400).send({
            ok: false,
            message: "Informe todos os dados"
        })
    }

    await repository.usuario.create({
        data: {
            nome,
            sobrenome,
            tipo
        },
    })
    res.status(201).send({
        ok: true,
        message: "Usuário criado com sucesso!"
    })
})


app.listen(3333, () => {
    console.log('api está rodando!')
});


// async function listarUsuario() {
//     const usuarios = await repository.usuario.findMany();
//     console.log(usuarios);
    
    

// }

// listarUsuario()
