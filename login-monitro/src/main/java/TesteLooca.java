import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.util.Conversor;
import oshi.SystemInfo;

public class TesteLooca {
    public static void main(String[] args) {
        Looca pc = new Looca();

        System.out.println(pc.getGrupoDeProcessos().getProcessos());
        // Toda chamada get após o pc vai ser relacionada com a classe ou tipo
        // pc.getGrupoDeProcessos()
        // Para conseguir acessar a funcionalidade dessas classes, como pode observar, é realizado outra chamada
        // pc.getGrupoDeProcessos().getProcessos()

        /*
            De forma resumida o que essa instrução faz é:
            pc - objeto da classe looca
            Na classe looca temos vários atributos com tipos de componentes e funcionalidades que podemos monitorar
            Quando falo tipo, falo da tipagem com base na classe, como por exemplo:
         */
        Memoria memoria;
        /*
            a variavel memoria é do tipo Memoria, quando clicamos em memoria conseguimos ver as funções que essa classe
            permite que a variavel execute, mas dai a pergunta, por que não utilizar assim diretamente?
         */

        /*
         Podemos sim utilizar diretamente!
         Exemplo:
         */
        memoria = new Memoria();
        System.out.println(memoria.getEmUso());

        // Conseguimos usar tanto pela instância do objeto pc, nele já é instanciado automaticamente todas as outras classes

        /*
        Dessa forma é apenas um objeto que consegue fazer tudo, desse outro jeito precisamos criar um objeto pra cada
        componente ou serviço a ser monitorado
        */

        // System.out.println(memoria.getEmUso()); == System.out.println(pc.getMemoria().getEmUso());


        // System.out.println(memoria.getEmUso())
            // De um lado nós temos algo mais auto explicativo, sem tantos métodos get intermediários


        //System.out.println(pc.getMemoria().getEmUso());
            // Por outro temos uma instância unica que consegue obter todos os dados da api


        System.exit(0);

    }
}

