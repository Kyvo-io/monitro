package negocio.usuario;

import negocio.empresa.Empresa;

public class Usuario {
    private Integer idUsuario;
    private String email;
    private String cargo;
    private String senha;
    private Empresa empresa;
    public Usuario(Integer idUsuario, String email, String cargo, String senha, Empresa empresa) {
        this.idUsuario = idUsuario;
        this.email = email;
        this.cargo = cargo;
        this.senha = senha;
        this.empresa = empresa;
    }
    public Usuario(){}

    @Override
    public String toString() {
        return "Usuario{" +
                "idUsuario=" + idUsuario +
                ", email='" + email + '\'' +
                ", cargo='" + cargo + '\'' +
                ", senha='" + senha + '\'' +
                ", empresa=" + empresa +
                '}';
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
}
