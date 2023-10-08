package negocio.empresa;

public class Empresa {
    private Integer idEmpresa;
    private String nomeEmpresa;
    private String CNPJ;
    private String email;
    private String tipoOrgao;

    public Empresa(Integer idEmpresa, String nomeEmpresa, String CNPJ, String email, String tipoOrgao) {
        this.idEmpresa = idEmpresa;
        this.nomeEmpresa = nomeEmpresa;
        this.CNPJ = CNPJ;
        this.email = email;
        this.tipoOrgao = tipoOrgao;
    }

    public Empresa(){}
}
