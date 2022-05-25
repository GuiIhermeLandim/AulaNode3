import chalk from "chalk";
import fs from 'fs';

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    //const linkExtraidos = texto.match(regex);
    //const linkExtraidos = regex.exec(texto);
    const arrayResultados = [];

    let temp;
    while ((temp = regex.exec(texto)) != null) {
        arrayResultados.push({[temp[1]]:[temp[2]]});
    }
    return(arrayResultados);
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, "Caminho errado"));
}

async function pegarArquivo(caminhoDoArquivo){
    const encoding = "utf-8";
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, 
            encoding)
        return(extraiLinks(texto));
    } catch(erro){
        trataErro(erro);
    }
}
//pegarArquivo('./arquivos/texto.md');

export default pegarArquivo;