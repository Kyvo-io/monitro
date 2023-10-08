import banco.Conexao;
import negocio.usuario.UsuarioService;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Scanner;

public class App {
    public static void main(String[] args) {




        String titulo = "                                                   .::.                                   \n" +
                "                                                   .::.   .:.                             \n" +
                "                                                          :::                             \n" +
                " .:::::::.:::::::.     .:::::::.     .::::::::.    .::.   :::::::.   :::::::   .:::::::.  \n" +
                ":::.   .:::    :::    :::     :::   .:::    .::.   .::.   :::       :::       :::.    :::.\n" +
                ":::     ::.    .::   :::.     .::.  .:::     :::   .::.   :::       :::      .::.      :::\n" +
                ":::     ::.    .::   .::.     .::.  .:::     :::   .::.   :::       :::      .:::      :::\n" +
                ":::     ::.    .::    :::.   .:::   .:::     :::   .::.   :::.      :::       :::.    ::: \n" +
                ".::     ::.    .::     .:::::::.     :::     :::   .::.    .:::::   .::        ..::::::.  \n";

        System.out.println(titulo);
        System.out.println("Bem vindo ao Monitro!");
        Boolean entradaSucedida = login();
        if(entradaSucedida){
            String menu = """
                    Usuário: 
                    Empresa: 
                    1 - Iniciar o monitoramento
                    2 - Criar banco local
                    
                    """;
            System.out.println(menu);
            Conexao conexao = new Conexao();
            String bancoLocal = """
CREATE SCHEMA monitro;
SET SCHEMA monitro;
CREATE TABLE Empresa (
                      idEmpresa INT NOT NULL,
                      nomeEmpresa VARCHAR(45) NULL,
                      CNPJ CHAR(14) NULL,
                      email VARCHAR(45) NULL,
                      nacionalidade VARCHAR(45) NULL,
                      tipoOrgao VARCHAR(45) NULL,
                      PRIMARY KEY (idEmpresa));
                    
                    CREATE TABLE Endereço (
                      idEndereço INT NOT NULL,
                      logradouro VARCHAR(45) NULL,
                      codigoPostal VARCHAR(45) NULL,
                      bairro VARCHAR(45) NULL,
                      coordenada GEOMETRY NULL,
                      PRIMARY KEY (idEndereço));
                    
                    CREATE TABLE Servidor (
                      idServidor INT NOT NULL,
                      fkEmpresa INT NOT NULL,
                      fkEndereco INT NOT NULL,
                      PRIMARY KEY (idServidor, fkEmpresa),
                      INDEX fk_Servidor_Empresa1_idx (fkEmpresa ASC) VISIBLE,
                      INDEX fk_Servidor_Endereço1_idx (fkEndereco ASC) VISIBLE,
                      CONSTRAINT fk_Servidor_Empresa1
                        FOREIGN KEY (fkEmpresa)
                        REFERENCES Empresa (idEmpresa)
                        ,
                      CONSTRAINT fk_Servidor_Endereço1
                        FOREIGN KEY (fkEndereco)
                        REFERENCES Endereço (idEndereço)
                        );
                    
                    
                    CREATE TABLE  Usuario (
                      idUsuario INT NOT NULL,
                      nomeUsuario VARCHAR(45) NULL,
                      email VARCHAR(45) NULL,
                      cargo VARCHAR(45) NULL,
                      senha VARCHAR(45) NULL,
                      fkEmpresa INT NOT NULL,
                      PRIMARY KEY (idUsuario, fkEmpresa),
                      INDEX fk_Usuario_Empresa1_idx (fkEmpresa ASC) VISIBLE,
                      UNIQUE INDEX cargo_UNIQUE (cargo ASC) VISIBLE,
                      CONSTRAINT fk_Usuario_Empresa1
                        FOREIGN KEY (fkEmpresa)
                        REFERENCES Empresa (idEmpresa)
                        );
                    
                    
                    CREATE TABLE  Sessao (
                      idSessao INT NOT NULL,
                      dataInicio DATETIME NULL,
                      dataTermino DATETIME NULL,
                      autenticacaoDuasEtapas TINYINT NULL,
                      fkUsuario INT NOT NULL,
                      fkEndereco INT NOT NULL,
                      PRIMARY KEY (idSessao, fkUsuario),
                      INDEX fk_Sessao_Usuario1_idx (fkUsuario ASC) VISIBLE,
                      INDEX fk_Sessao_Endereço1_idx (fkEndereco ASC) VISIBLE,
                      CONSTRAINT fk_Sessao_Usuario1
                        FOREIGN KEY (fkUsuario)
                        REFERENCES Usuario (idUsuario)
                        ,
                      CONSTRAINT fk_Sessao_Endereço1
                        FOREIGN KEY (fkEndereco)
                        REFERENCES Endereço (idEndereço)
                        );
                    
                    
                    
                
                    CREATE TABLE TipoComponente (
                      idTipoComponente INT NOT NULL,
                      nomeTipo VARCHAR(45) NULL,
                      PRIMARY KEY (idTipoComponente));
                   
                    
                    
                    CREATE TABLE  Componente (
                      idComponente INT NOT NULL,
                      nomeComponente VARCHAR(45) NULL,
                      fkTipoComponente INT NOT NULL,
                      fkServidor INT NOT NULL,
                      PRIMARY KEY (fkTipoComponente, idComponente),
                      INDEX fk_Componente_TipoComponente1_idx (fkTipoComponente ASC) VISIBLE,
                      INDEX fk_Componente_Servidor1_idx (fkServidor ASC) VISIBLE,
                      CONSTRAINT fk_Componente_TipoComponente1
                        FOREIGN KEY (fkTipoComponente)
                        REFERENCES TipoComponente (idTipoComponente)
                        ,
                      CONSTRAINT fk_Componente_Servidor1
                        FOREIGN KEY (fkServidor)
                        REFERENCES Servidor (idServidor)
                        );
                    
                    CREATE TABLE  DescricaoComponente (
                      idDescricaoComponente INT NOT NULL,
                      tituloDescricao VARCHAR(45) NULL,
                      descricao VARCHAR(45) NULL,
                      fkTipoComponente_Componente INT NOT NULL,
                      fkComponente INT NOT NULL,
                      PRIMARY KEY (idDescricaoComponente, fkTipoComponente_Componente, fkComponente),
                      INDEX fk_AtributoComponente_Componente1_idx (fkTipoComponente_Componente ASC, fkComponente ASC) VISIBLE,
                      CONSTRAINT fk_AtributoComponente_Componente1
                        FOREIGN KEY (fkTipoComponente_Componente , fkComponente)
                        REFERENCES Componente (fkTipoComponente , idComponente)
                        );
                    
                    CREATE TABLE  AlertaDadoComponente (
                      idAlertaDadoComponente INT NOT NULL,
                      min DOUBLE NULL,
                      max DOUBLE NULL,
                      PRIMARY KEY (idAlertaDadoComponente));
                    
                    CREATE TABLE  RegistroComponente (
                      idRegistroComponente INT NOT NULL,
                      fkTipoComponente_Componente INT NOT NULL,
                      fkComponente INT NOT NULL,
                      fkServidor INT NOT NULL,
                      fkAlertaDadoComponente INT NOT NULL,
                      tituloDado VARCHAR(45) NULL,
                      dado DOUBLE NULL,
                      dataRegistro DATETIME NULL,
                      PRIMARY KEY (idRegistroComponente, fkTipoComponente_Componente, fkComponente, fkServidor, fkAlertaDadoComponente),
                      INDEX fk_Componente_has_Servidor_Servidor1_idx (fkServidor ASC) VISIBLE,
                      INDEX fk_Componente_has_Servidor_Componente1_idx (fkTipoComponente_Componente ASC, fkComponente ASC) VISIBLE,
                      INDEX fk_RegistroComponente_AlertaComponente1_idx (fkAlertaDadoComponente ASC) VISIBLE,
                      CONSTRAINT fk_Componente_has_Servidor_Componente1
                        FOREIGN KEY (fkTipoComponente_Componente , fkComponente)
                        REFERENCES Componente (fkTipoComponente , idComponente)
                        ,
                      CONSTRAINT fk_Componente_has_Servidor_Servidor1
                        FOREIGN KEY (fkServidor)
                        REFERENCES Servidor (idServidor)
                        ,
                      CONSTRAINT fk_RegistroComponente_AlertaComponente1
                        FOREIGN KEY (fkAlertaDadoComponente)
                        REFERENCES AlertaDadoComponente (idAlertaDadoComponente)
                        );
                    
                    
                  
                    CREATE TABLE Processo (
    idProcesso INT NOT NULL,
    nome VARCHAR(45) NULL,
    usoCPU DOUBLE NULL,
    usoRAM DOUBLE NULL,
    bytesUtilizados FLOAT NULL,
    PRIMARY KEY (idProcesso)
);

CREATE TABLE  RegistroProcesso (
fkServidor INT NOT NULL,
fkProcesso INT NOT NULL,
dataRegistro VARCHAR(45) NULL,
                      PRIMARY KEY (fkServidor, fkProcesso),
                      INDEX fk_Servidor_has_Processo_Processo1_idx (fkProcesso ASC) VISIBLE,
                      INDEX fk_Servidor_has_Processo_Servidor1_idx (fkServidor ASC) VISIBLE,	
                      CONSTRAINT fk_Servidor_has_Processo_Servidor1
                        FOREIGN KEY (fkServidor)
                        REFERENCES Servidor (idServidor)
                        ,
                      CONSTRAINT fk_Servidor_has_Processo_Processo1
                        FOREIGN KEY (fkProcesso)
                        REFERENCES Processo (idProcesso)
                        );
""";
            UsuarioService servicoUsuario = new UsuarioService(conexao);
            servicoUsuario.listarUsuarios();
            JdbcTemplate conexaoH2 =  conexao.getConexaoH2();

            conexaoH2.execute("SHOW TABLES;");
        }
    }
    private static Boolean login(){
        Scanner in = new Scanner(System.in);
        String login, senha;
        Boolean continuarTentativa = true;
        Boolean credenciaisCorretas = false;
        do{

            System.out.println("\nEntre com suas credenciais:");

            System.out.print("Login: ");
            login = in.nextLine();

            System.out.print("Senha: ");
            senha = in.nextLine();

            credenciaisCorretas =
                    (login.equals("admin")) && (senha.equals("admin123"));

            if(credenciaisCorretas){
                System.out.println("Bem vindo ao sistema desktop do Monitro!");
                continuarTentativa = false;
            }else{
                System.out.println("Credenciais inválidas");
                System.out.print("Tentar novamente? (S/N): ");
                String decisao = in.nextLine().toUpperCase();
                if(decisao.equals("N")){
                    continuarTentativa = false;
                }else if(!decisao.equals("S")){
                    System.out.println("Entrada inválida.");
                    System.out.println("Encerrando o programa...");
                    continuarTentativa = false;
                }else {
                    continuarTentativa = true;
                }
            }
        }while(continuarTentativa);
        return credenciaisCorretas;
    }

}
