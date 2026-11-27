CREATE DATABASE IF NOT EXISTS db_oficina_veiculo;
USE db_oficina_veiculo;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100)
);

CREATE TABLE veiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  placa VARCHAR(10) NOT NULL,
  marca VARCHAR(50),
  modelo VARCHAR(50),
  ano INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_veiculo INT NOT NULL,
  data_agendamento DATETIME NOT NULL,
  servico VARCHAR(100),
  FOREIGN KEY (id_veiculo) REFERENCES veiculos(id)
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
('Lucas Ferreira', 'lucas@mecanica.com', '$2b$10$bTYZ4waAGvHSzpKIfouh5e4FiJgo5XRuk82486nTn1KzFDAJu9i8K');