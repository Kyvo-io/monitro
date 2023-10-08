package banco;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    private JdbcTemplate conexaoMySql;
    private JdbcTemplate conexaoH2;

    public Conexao(){
        // Conexão banco local
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        dataSource.setUrl("jdbc:h2:file:./monitro");
        dataSource.setUsername("sa");
        dataSource.setPassword("");

        conexaoH2 = new JdbcTemplate(dataSource);

        // Conexão Mysql
        dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/monitro");
        dataSource.setUsername("monitro");
        dataSource.setPassword("monitro_admin");

        conexaoMySql = new JdbcTemplate(dataSource);
    }


    public JdbcTemplate getConexaoMySql() {
        return conexaoMySql;
    }

    public JdbcTemplate getConexaoH2() {
        return conexaoH2;
    }
}


