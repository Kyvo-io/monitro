package negocio.usuario;

import banco.Conexao;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;
import java.util.List;

public class UsuarioService {
    private JdbcTemplate conexao;

    public UsuarioService(Conexao conexaoBanco){
        this.conexao = conexaoBanco.getConexaoMySql();
    }

    public void listarUsuarios(){
        List<Usuario> usuarios=this.conexao.query("SELECT * FROM usuario", new BeanPropertyRowMapper<>(Usuario.class));
        System.out.println(usuarios);
    }

}
