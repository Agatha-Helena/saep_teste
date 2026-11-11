require ('dotenv').config()
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

function criptografarCpf(texto){
    const cifra = crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV)

    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex')
}

const senhaHash = bcrypt.hashSync('1234', 10)

const cpf1 = criptografarCpf('11122233344')
const cpf2 = criptografarCpf('44455566677')
const cpf3 = criptografarCpf('77788899900')

const sql = `CREATE DATABASE if not exist`

/* código mysql aqui */

const caminhoSaida = path.join(__dirname, 'database', 'script.sql')