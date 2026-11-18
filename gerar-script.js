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

const sql = `CREATE DATABASE IF NOT EXISTS db_oficina_veiculo;
USE db_oficina_veiculo;

CREATE TABLE IF NOT EXISTS clientes(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    telefone CHAR(11)
);

CREATE TABLE IF NOT EXISTS veiculos(
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(100) NOT NULL,
    ano YEAR,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS agendamentos(
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_veiculo INT,
    data_agendamento DATETIME NOT NULL,
    servico VARCHAR(100),
    FOREIGN KEY (id_veiculo) REFERENCES veiculos(id_veiculo)
);

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL
);

INSERT INTO clientes (nome, cpf, email, telefone) VALUES
('João Silva', 'ce4751c785b836452a1c6c2c9a937267', 'joao@gmail.com', '11987654321'),
('Maria Oliveira', 'adee4f72b9422fcf93ab6528bf098ea2', 'maria@gmail.com', '11976543210'),
('Pedro Santos', '3c6c35b49851f208aab4504e0f4ce3fe', 'pedro@gmail.com', '11965432109');

INSERT INTO veiculos (marca, modelo, placa, ano, id_cliente) VALUES
('Toyota', 'Corolla', 'ABC1D23', 2022, 1),
('Honda', 'Civic', 'DEF4G56', 2021, 2),
('Volkswagen', 'Gol', 'GHI7J89', 2019, 3);

INSERT INTO agendamentos (id_veiculo, data_agendamento, servico) VALUES
(1, '2026-11-12 09:00:00', 'Troca de óleo'),
(2, '2026-11-13 14:30:00', 'Revisão completa'),
(3, '2026-11-14 10:00:00', 'Alinhamento e balanceamento');

INSERT INTO usuarios (nome, email, senha) VALUES
('Carlos Mendes', 'carlos@mecanica.com', '$2b$10$R9BleUaedTVFsIzmHjjx3.yalex0buw9JL0TXHRO7Mg.OKqpANAb6'),
('Ana Costa', 'ana@mecanica.com', '$2b$10$BdK/ltrAGgIjCbmLVTwIxOVpkRCHZYNkqKUV5UKWlA12yohsrcnOm'),
('Lucas Ferreira', 'lucas@mecanica.com', '$2b$10$bTYZ4waAGvHSzpKIfouh5e4FiJgo5XRuk82486nTn1KzFDAJu9i8K');`


const caminhoSaida = path.join(__dirname, 'database', 'script.sql')

fs.writeFileSync(caminhoSaida, sql)
console.log(`Arquivo gerado em ${caminhoSaida}`)