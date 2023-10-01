import Data.Conexao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class Login {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        String titulo = "                                                   .::.                                   \n" +
                "                                                   .::.   .:.                             \n" +
                "                                                          :::                             \n" +
                " .:::::::.:::::::.     .:::::::.     .::::::::.    .::.   :::::::.   :::::::   .:::::::.  \n" +
                ":::.   .:::    :::    :::     :::   .:::    .::.   .::.   :::       :::       :::.    :::.\n" +
                ":::     ::.    .::   :::.     .::.  .:::     :::   .::.   :::       :::      .::.      :::\n" +
                ":::     ::.    .::   .::.     .::.  .:::     :::   .::.   :::       :::      .:::      :::\n" +
                ":::     ::.    .::    :::.   .:::   .:::     :::   .::.   :::.      :::       :::.    ::: \n" +
                ".::     ::.    .::     .:::::::.     :::     :::   .::.    .:::::   .::        ..::::::.  \n";
        String login, senha;
      Boolean continuarTentativa = true;
      Boolean credenciaisCorretas = false;
        System.out.println(titulo);
        System.out.println("Bem vindo ao Monitro! 😊");
      do{

          System.out.println("\nEntre com suas credenciais:");

          System.out.print("👤 - Login: ");
          login = in.nextLine();

          System.out.print("🔐 - Senha: ");
          senha = in.nextLine();

          credenciaisCorretas =
                  (login.equals("admin")) && (senha.equals("admin123"));

          if(credenciaisCorretas){
              System.out.println("Bem vindo ao sistema desktop do Monitro! 🧑‍💻👩‍💻");
              continuarTentativa = false;
          }else{
              System.out.println("Credenciais inválidas ❌");
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
      if(!credenciaisCorretas){
          System.out.println("Até a próxima.");
      }else{
          Boolean continuarMonitoramento = true;
          System.out.println("Monitoramento iniciado...");

          try{
              Connection conexao = Conexao.conectar();
              Statement stmt = conexao.createStatement();
              ResultSet resultset = null;

              if (stmt.execute("SHOW DATABASES;")) {
                  resultset = stmt.getResultSet();
              }

              while (resultset.next()) {
                  System.out.println(resultset.getString("Database"));
              }

          }catch (SQLException e){
              System.out.println(e);
          }

      }
    }


}
