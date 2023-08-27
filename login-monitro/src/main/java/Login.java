import java.util.Scanner;

public class Login {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String titulo = "\n" +
                "███████████████████████████████████████████\n" +
                "█▄─▀█▀─▄█─▄▄─█▄─▀█▄─▄█▄─▄█─▄─▄─█▄─▄▄▀█─▄▄─█\n" +
                "██─█▄█─██─██─██─█▄▀─███─████─████─▄─▄█─██─█\n" +
                "▀▄▄▄▀▄▄▄▀▄▄▄▄▀▄▄▄▀▀▄▄▀▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▀";
        String login, senha;
      Boolean continuarTentativa = true;
      do{
          System.out.println(titulo);
          System.out.println("Bem vindo ao Monitro, entre com suas credenciais");

          System.out.print("Login: ");
          login = in.nextLine();

          System.out.print("Senha: ");
          senha = in.nextLine();

          Boolean credenciaisCorretas =
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


    }
}
