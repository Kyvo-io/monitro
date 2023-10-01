package Data;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
public class Conexao {

    public static Connection conectar() {

         String jdbcUrl = "jdbc:mysql://localhost:3306";
         String usuario = "root";
         String senha = "banco123";
         String database = "monitro";
         Connection conexao = null;

         try {
             Class.forName("com.mysql.cj.jdbc.Driver");
             conexao= DriverManager.getConnection(jdbcUrl, usuario, senha);
         }catch (SQLException e){
             System.out.println(e);
         } catch (ClassNotFoundException e) {
             throw new RuntimeException(e);
         }

        return conexao;
    }
}


