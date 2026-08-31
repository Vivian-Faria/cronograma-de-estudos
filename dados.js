// ══════════════ DISCIPLINAS — ordem do Cronograma v6 ══════════════
const DISCIPLINAS = [
 {id:"redes1", n:"Redes de Computadores I", bloco:"TI", ord:1, pronto:true},
 {id:"redes2", n:"Redes de Computadores II", bloco:"TI", ord:2, pronto:true},
 {id:"pt1", n:"Português I — Interpretação", bloco:"Português", ord:3, pronto:true},
 {id:"seg", n:"Segurança da Informação", bloco:"TI", ord:4, pronto:true},
 {id:"cripto", n:"Criptografia", bloco:"TI", ord:5, pronto:false},
 {id:"pt2", n:"Português II — Morfossintaxe", bloco:"Português", ord:6, pronto:false},
 {id:"so", n:"Sistemas Operacionais", bloco:"TI", ord:7, pronto:false},
 {id:"forense1", n:"Forense Computacional I", bloco:"TI", ord:8, pronto:false},
 {id:"dcon", n:"Direito Constitucional", bloco:"Direito", ord:9, pronto:false},
 {id:"bd", n:"Banco de Dados e SQL", bloco:"TI", ord:10, pronto:false},
 {id:"pt3", n:"Português III — Ortografia e Crase", bloco:"Português", ord:11, pronto:false},
 {id:"prog", n:"Lógica de Programação e POO", bloco:"TI", ord:12, pronto:false},
 {id:"dadm", n:"Direito Administrativo", bloco:"Direito", ord:13, pronto:false},
 {id:"algo", n:"Algoritmos e Estruturas de Dados", bloco:"TI", ord:14, pronto:false},
 {id:"rlm1", n:"RLM I — Lógica Proposicional", bloco:"RLM", ord:15, pronto:false},
 {id:"dpen", n:"Direito Penal", bloco:"Direito", ord:16, pronto:false},
 {id:"arq", n:"Arquitetura de Computadores", bloco:"TI", ord:17, pronto:false},
 {id:"df1", n:"Realidade do DF e da RIDE I", bloco:"DF", ord:18, pronto:false},
 {id:"rlm2", n:"RLM II — Combinatória e Probabilidade", bloco:"RLM", ord:19, pronto:false},
 {id:"dpro", n:"Direito Processual Penal", bloco:"Direito", ord:20, pronto:false},
 {id:"df2", n:"Realidade do DF e da RIDE II", bloco:"DF", ord:21, pronto:false},
 {id:"nuvem", n:"Computação em Nuvem", bloco:"TI", ord:22, pronto:false},
 {id:"lodf", n:"Lei Orgânica do DF e LC 840", bloco:"DF", ord:23, pronto:false},
 {id:"gov", n:"Governança de TI", bloco:"TI", ord:24, pronto:false},
 {id:"dleg", n:"Legislação Especial", bloco:"Direito", ord:25, pronto:false},
 {id:"soc", n:"Noções de Primeiros Socorros", bloco:"Outros", ord:26, pronto:false},
 {id:"crimin", n:"Criminalística", bloco:"Arquivo", ord:90, pronto:false},
 {id:"medleg", n:"Medicina Legal", bloco:"Arquivo", ord:91, pronto:false},
 {id:"bio", n:"Biologia", bloco:"Arquivo", ord:92, pronto:false},
 {id:"fis", n:"Física", bloco:"Arquivo", ord:93, pronto:false},
];

// ══════════════ CONTEÚDO — colas dos módulos prontos ══════════════
const CONTEUDO = {
redes1:[
{t:"Bit — a peça básica",c:"Computador só entende <b>ligado</b> ou <b>desligado</b>. Cada casinha dessas é um <b>bit</b>: 0 ou 1.<br><br><b>Cada bit acrescentado DOBRA as combinações.</b> 1 bit = 2 · 2 bits = 4 · 3 bits = 8 · <b>8 bits = 256</b>.<br><br>Como a contagem começa no zero, os valores vão de <b>0 a 255</b>. É daí que vem o 255 que aparece o tempo todo."},
{t:"MAC e IP",c:"<b>MAC = quem você é.</b> Gravado de fábrica na placa de rede, nunca muda. É o CPF.<br><b>IP = onde você está.</b> Atribuído, muda conforme a rede. É o endereço.<br><br>Seu notebook tem o mesmo MAC em casa e no trabalho, mas IPs diferentes.<br><br><b>O IP escolhe a cidade. O MAC entrega na casa.</b><br><br>E atenção: <b>IP é também um protocolo</b>, não só um endereço — ele define o formato do pacote, com campos de origem, destino e saltos restantes."},
{t:"Escrita do IP",c:"IPv4 = <b>32 bits</b>, divididos em <b>4 octetos</b> de 8 bits.<br><br><code>11000000.10101000.00000000.00001111</code><br><code>&nbsp;&nbsp;&nbsp;192&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;168&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;15</code><br><br>É o mesmo endereço em duas línguas. <b>Nenhum octeto passa de 255</b> — não cabe."},
{t:"IPv6",c:"<b>128 bits</b>, em <b>hexadecimal</b> com dois-pontos: <code>2001:0db8::8a2e:0370:7334</code><br><br>Reconhecimento rápido: tem <b>letras e dois-pontos</b> → IPv6. Só números e pontos → IPv4.<br><br><b>IPv6 NÃO tem broadcast</b> — foi substituído por multicast e anycast. É a pegadinha campeã do tema.<br><br>128 = 32 × 4."},
{t:"Máscara e CIDR",c:"A máscara separa a <b>rede</b> (a rua) do <b>host</b> (o número da casa).<br><br>Onde a máscara tem <b>255</b>, é rede. Onde tem <b>0</b>, é host.<br><br><b>Notação CIDR:</b> <code>255.255.255.0</code> = <b>/24</b>. Conte os 255 e multiplique por 8.<br><br>/8 · /16 · /24. Quanto maior a barra, menor a rede."},
{t:"Cálculo de hosts",c:"Numa /24 sobram 8 bits → 256 combinações.<br><br><b>Menos 2, sempre:</b> o primeiro é o endereço da rede, o último é o broadcast.<br><br><b>256 − 2 = 254 hosts.</b><br><br>Fórmula: <b>2<sup>n</sup> − 2</b>. A banca oferece 256 para quem esquece de descontar."},
{t:"Faixas privadas",c:"<b>10.</b>0.0.0 a 10.255.255.255 — empresas grandes<br><b>172.16.</b>0.0 a <b>172.31.</b>255.255 — empresas médias<br><b>192.168.</b>0.0 a 192.168.255.255 — o roteador de casa<br><br>Atenção ao do meio: vai de <b>16 a 31</b>. A banca oferece 172.32, fora por um número.<br><br><code>127.0.0.1</code> = <b>loopback</b>, o próprio computador."},
{t:"Camadas",c:"<b>OSI = 7 camadas, teórico.</b> Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação.<br><i>Fernando Enche a Rede Também Se A Amiga Ajudar.</i><br><br><b>TCP/IP = 4 camadas, real.</b> Acesso à Rede, Internet, Transporte, Aplicação.<br><br>As três que mais caem:<br><b>Camada 2 = Enlace = MAC = switch</b><br><b>Camada 3 = Rede = IP = roteador</b><br><b>Camada 4 = Transporte = TCP e UDP</b><br><br>Unidades por camada: <b>bit</b> (1) · <b>quadro</b> (2) · <b>pacote</b> (3) · <b>segmento</b> (4)."},
{t:"TCP e UDP",c:"<b>TCP é o SEDEX.</b> Confirma antes, numera, reenvia o perdido. Lento e seguro. Orientado a conexão.<br><b>UDP é o panfleto por baixo da porta.</b> Não confirma, não reenvia. Rápido e arriscado.<br><br>Vídeo ao vivo e jogos usam UDP: reenviar áudio perdido não adianta, a conversa já seguiu.<br><br><b>Three-way handshake: SYN → SYN-ACK → ACK.</b> Bater na porta, atenderem, dizer 'então tá'."},
{t:"Equipamentos",c:"<b>Repetidor</b> (1) — só amplifica<br><b>Hub</b> (1) — grita para todas as portas<br><b>Switch</b> (2) — fala só com a porta certa, pelo MAC<br><b>Roteador</b> (3) — liga redes diferentes, pelo IP<br><br><b>Num hub qualquer máquina vê o tráfego das outras.</b> Num switch, não — é ganho de segurança, não só de desempenho.<br><br>A escada: entende nenhum endereço → 1 · entende MAC → 2 · entende IP → 3."},
{t:"Topologias e tamanho",c:"<b>Barramento</b> (varal) · <b>Estrela</b> (polvo, a mais usada) · <b>Anel</b> (roda-gigante) · <b>Malha</b> (teia, resiste a falhas)<br><br><b>PAN &lt; LAN &lt; MAN &lt; WAN.</b> Bluetooth · prédio · cidade · a internet.<br><br>Atenção: <b>a LAN conecta seus aparelhos entre si</b>, não fornece a internet. Quem liga ao mundo é o link do provedor."},
{t:"Serviços",c:"<b>DNS</b> traduz nome em IP — a agenda do celular<br><b>DHCP</b> distribui IP — a recepção do hotel<br><b>NAT</b> converte privado em público — o prédio com uma portaria<br><b>SNMP</b> monitora · <b>VPN</b> protege · <b>ARP</b> descobre o MAC a partir do IP<br><br><b>DNS traduz, DHCP distribui.</b>"},
{t:"Transmissão",c:"<b>Simplex</b> — um sentido só (rádio AM)<br><b>Half-duplex</b> — os dois sentidos, <b>revezando</b> (rádio de polícia: um fala, solta o botão)<br><b>Full-duplex</b> — os dois sentidos <b>ao mesmo tempo</b> (telefone)<br><br><b>Síncrono</b> — emissor e receptor compartilham o mesmo relógio<br><b>Assíncrono</b> — cada byte carrega marcação de início e fim"}
],
redes2:[
{t:"Protocolo e porta",c:"<b>Protocolo</b> é um combinado de regras. Todos os deste módulo ficam na <b>camada de aplicação</b> (7 no OSI, 4 no TCP/IP).<br><br><b>Porta</b> é o número que diz qual serviço recebe o dado dentro da máquina.<br><br><b>O IP leva ao prédio. A porta leva à sala. O MAC entrega na mão.</b><br><br>São 65.536 portas; as 1.024 primeiras são reservadas aos serviços conhecidos."},
{t:"HTTP e HTTPS",c:"<b>HTTP = porta 80</b>, texto aberto. Quem interceptar, lê.<br><b>HTTPS = porta 443</b>, criptografado. É o cadeado.<br><br><b>Pegadinha:</b> o cadeado garante que <b>a conexão</b> é protegida — não que o site seja honesto. Site fraudulento também tem cadeado.<br><br><b>HTTPS protege o caminho, não garante o destino.</b>"},
{t:"FTP",c:"<b>Duas portas: 20 e 21.</b><br><b>21</b> = controle (os comandos) · <b>20</b> = dados (o arquivo)<br><br>Pedir na portaria e receber pela garagem.<br><br><b>FTP não tem criptografia</b> — a senha viaja legível. Por isso hoje se prefere o SFTP.<br><br>E existe <b>FTP anônimo</b>: repositórios públicos aceitam usuário <code>anonymous</code> sem senha. Ou seja, conta e senha não são imprescindíveis.<br><br><b>Download</b> = trazer · <b>Upload</b> = mandar."},
{t:"E-mail",c:"<b>SMTP = 25 — ENVIA.</b> S de Send. É o único que envia.<br><b>POP3 = 110 — PUXA.</b> P de Puxar: baixa e apaga do servidor.<br><b>IMAP = 143 — MANTÉM.</b> M de Manter: sincroniza entre aparelhos.<br><br><b>Teste da vida real:</b> leu no celular e aparece lido no notebook? É <b>IMAP</b> — os dois olham o mesmo servidor. No POP3 o celular baixou e removeu.<br><br><b>SMTP só sobe. POP3 e IMAP só descem.</b>"},
{t:"Tabela de portas",c:"<b>20 e 21</b> FTP · <b>22</b> SSH · <b>23</b> Telnet · <b>25</b> SMTP · <b>53</b> DNS · <b>80</b> HTTP · <b>110</b> POP3 · <b>143</b> IMAP · <b>443</b> HTTPS<br><br><b>Par 22/23:</b> vizinhos e opostos — SSH protege, Telnet não. <b>O menor é o seguro.</b><br><b>Par 80/443:</b> HTTP e HTTPS. <b>O maior é o seguro.</b><br><b>E-mail em ordem:</b> 25 envia, 110 puxa, 143 mantém.<br><b>DNS é 53</b> — cinquenta e três traduz.<br><br><b>Técnica:</b> em questão de porta, leia a <b>função</b> primeiro. É mais fácil julgar que o número."},
{t:"Proxy",c:"Computador que fica <b>no meio</b> entre você e a internet. É o despachante: pede no seu lugar.<br><br>Três usos, e todos caem: <b>bloqueia</b> sites, <b>registra</b> quem acessou o quê, <b>acelera</b> guardando cópia em cache.<br><br><b>Proxy não é firewall.</b> Proxy intermedeia; firewall filtra por regra."},
{t:"Redes sem fio",c:"<b>802.11 = Wi-Fi.</b> Mesma coisa.<br><br>No cabo é preciso encostar no fio para interceptar. <b>No Wi-Fi o dado atravessa a parede</b> — por isso existe proteção própria.<br><br><b>WEP → WPA → WPA2 → WPA3</b><br>Mais fraco/obsoleto = <b>WEP</b> · Mais usado hoje = <b>WPA2</b> (usa AES) · Mais recente = <b>WPA3</b><br><br><b>EAP não é dessa família</b> — é método de autenticação, para redes de empresa com usuário e senha individuais.<br><br>Cuidado com siglas inventadas tipo 'WP3'."},
{t:"Computação em nuvem",c:"Usar computador de outra pessoa pela internet, pagando o uso.<br><br><b>IaaS</b> — a máquina crua. Servidor, armazenamento, rede. <i>Farinha, queijo e forno.</i><br><b>PaaS</b> — o ambiente pronto para publicar seu programa. <i>A massa pronta.</i><br><b>SaaS</b> — o programa pronto para usar. <i>A pizza quente na mesa.</i><br><br><b>Do mais cru para o mais pronto: I → P → S.</b><br><br>'Infraestrutura, servidores, armazenamento e redes' → <b>IaaS</b>. 'Pronto para o usuário final' → <b>SaaS</b>."}
],
pt1:[
{t:"Os três andares",c:"Toda pergunta de interpretação está em um destes:<br><br><b>1. O que ESTÁ escrito.</b><br><b>2. O que se CONCLUI</b> — o texto obriga.<br><b>3. O que você IMAGINOU</b> — <b>sempre errado</b>.<br><br>A prova vive de te empurrar do 2 para o 3.<br><br><b>O teste:</b> 'onde está isso no texto?' Aponta com o dedo → marca. Não aponta mas o texto obriga → marca. Precisa completar com o que sabe da vida → <b>não marque</b>."},
{t:"Explícito e implícito",c:"<b>Explícito</b> está na mesa. <b>Implícito</b> está na gaveta. Os dois estão na casa.<br><br><i>'O delegado voltou a pedir reforço.'</i><br>Explícito: ele pediu.<br>Implícito: <b>já tinha pedido antes</b> — a palavra 'voltou' carrega isso.<br>Andar 3: que o pedido anterior foi negado. O texto não diz."},
{t:"Pressuposto × subentendido",c:"<b>Pressuposto</b> — preso a uma palavra que você aponta. <b>Não pode ser negado.</b><br><b>Subentendido</b> — é intenção, não se prende a palavra nenhuma. <b>Pode ser negado.</b><br><br><i>'O perito ainda não entregou o laudo.'</i><br>Pressuposto: <b>esperava-se a entrega</b> (ancorado em 'ainda').<br>Subentendido: que ele é lento. Isso é cobrança.<br><br><b>Teste da negação:</b> se quem falou pode dizer 'eu só informei um fato' sem se contradizer, era subentendido.<br><br><b>Pressuposto está preso. Subentendido escorrega.</b>"},
{t:"Gatilhos de pressuposto",c:"Circule sempre que aparecerem:<br><br><b>ainda · já · voltou a · continua · deixou de · parou de · começou a · de novo · outra vez · agora</b><br><br>E os <b>adjetivos colados ao substantivo</b>. Em <i>'a corrupta gestão anterior'</i>, a corrupção não é afirmada — é <b>pressuposta</b>. Por isso é quase impossível de contestar."},
{t:"Inferir × extrapolar",c:"<b>Inferir</b> = o texto <b>obriga</b> a conclusão.<br><b>Extrapolar</b> = a conclusão é possível, mas o texto não obriga.<br><br>Chão molhado da porta à janela: inferir que entrou água, tudo bem. Extrapolar que houve tempestade, não — pode ter sido garoa.<br><br><b>Quanto mais a alternativa 'vai além', mais suspeita.</b>"},
{t:"Tema, ideia central e título",c:"<b>Tema</b> = sobre o que fala. Uma palavra.<br><b>Ideia central</b> = o que afirma sobre o tema. <b>Frase com verbo.</b><br><b>Título</b> = etiqueta, nem sempre resume.<br><br>Como achar: leia a primeira e a última frase de cada parágrafo, veja o que se repete, formule uma frase com verbo.<br><br><b>Teste:</b> a ideia central vale para <b>todos</b> os parágrafos.<br><br><b>Armadilha nº 1 da matéria: verdadeiro não é central.</b> A banca oferece alternativa literal e correta que cobre só um parágrafo."},
{t:"Referentes",c:"<b>Ele, esse, isso, o mesmo, tal</b> substituem uma palavra anterior.<br><br><i>'O perito entregou o laudo ao delegado. Ele estava incompleto.'</i> → <b>o laudo</b>, porque só documento fica incompleto nesse sentido.<br><br><b>Macete:</b> troque pela palavra que você acha e releia. Se ficar estranho, é outra.<br><br><b>Quem manda é o sentido, não a proximidade.</b>"},
{t:"Conectivos",c:"<b>Oposição</b> — mas, porém, contudo, todavia, entretanto<br><b>Causa</b> — porque, pois, já que, visto que<br><b>Conclusão</b> — portanto, logo, assim, por isso<br><b>Condição</b> — se, caso, desde que<br><b>Concessão</b> — embora, ainda que, apesar de, mesmo que<br><b>Finalidade</b> — para que, a fim de que<br><br><b>Depois do 'mas' vem o que o autor pensa.</b><br><i>'É detalhado, mas atrasou'</i> → a queixa é o atraso.<br><i>'Atrasou, mas é detalhado'</i> → o elogio é a qualidade.<br><br><b>Conectivo trocado = sentido trocado.</b>"},
{t:"Fato × opinião",c:"<b>Fato</b> pode ser conferido: números, datas, nomes.<br><b>Opinião</b> traz adjetivo ou advérbio de valor: excelente, lamentável, absurdamente, admirável.<br><br><i>'340 laudos em março'</i> — fato.<br><i>'excelente desempenho'</i> — opinião.<br><br><b>Adjetivo de valor é a impressão digital da opinião.</b>"},
{t:"Leitura do comando",c:"Vale para objetiva e discursiva.<br><br><b>Antes de responder, copie as alíneas a, b, c na margem e risque cada uma ao abordar.</b><br><br>O erro mais caro na discursiva não é escrever mal — é <b>desenvolver bem uma parte e ignorar outra</b>. Cada item não abordado é o ponto dele perdido."}
],
seg:[
{t:"Os pilares",c:"<b>Confidencialidade</b> — quem pode <b>ver</b><br><b>Integridade</b> — não foi <b>alterado</b><br><b>Disponibilidade</b> — está <b>no ar</b><br><br>Prontuário no hospital: vizinho lê → confidencialidade. Trocam a dosagem → integridade. Sistema fora do ar → disponibilidade.<br><br><b>Autenticidade</b> — é ele mesmo (protege quem recebe)<br><b>Não repúdio</b> — não pode negar que fez (impede a negação de quem envia)"},
{t:"Ameaça, vulnerabilidade e risco",c:"<b>Ameaça</b> = o ladrão. Existe, você não controla.<br><b>Vulnerabilidade</b> = a janela sem tranca. É sua.<br><b>Risco</b> = a chance de um encontrar o outro.<br><b>Incidente</b> = aconteceu.<br><br><b>Você elimina a vulnerabilidade, não a ameaça.</b> Toda alternativa que disser 'eliminar ameaças' está suspeita."},
{t:"Criptografia — o essencial",c:"Embaralhar segundo uma regra; só quem tem a <b>chave</b> desembaralha.<br><br><b>1.</b> É ferramenta <b>neutra</b>: protege quando você usa, ataca quando usam contra você.<br><b>2.</b> <b>Sem a chave não há como desfazer</b> — é matemática, não uma trava que se arromba.<br><b>3.</b> Por isso <b>nenhum antivírus descriptografa</b> arquivo sequestrado. Quem tem a chave é o atacante."},
{t:"Malwares",c:"<b>Vírus pega carona</b> — precisa de hospedeiro e de alguém executar<br><b>Worm anda sozinho</b> — autorreplicante, se espalha pela rede<br><b>Trojan se fantasia</b> — parece útil, o usuário instala<br><br><b>Ransomware</b> criptografa e cobra resgate. <b>A defesa é backup, não antivírus.</b><br><br><b>Rootkit</b> esconde · <b>Keylogger</b> grava tecla · <b>Spyware</b> espiona · <b>Backdoor</b> deixa porta aberta · <b>Adware</b> enche de anúncio · <b>Botnet</b> são as máquinas zumbis"},
{t:"Ataques",c:"<b>Engenharia social</b> engana a <b>pessoa</b>, não a máquina. Nenhum antivírus protege.<br><br><b>Phishing</b> — em massa, imita empresa conhecida<br><b>Spear phishing</b> — direcionado, com dados reais da vítima<br><b>Pharming</b> — adultera o DNS: site falso mesmo digitando o endereço certo<br><b>Man-in-the-middle</b> — alguém no meio da conversa<br><b>Força bruta</b> — testa senhas uma a uma"},
{t:"DoS e DDoS",c:"<b>DoS</b> — negação de serviço de <b>uma</b> origem.<br><b>DDoS</b> — <b>distribuído</b>, de milhares de máquinas, normalmente uma <b>botnet</b>.<br><br>Um caminhão bloqueando a rua × dez mil carros.<br><br><b>Pilar atingido: disponibilidade.</b> Nada foi lido nem alterado.<br><br><b>SYN flood:</b> abusa do handshake. Manda milhares de SYN e <b>nunca responde o ACK</b>. O servidor fica com conversas pela metade até travar. <i>Bater na porta de mil casas e sair correndo.</i><br><br><b>Botnet não é o ataque</b> — é a <b>infraestrutura</b> de máquinas comprometidas que transforma um ataque de origem única em distribuído, dificultando a identificação."},
{t:"Firewall, IDS, IPS e proxy",c:"<b>FIREWALL filtra por regra.</b> 'Esta porta está fechada.' Porteiro com lista. Camadas 3 e 4.<br><b>IDS detecta e AVISA.</b> Câmera com alarme. Chega à camada 7.<br><b>IPS detecta e BLOQUEIA.</b> Câmera com cadeado automático.<br><b>PROXY intermedeia.</b> Despachante.<br><br><b>D</b>etectar, <b>P</b>revenir — a letra do meio entrega.<br><br><b>Ache o verbo do enunciado:</b> 'com base em regras' → firewall · 'gera alertas' → IDS · 'bloqueia automaticamente' → IPS · 'armazena em cache' → proxy<br><br><b>Por que um só não basta:</b> o firewall libera a porta 443 porque a regra manda, e o ataque viaja dentro desse tráfego legítimo. Só quem analisa comportamento percebe."},
{t:"Backup",c:"<b>Completo</b> — copia tudo. Lento de copiar, rápido de restaurar.<br><b>Incremental</b> — desde o <b>último backup qualquer</b>. <i>Corrente de elos:</i> precisa de todos; se um quebra, perdeu.<br><b>Diferencial</b> — desde o <b>último completo</b>. <i>Foto que cresce:</i> a última basta.<br><br><b>Barato de copiar é caro de restaurar.</b>"},
{t:"Autenticação",c:"<b>O que você SABE</b> (senha) · <b>o que você TEM</b> (celular, token) · <b>o que você É</b> (digital, rosto)<br><br><b>Multifator exige categorias diferentes.</b> Duas senhas não valem — é o mesmo fator.<br><br><b>Menor privilégio:</b> só o acesso necessário. Não por desconfiança, mas para <b>limitar o estrago</b> se a conta cair."}
]
};

// ══════════════ QUESTÕES ══════════════
// m=módulo · d=facil|media|dificil · e=enunciado · a=alternativas · g=gabarito · j=justificativa
const QUESTOES = [
// ─── REDES I ───
{m:"redes1",d:"facil",e:"Um endereço IPv4 é composto por:",a:["16 bits, em dois octetos.","32 bits, em quatro octetos, cada um de 0 a 255.","64 bits em hexadecimal.","128 bits em oito grupos.","48 bits gravados de fábrica na placa de rede."],g:1,j:"32 é IPv4, 128 é IPv6, 48 é MAC. A última descreve o MAC."},
{m:"redes1",d:"facil",e:"O endereço 127.0.0.1 é denominado:",a:["broadcast","gateway padrão","loopback","endereço de rede","multicast"],g:2,j:"Loopback: a máquina falando consigo mesma. Também chamado localhost."},
{m:"redes1",d:"facil",e:"A topologia em que todos os dispositivos se conectam a um ponto central é a:",a:["barramento","anel","malha","estrela","híbrida"],g:3,j:"Estrela — é a mais usada na prática, com um switch no centro."},
{m:"redes1",d:"facil",e:"Do menor para o maior alcance, a ordem correta é:",a:["LAN, PAN, MAN, WAN","PAN, LAN, MAN, WAN","PAN, MAN, LAN, WAN","WAN, MAN, LAN, PAN","LAN, MAN, PAN, WAN"],g:1,j:"Pessoal (Bluetooth) → Local (prédio) → Metropolitana (cidade) → Wide (a internet)."},
{m:"redes1",d:"media",e:"Uma rede utiliza a máscara 255.255.255.0. O número máximo de hosts endereçáveis é:",a:["256","255","254","253","128"],g:2,j:"/24 deixa 8 bits → 256 combinações, menos 2 (endereço de rede e broadcast) = 254. O 256 é a armadilha."},
{m:"redes1",d:"media",e:"Sobre o IPv6, é correto afirmar que:",a:["Usa 64 bits em notação decimal.","Mantém o broadcast, como o IPv4.","Usa 128 bits em hexadecimal, tendo substituído o broadcast por multicast e anycast.","Reduz o espaço de endereçamento.","Dispensa máscara de rede."],g:2,j:"IPv6 NÃO tem broadcast. É a pegadinha campeã do tema."},
{m:"redes1",d:"media",e:"O equipamento que replica cada dado recebido para todas as suas portas é o:",a:["switch","hub","roteador","gateway","firewall"],g:1,j:"Replicar para todas as portas é assinatura do hub. O switch manda só para a porta certa."},
{m:"redes1",d:"media",e:"Assinale a alternativa INCORRETA:",a:["127.0.0.1 é o loopback.","Na topologia estrela todos se conectam a um ponto central.","O NAT permite que endereços privados acessem a internet por um endereço público.","O endereço MAC é atribuído dinamicamente pelo DHCP a cada conexão.","O DNS converte nomes de domínio em endereços IP."],g:3,j:"O MAC é físico e de fábrica. Quem o DHCP distribui é o IP."},
{m:"redes1",d:"media",e:"Assinale a faixa reservada para redes privadas:",a:["8.8.8.8","172.32.0.1","192.168.10.25","200.150.1.1","127.0.0.1"],g:2,j:"A faixa vai de 172.16 a 172.31 — o 172.32 está fora por um número. O 127.0.0.1 é loopback, não faixa privada."},
{m:"redes1",d:"dificil",e:"Sobre a pilha TCP/IP e o modelo OSI, é correto afirmar que:",a:["Ambos possuem sete camadas.","O TCP/IP fundiu as três camadas superiores do OSI em uma (Aplicação) e as duas inferiores em uma (Acesso à Rede).","O modelo OSI é o efetivamente implementado na internet.","O TCP/IP não possui camada de transporte.","As camadas de sessão e apresentação existem em ambos."],g:1,j:"OSI 7 (teórico) × TCP/IP 4 (real). 7 − 4 = 3 fusões."},
{m:"redes1",d:"dificil",e:"Os bits são empacotados em quadros (frames) na camada de:",a:["física","enlace","rede","transporte","aplicação"],g:1,j:"Unidades por camada: bit (1), quadro (2), pacote (3), segmento (4). Quadro é enlace."},
{m:"redes1",d:"dificil",e:"Sobre os modos de transmissão, é correto afirmar que o half-duplex:",a:["permite transmissão nos dois sentidos simultaneamente.","permite transmissão em um único sentido, sempre.","permite transmissão nos dois sentidos, mas não ao mesmo tempo.","dispensa sincronização entre emissor e receptor.","é sinônimo de transmissão simplex."],g:2,j:"Half-duplex é revezando (rádio de polícia). Full-duplex é simultâneo (telefone). Simplex é sentido único."},
{m:"redes1",d:"dificil",e:"Na comunicação entre dispositivos, o protocolo IP:",a:["apenas identifica fisicamente a placa de rede.","especifica o formato dos pacotes que trafegam entre roteadores e sistemas finais.","opera na camada de enlace do modelo OSI.","garante a entrega ordenada e confiável dos dados.","é sinônimo de endereço MAC."],g:1,j:"IP é endereço E protocolo: define o formato do pacote. Entrega confiável e ordenada é o TCP."},
// ─── REDES II ───
{m:"redes2",d:"facil",e:"O protocolo responsável pelo ENVIO de mensagens de correio eletrônico é o:",a:["POP3","IMAP","SMTP","HTTP","FTP"],g:2,j:"SMTP tem o S de Send. POP3 e IMAP só recebem."},
{m:"redes2",d:"facil",e:"O protocolo HTTPS opera, por padrão, na porta:",a:["21","80","110","443","8080"],g:3,j:"HTTP é 80, HTTPS é 443. No par, o maior é o seguro."},
{m:"redes2",d:"facil",e:"A ação de enviar um arquivo do computador local para um servidor denomina-se:",a:["download","upload","streaming","cache","backup"],g:1,j:"Up é para cima; a referência é você."},
{m:"redes2",d:"media",e:"Um usuário lê uma mensagem no celular e ela aparece como lida também no computador, permanecendo no servidor. O protocolo é o:",a:["SMTP","POP3","IMAP","HTTP","SNMP"],g:2,j:"IMAP MANTÉM no servidor e sincroniza. No POP3 o celular baixaria e removeria."},
{m:"redes2",d:"media",e:"São funções de um servidor proxy em rede corporativa:",a:["atribuir IPs automaticamente","atuar como intermediário, filtrar acessos e armazenar em cache","traduzir nomes de domínio em IPs","encaminhar quadros por endereço MAC","criptografar o tráfego da rede sem fio"],g:1,j:"As outras descrevem DHCP, DNS, switch e WPA2."},
{m:"redes2",d:"media",e:"O protocolo de segurança de redes sem fio considerado obsoleto e vulnerável é o:",a:["WPA2","WPA3","WEP","EAP","AES"],g:2,j:"A escada: WEP → WPA → WPA2 → WPA3. EAP é autenticação; AES é a cifra usada dentro do WPA2."},
{m:"redes2",d:"media",e:"O modelo de nuvem em que o cliente recebe um aplicativo pronto para uso, sem responsabilidade sobre servidores ou sistema operacional, é o:",a:["IaaS","PaaS","SaaS","On-premise","Colocation"],g:2,j:"A pizza chegou pronta. Se fosse desenvolver, seria PaaS."},
{m:"redes2",d:"dificil",e:"Sobre SSH e Telnet, é correto afirmar que:",a:["ambos utilizam criptografia, sendo equivalentes.","o Telnet opera na porta 22 e o SSH na 23.","o SSH opera na porta 22 com criptografia, e o Telnet na 23 em texto claro.","o Telnet é recomendado por sua segurança.","nenhum admite autenticação por usuário e senha."],g:2,j:"O menor número é o seguro. O Telnet transmite senha legível — por isso caiu em desuso."},
{m:"redes2",d:"dificil",e:"Sobre os protocolos de aplicação e suas portas, assinale a INCORRETA:",a:["O DNS utiliza a porta 53.","O HTTP usa 80 e o HTTPS usa 443.","O IMAP usa 143 e mantém as mensagens no servidor.","O SMTP usa a porta 110 e é responsável pelo recebimento.","O FTP usa as portas 20 e 21, para dados e controle."],g:3,j:"Dois erros na mesma alternativa: SMTP é 25 e ENVIA. A 110 é do POP3. Leia a função antes do número."},
{m:"redes2",d:"dificil",e:"Sobre o protocolo FTP, é correto afirmar que:",a:["utiliza uma única porta para comandos e dados.","exige obrigatoriamente conta e senha no servidor de destino.","utiliza portas distintas para controle e dados e admite acesso anônimo em servidores públicos.","criptografa a senha durante a autenticação.","opera na camada de transporte."],g:2,j:"Portas 21 (controle) e 20 (dados). Existe FTP anônimo, e não há criptografia."},
// ─── PORTUGUÊS I ───
{m:"pt1",d:"facil",e:"Assinale a alternativa que apresenta FATO, e não opinião:",a:["A nova sede ficou espetacular.","O atendimento é lamentável.","A perícia recebeu 1.240 solicitações no semestre.","O prazo é absurdamente longo.","A equipe demonstrou esforço admirável."],g:2,j:"Só a terceira se confere. As demais trazem adjetivo ou advérbio de valor."},
{m:"pt1",d:"facil",e:"\"Caso o material seja coletado sem lacre, a análise perde validade.\" A relação é de:",a:["concessão","condição","finalidade","oposição","conclusão"],g:1,j:"'Caso' equivale a 'se'. A consequência só ocorre SE a hipótese acontecer."},
{m:"pt1",d:"facil",e:"\"O equipamento é caro, mas indispensável.\" O autor:",a:["desaconselha a aquisição","considera o preço o mais relevante","defende a aquisição, apesar do custo","afirma que é dispensável","não se posiciona"],g:2,j:"Depois do 'mas' vem o que o autor defende."},
{m:"pt1",d:"media",e:"\"O perito ainda não se manifestou sobre o caso.\" É correto pressupor que:",a:["o perito se recusa a falar","esperava-se que o perito se manifestasse","o perito não tem informações","o perito foi afastado","o caso foi encerrado"],g:1,j:"'Ainda' é gatilho: obriga a expectativa. As demais são andar 3."},
{m:"pt1",d:"media",e:"\"Instalado em 2021, o sistema ampliou a cobertura para 210 câmeras. Os furtos caíram 14%. Comerciantes, contudo, relatam que a insegurança permanece.\" A ideia central é:",a:["O sistema cobre 210 câmeras.","Os furtos caíram 14%.","Os comerciantes resistem a inovações.","A queda dos registros não alterou a percepção de insegurança.","O sistema foi ineficaz."],g:3,j:"Verdadeiro não é central: só a quarta abrange todas as frases."},
{m:"pt1",d:"media",e:"\"O relatório foi enviado ao delegado pelo escrivão. Ele continha erros.\" O pronome retoma:",a:["o escrivão","o relatório","o delegado","o envio","os erros"],g:1,j:"Quem contém erros é o documento. Manda o sentido, não a proximidade."},
{m:"pt1",d:"dificil",e:"Sobre pressuposto e subentendido, assinale a INCORRETA:",a:["O pressuposto ancora-se em marca linguística do enunciado.","O subentendido depende do contexto e da intenção.","O emissor pode negar o subentendido sem contradição.","O pressuposto pode ser negado pelo emissor sem contradição.","Ambos são informações implícitas."],g:3,j:"O pressuposto NÃO pode ser negado — está preso a uma palavra. Quem escorrega é o subentendido."},
{m:"pt1",d:"dificil",e:"\"A acertada decisão do diretor reduziu o quadro de servidores.\" Sobre o trecho:",a:["O texto afirma explicitamente que a decisão foi acertada.","O acerto é apresentado como pressuposto, não como afirmação a discutir.","O trecho é integralmente factual.","O autor critica a decisão.","Não há informação implícita."],g:1,j:"Adjetivo colado ao substantivo entra como pressuposto — e por isso é quase impossível de contestar."},
{m:"pt1",d:"dificil",e:"\"Embora o laudo tenha sido concluído no prazo, a investigação permaneceu parada.\" O conectivo exprime:",a:["causa","conclusão","concessão","condição","finalidade"],g:2,j:"Concessão admite um fato favorável e afirma o contrário. Se fosse causa, o laudo pronto teria provocado a parada."},
// ─── SEGURANÇA ───
{m:"seg",d:"facil",e:"O princípio que assegura que a informação não foi alterada de forma não autorizada é a:",a:["confidencialidade","disponibilidade","integridade","autenticidade","irretratabilidade"],g:2,j:"Confidencialidade é sobre VER; integridade é sobre MUDAR."},
{m:"seg",d:"facil",e:"O malware que criptografa os arquivos da vítima e exige pagamento é o:",a:["spyware","keylogger","adware","ransomware","worm"],g:3,j:"Criptografia + resgate = ransomware. A defesa é backup, não antivírus."},
{m:"seg",d:"facil",e:"Servidores desatualizados com falha conhecida constituem, na gestão de segurança:",a:["uma ameaça","uma vulnerabilidade","um incidente","um risco residual","um controle"],g:1,j:"A falha é a janela sem tranca. A ameaça seria quem a explora; o incidente, a invasão consumada."},
{m:"seg",d:"media",e:"O malware que se propaga automaticamente pela rede, sem hospedeiro e sem ação do usuário, é o:",a:["vírus","worm","cavalo de troia","adware","rootkit"],g:1,j:"Vírus pega carona, worm anda sozinho, trojan se fantasia."},
{m:"seg",d:"media",e:"Um sistema analisa o tráfego, reconhece padrão de invasão e gera alertas, sem interromper a conexão. Trata-se de:",a:["firewall","IPS","IDS","proxy","antivírus"],g:2,j:"'Gera alertas sem interromper' = IDS. Se bloqueasse, seria IPS. O firewall trabalha por regra prévia, não por padrão de comportamento."},
{m:"seg",d:"media",e:"O backup que copia todos os arquivos alterados desde o último backup COMPLETO é o:",a:["incremental","diferencial","espelhado","completo","sintético"],g:1,j:"'Desde o último completo' = diferencial (foto que cresce). Desde o último backup qualquer = incremental (corrente de elos)."},
{m:"seg",d:"media",e:"Sobre autenticação multifator, é correto afirmar que:",a:["exige duas senhas distintas.","combina fatores de categorias diferentes, como algo que o usuário sabe e algo que possui.","substitui a necessidade de senha.","é sinônimo de criptografia ponta a ponta.","aplica-se apenas a bancos."],g:1,j:"Duas senhas são o mesmo fator. Multifator exige categorias diferentes."},
{m:"seg",d:"dificil",e:"A indisponibilidade causada por envio massivo de requisições a partir de milhares de máquinas comprometidas caracteriza:",a:["man-in-the-middle","injeção de SQL","ataque DDoS","spear phishing","engenharia social"],g:2,j:"Indisponibilidade + massivo + máquinas comprometidas (botnet) = DDoS. Identifique o pilar atingido e metade das alternativas morre."},
{m:"seg",d:"dificil",e:"Sobre os mecanismos de proteção de rede, assinale a INCORRETA:",a:["O firewall controla o tráfego com base em regras previamente definidas.","O IPS bloqueia automaticamente o tráfego identificado como malicioso.","O IDS monitora e emite alertas, sem necessariamente interromper o tráfego.","O proxy atua como intermediário e pode armazenar conteúdo em cache.","O antivírus substitui a política de backup, por reverter a criptografia do ransomware."],g:4,j:"Duas falsidades: antivírus não substitui backup e não reverte a criptografia. Se revertesse, o ataque não existiria."},
{m:"seg",d:"dificil",e:"O SYN flood caracteriza-se por:",a:["interceptar e alterar mensagens entre duas partes.","enviar requisições de conexão sem completar o handshake, esgotando os recursos do servidor.","injetar comandos no banco de dados por campos de entrada.","cifrar arquivos e exigir resgate.","capturar as teclas digitadas pelo usuário."],g:1,j:"Abusa do three-way handshake: manda SYN e nunca responde o ACK. É bater na porta de mil casas e sair correndo."},
{m:"seg",d:"dificil",e:"Sobre o papel das botnets em ataques distribuídos, é correto afirmar que:",a:["a botnet é o próprio ataque de negação de serviço.","a botnet é a infraestrutura de dispositivos comprometidos que fornece múltiplas fontes de tráfego, dificultando a identificação da origem.","botnets atuam exclusivamente na disseminação de phishing.","uma botnet exige que os dispositivos estejam na mesma rede local.","botnets comprometem a integridade, e não a disponibilidade."],g:1,j:"Botnet não é o ataque — é o meio que transforma um ataque de origem única em distribuído."},
];

// ══════════════ DISCURSIVAS — só matérias de TI ══════════════
const DISCURSIVAS = [
{m:"redes1",t:"Discorra sobre o endereçamento em redes, abordando obrigatoriamente: <b>a)</b> a distinção entre endereço MAC e endereço IP, indicando qual é atribuído de fábrica; <b>b)</b> o que significa dizer que o IP é, ao mesmo tempo, endereço e protocolo; <b>c)</b> a função da máscara de rede e por que dois endereços de cada faixa não podem ser atribuídos a hosts."},
{m:"redes1",t:"Discorra sobre camadas e equipamentos, abordando obrigatoriamente: <b>a)</b> a diferença entre os modelos OSI e TCP/IP; <b>b)</b> em que camada operam hub, switch e roteador, justificando pelo tipo de endereço; <b>c)</b> por que substituir hubs por switches traz ganho de segurança, e não apenas de desempenho."},
{m:"redes2",t:"Discorra sobre os protocolos de correio eletrônico, abordando obrigatoriamente: <b>a)</b> a função do SMTP e sua porta padrão; <b>b)</b> a diferença prática entre POP3 e IMAP para quem usa vários dispositivos; <b>c)</b> por que o IMAP se tornou predominante."},
{m:"redes2",t:"Discorra sobre segurança em redes sem fio, abordando obrigatoriamente: <b>a)</b> por que o meio sem fio exige proteção adicional em relação ao cabeado; <b>b)</b> a evolução WEP, WPA, WPA2 e WPA3; <b>c)</b> por que o EAP não substitui esses protocolos."},
{m:"seg",t:"Discorra sobre a gestão de riscos em segurança da informação, abordando obrigatoriamente: <b>a)</b> a diferença entre ameaça, vulnerabilidade e risco; <b>b)</b> sobre qual desses elementos as ações de segurança incidem diretamente e por quê; <b>c)</b> um exemplo prático de tratamento de vulnerabilidade."},
{m:"seg",t:"Discorra sobre os mecanismos de proteção de rede, abordando obrigatoriamente: <b>a)</b> a diferença funcional entre firewall, IDS e IPS; <b>b)</b> em que camada atua cada um e com base em que critério decide; <b>c)</b> por que a adoção isolada de apenas um deles é insuficiente."},
{m:"seg",t:"Discorra sobre o ransomware, abordando obrigatoriamente: <b>a)</b> seu funcionamento; <b>b)</b> por que o antivírus não reverte o ataque consumado; <b>c)</b> por que a política de backup é a medida mais eficaz de resposta."},
{m:"seg",t:"Discorra sobre o ataque de negação de serviço distribuído, abordando obrigatoriamente: <b>a)</b> qual pilar da segurança é atingido; <b>b)</b> como o SYN flood se aproveita do estabelecimento de conexão TCP; <b>c)</b> o papel das botnets."},
];


// ══════════════ HISTÓRICO — rodadas já realizadas ══════════════
// f=fonte · d=nível · t=total · r=acertos reais · c=chutes certos
const RODADAS_INICIAIS = [
// ── Simulado FGV 2025 (PC-MG Área II) — linha de base
{data:"2026-08-23", mat:"pt1",    dif:"media", total:10, reais:5, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"rlm1",   dif:"media", total:10, reais:1, chutes:4, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"dcon",   dif:"media", total:5,  reais:0, chutes:1, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"dpen",   dif:"media", total:5,  reais:2, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"lodf",   dif:"media", total:5,  reais:2, chutes:0, f:"Simulado FGV 2025 (Lei Orgânica PCMG)"},
{data:"2026-08-23", mat:"crimin", dif:"media", total:5,  reais:4, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"medleg", dif:"media", total:5,  reais:2, chutes:1, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"bio",    dif:"media", total:5,  reais:1, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"fis",    dif:"media", total:4,  reais:0, chutes:1, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"so",     dif:"media", total:4,  reais:1, chutes:1, f:"Simulado FGV 2025 (Linux, RAID, arquivos)"},
{data:"2026-08-23", mat:"redes1", dif:"media", total:1,  reais:1, chutes:0, f:"Simulado FGV 2025 (switch camada 2)"},
{data:"2026-08-23", mat:"redes2", dif:"media", total:1,  reais:0, chutes:0, f:"Simulado FGV 2025 (WPA2)"},
{data:"2026-08-23", mat:"dleg",   dif:"media", total:1,  reais:1, chutes:0, f:"Simulado FGV 2025 (Marco Civil)"},
{data:"2026-08-23", mat:"arq",    dif:"media", total:3,  reais:1, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"nuvem",  dif:"media", total:2,  reais:2, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"prog",   dif:"media", total:3,  reais:0, chutes:1, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"algo",   dif:"media", total:2,  reais:1, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"gov",    dif:"media", total:3,  reais:2, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"bd",     dif:"media", total:1,  reais:0, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"seg",    dif:"media", total:2,  reais:1, chutes:0, f:"Simulado FGV 2025"},
{data:"2026-08-23", mat:"cripto", dif:"media", total:1,  reais:0, chutes:0, f:"Simulado FGV 2025"},
// ── Questões externas de redes (plataforma de questões)
{data:"2026-08-29", mat:"redes1", dif:"media", total:17, reais:9, chutes:4, f:"Externas — plataforma"},
{data:"2026-08-29", mat:"redes2", dif:"media", total:9,  reais:6, chutes:0, f:"Externas — plataforma"},
// ── Partes B dos módulos
{data:"2026-08-29", mat:"redes1", dif:"media", total:5, reais:4, chutes:0, f:"Módulo 01 — Parte B"},
{data:"2026-08-29", mat:"redes2", dif:"media", total:4, reais:3, chutes:0, f:"Módulo 02 — Parte B"},
{data:"2026-08-30", mat:"pt1",    dif:"media", total:5, reais:5, chutes:0, f:"Módulo 03 — Parte B"},
// ── Simulado PC-DF completo
{data:"2026-08-29", mat:"pt1",     dif:"media", total:8,  reais:5, chutes:0, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"rlm1",    dif:"media", total:6,  reais:1, chutes:1, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"df1",     dif:"media", total:4,  reais:1, chutes:2, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"lodf",    dif:"media", total:3,  reais:0, chutes:2, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"dadm",    dif:"media", total:4,  reais:0, chutes:4, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"dcon",    dif:"media", total:4,  reais:1, chutes:2, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"dpen",    dif:"media", total:4,  reais:1, chutes:1, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"dpro",    dif:"media", total:4,  reais:3, chutes:1, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"dleg",    dif:"media", total:3,  reais:0, chutes:3, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"forense1",dif:"media", total:10, reais:0, chutes:9, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"arq",     dif:"media", total:8,  reais:1, chutes:3, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"redes1",  dif:"media", total:5,  reais:4, chutes:1, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"cripto",  dif:"media", total:4,  reais:0, chutes:1, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"bd",      dif:"media", total:4,  reais:1, chutes:0, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"prog",    dif:"media", total:3,  reais:0, chutes:0, f:"Simulado PC-DF (desenv. seguro)"},
{data:"2026-08-29", mat:"so",      dif:"media", total:4,  reais:0, chutes:1, f:"Simulado PC-DF"},
{data:"2026-08-29", mat:"nuvem",   dif:"media", total:2,  reais:0, chutes:0, f:"Simulado PC-DF"},
];

// ══════════════ DISCURSIVAS JÁ CORRIGIDAS ══════════════
const DISC_INICIAIS = [
{data:"2026-08-29", mat:"seg", tema:"Ameaça × vulnerabilidade × risco", nota:17.5, tent:1},
{data:"2026-08-29", mat:"seg", tema:"Firewall × IDS × IPS", nota:16.5, tent:1},
{data:"2026-08-29", mat:"seg", tema:"Firewall × IDS × IPS (refação)", nota:22.5, tent:4},
{data:"2026-08-29", mat:"seg", tema:"Ransomware e backup", nota:19.5, tent:1},
{data:"2026-08-29", mat:"seg", tema:"Ransomware e backup (refação)", nota:22.0, tent:2},
{data:"2026-08-29", mat:"seg", tema:"Engenharia social", nota:20.0, tent:1},
{data:"2026-08-29", mat:"seg", tema:"Engenharia social (refação)", nota:21.75, tent:2},
{data:"2026-08-30", mat:"seg", tema:"DDoS, SYN flood e botnets", nota:20.6, tent:1},
];

// ══════════════ DIAS DE ESTUDO JÁ REGISTRADOS ══════════════
const DIAS_INICIAIS = ["2026-07-21","2026-07-31","2026-08-19","2026-08-20","2026-08-23","2026-08-29","2026-08-30"];
const DATA_INICIO = "2026-07-21";
