import crypto from "crypto";
import { db, articlesTable, usersTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const articles = [
  {
    slug: "camara-aprova-contrato-sem-licitacao",
    title: "Câmara aprova R$ 2,4 milhões em obra sem licitação — e nenhum vereador questiona",
    lead: "Em sessão fechada, 11 vereadores aprovaram gasto milionário em empresa sem histórico em obras públicas. A população não foi consultada. O erro foi planejado.",
    body: ["Em uma sessão extraordinária realizada na noite de 15 de março de 2026, a Câmara Municipal de Ubatuba aprovou por unanimidade um contrato de R$ 2,4 milhões para a reforma de uma praça pública no centro da cidade. A empresa contratada, registrada há menos de dois anos, não possui nenhum histórico em obras de infraestrutura urbana.","A votação aconteceu sem debate público, sem audiência com moradores do entorno e sem que os 11 vereadores presentes apresentassem qualquer questionamento sobre os valores, prazos ou qualificação técnica da empresa. A ata da sessão, obtida pelo Ubatuba Reage, registra apenas votos favoráveis, sem nenhum pedido de vista ou ressalva.","A empresa vencedora, Construtora Litoral Norte Ltda., tem sede registrada em um endereço residencial em Caraguatatuba e capital social de R$ 50 mil. Seu quadro societário inclui dois sócios sem formação em engenharia ou arquitetura.","Segundo especialistas em direito administrativo ouvidos pela reportagem, a contratação sem licitação só é permitida em casos de emergência comprovada ou quando o valor está abaixo do limite legal. Para obras acima de R$ 1,5 milhão, a Lei de Licitações exige concorrência pública.","A Prefeitura de Ubatuba não respondeu aos questionamentos enviados pela reportagem até o fechamento desta edição."],
    author: "Ubatuba Reage", authorImage: "https://picsum.photos/seed/avatar-redacao/100/100", authorBio: "Equipe editorial do Ubatuba Reage. Jornalismo cívico feito pela comunidade.",
    category: "Denúncia: Má Gestão", categorySlug: "denuncia-ma-gestao", series: "O Povo Fiscaliza",
    imageUrl: "https://picsum.photos/seed/camara-ubatuba/1200/675", imageCaption: "Sessão da Câmara Municipal de Ubatuba. Crédito: Arquivo Ubatuba Reage",
    readingTime: "7 min de leitura", status: "published", publishedAt: new Date("2026-03-28"),
  },
  {
    slug: "hospital-sem-estrutura-ubatuba",
    title: "Hospital Municipal opera sem UTI, sem médicos e sem vergonha na cara",
    lead: "Pacientes aguardam transferência por dias em macas de corredor. Famílias relatam desamparo total em momentos críticos. A Prefeitura não responde.",
    body: ["O Hospital Municipal de Ubatuba, única unidade de urgência e emergência da cidade, opera há meses sem Unidade de Terapia Intensiva funcional. Dos seis leitos de UTI previstos no projeto original, nenhum está em operação.","Moradores relatam que pacientes em estado grave ficam em macas nos corredores, aguardando vagas em hospitais de Taubaté ou São José dos Campos — cidades a mais de 100 km de distância pela Serra do Mar.","Uma mãe que pediu para não ser identificada contou ao Ubatuba Reage que seu filho de 8 anos, com crise respiratória severa, esperou 14 horas por uma ambulância de transferência. 'Eu vi meu filho sufocar e ninguém podia fazer nada aqui', disse.","O Conselho Regional de Medicina (CRM) de São Paulo confirmou que recebeu denúncias sobre a falta de profissionais no hospital e que uma inspeção será realizada nas próximas semanas.","A Secretaria Municipal de Saúde foi procurada por telefone e e-mail, mas não respondeu até a publicação desta reportagem."],
    author: "Fernanda Lima", authorImage: "https://picsum.photos/seed/avatar-fernanda/100/100", authorBio: "Jornalista e moradora de Ubatuba. Cobre saúde pública e direitos sociais.",
    category: "Saúde Precária", categorySlug: "saude-precaria", series: "Saúde em Colapso",
    imageUrl: "https://picsum.photos/seed/hospital-ubatuba/1200/675", imageCaption: "Corredor do Hospital Municipal de Ubatuba. Crédito: Denúncia anônima ao Ubatuba Reage",
    readingTime: "9 min de leitura", status: "published", publishedAt: new Date("2026-03-27"),
  },
  {
    slug: "ia-tecnofascismo",
    title: "Entrevista: Como a IA abre caminho para o tecnofascismo",
    lead: "Pesquisador da Universidade de Viena defende que tecnologias não são politicamente neutras e que a comodidade oferecida por algoritmos remove o esforço crítico e torna as pessoas mais vulneráveis à manipulação.",
    body: ["O pesquisador austríaco Ulrich Brand passou os últimos anos estudando como as grandes plataformas de tecnologia moldam o comportamento político das massas. Em entrevista ao Ubatuba Reage, ele defende que a inteligência artificial — longe de ser uma ferramenta neutra — está sendo instrumentalizada para consolidar estruturas de poder que historicamente chamávamos de fascismo.","\"A IA não é política em si, mas quem a controla e para que ela é usada, isso é profundamente político\", afirma Brand.","Brand aponta que o maior perigo não está nos usos mais óbvios da tecnologia — deepfakes, desinformação, vigilância em massa —, mas na erosão silenciosa da capacidade de as pessoas reconhecerem a manipulação quando ela acontece.","\"A comodidade é o veículo\", ele explica. \"Quando o algoritmo do YouTube te dá exatamente o vídeo que você queria ver, quando o Spotify cuida da sua playlist, quando o Google Maps te poupa de pensar no caminho — você fica mais e mais dependente de sistemas externos para tomar decisões.\"","O pesquisador traça um paralelo com o período entre guerras do século XX, quando o rádio e o cinema foram centrais para a ascensão de movimentos autoritários na Europa.","Quando perguntado sobre soluções, Brand é cauteloso. \"Não sou ludita. Não estou dizendo que devemos destruir as máquinas. Mas precisamos de regulação séria, de educação midiática massiva e, sobretudo, de uma consciência coletiva de que essas ferramentas não são neutras.\""],
    author: "Laís Martins", authorImage: "https://picsum.photos/seed/avatar-lais/100/100", authorBio: "Repórter de tecnologia e direitos digitais no Ubatuba Reage.",
    category: "Tecnologia", categorySlug: "tecnologia",
    imageUrl: "https://picsum.photos/seed/ia-fascismo/1200/675", imageCaption: "Representação artística de interface de IA com símbolos históricos de autoritarismo.",
    readingTime: "8 min de leitura", status: "published", publishedAt: new Date("2026-03-26"),
  },
  {
    slug: "trump-america-latina",
    title: "Trump mira na América Latina e os ataques estão só começando",
    lead: "Estratégia de segurança nacional dos EUA revela planos de Trump: retomar domínio da região com força militar e aliados de extrema direita.",
    body: ["Um documento de 47 páginas obtido pelo Ubatuba Reage revela que a administração Trump preparou uma estratégia abrangente para reafirmar a dominância dos Estados Unidos na América Latina.","O documento, datado de fevereiro de 2026 e classificado como 'Sensível mas não classificado', foi vazado por uma fonte no Conselho de Segurança Nacional.","A estratégia identifica seis países como 'vulneráveis à influência adversarial': Brasil, México, Colômbia, Chile, Peru e Bolívia.","Segundo o documento, os EUA planejam intensificar a presença de forças especiais em pelo menos quatro países da região nos próximos 18 meses.","Fontes no governo brasileiro ouvidas pela reportagem afirmam que Brasília está ciente do documento e está em processo de consultas diplomáticas."],
    author: "Nick Turse", authorImage: "https://picsum.photos/seed/avatar-nick/100/100", authorBio: "Jornalista investigativo. Colaborador do Ubatuba Reage para assuntos internacionais.",
    category: "América Latina", categorySlug: "america-latina",
    imageUrl: "https://picsum.photos/seed/trump-latam/1200/675", imageCaption: "Mapa da América Latina com pontos indicando bases militares dos EUA.",
    readingTime: "12 min de leitura", status: "published", publishedAt: new Date("2026-03-25"),
  },
  {
    slug: "cpi-crime-organizado",
    title: "Nova CPI do crime organizado debate o que Brasil já sabe há 20 anos",
    lead: "Quatro comissões parlamentares em duas décadas já provaram que as armas do crime organizado e a corrupção policial são os principais motores da violência urbana.",
    body: ["A nova CPI do Crime Organizado, instalada na Câmara dos Deputados em março de 2026, promete investigar as conexões entre facções criminosas, milícias e setores do Estado.","Uma análise de relatórios de quatro CPIs realizadas entre 2005 e 2023 revela uma sobreposição impressionante de conclusões.","\"Já fizemos esse diagnóstico. Já sabemos o que precisa ser feito. O que falta é vontade política\", diz o criminólogo Julião Pontes.","A diferença desta CPI, segundo seus defensores, é o foco em conexões internacionais — especialmente com o PCC."],
    author: "Bruno Fonseca", authorImage: "https://picsum.photos/seed/avatar-bruno/100/100", authorBio: "Repórter investigativo. Especialista em segurança pública e políticas sociais.",
    category: "Segurança", categorySlug: "seguranca",
    imageUrl: "https://picsum.photos/seed/cpi-crime/1200/675", imageCaption: "Sessão da CPI do Crime Organizado no Congresso Nacional.",
    readingTime: "10 min de leitura", status: "published", publishedAt: new Date("2026-03-24"),
  },
  {
    slug: "iptu-aumento-abusivo-2025",
    title: "IPTU sobe até 67% em 2025 enquanto serviços públicos afundam",
    lead: "Moradores receberam carnês com reajustes sem qualquer justificativa técnica. Enquanto isso, as ruas continuam esburacadas e a coleta de lixo falha toda semana.",
    body: ["Moradores de Ubatuba relatam reajustes de IPTU que variam entre 30% e 67% para o exercício de 2025, sem qualquer aviso prévio ou justificativa técnica publicada pela Prefeitura.","O Ubatuba Reage obteve cópias de carnês de 12 imóveis em bairros diferentes, todos com reajustes acima de 40%.","Especialistas em direito tributário consultados pela reportagem afirmam que reajustes dessa magnitude exigem, por lei, uma reavaliação cadastral aprovada pela Câmara Municipal.","A Prefeitura de Ubatuba não respondeu aos questionamentos enviados pela reportagem."],
    author: "Carlos Mendes", authorImage: "https://picsum.photos/seed/avatar-carlos/100/100", authorBio: "Jornalista e economista. Cobre custo de vida e finanças públicas.",
    category: "Custo de Vida", categorySlug: "custo-de-vida", series: "O Povo Fiscaliza",
    imageUrl: "https://picsum.photos/seed/iptu-ubatuba/1200/675", imageCaption: "Carnê de IPTU com reajuste abusivo.",
    readingTime: "6 min de leitura", status: "published", publishedAt: new Date("2026-03-26"),
  },
  {
    slug: "esgoto-a-ceu-aberto-centro",
    title: "Esgoto a céu aberto no Centro: um escândalo que dura anos e ninguém resolve",
    lead: "Moradores do centro histórico convivem com mau cheiro, riscos de doenças e a indiferença da Prefeitura.",
    body: ["Há pelo menos três anos, moradores da Rua Guarani, no centro histórico de Ubatuba, convivem com esgoto a céu aberto correndo pela calçada.","O Ubatuba Reage visitou o local e constatou que a tubulação de esgoto está rompida em pelo menos três pontos.","Moradores relatam que crianças e idosos já tiveram problemas de saúde relacionados à exposição ao esgoto.","A Sabesp informou que 'está ciente da situação e que uma equipe será enviada para avaliar o problema'. A mesma resposta foi dada em agosto de 2023."],
    author: "Ana Paula Rocha", authorImage: "https://picsum.photos/seed/avatar-anapaula/100/100", authorBio: "Jornalista comunitária. Especialista em saneamento e meio ambiente.",
    category: "Saneamento", categorySlug: "saneamento",
    imageUrl: "https://picsum.photos/seed/esgoto-ubatuba/1200/675", imageCaption: "Esgoto a céu aberto no centro de Ubatuba.",
    readingTime: "5 min de leitura", status: "published", publishedAt: new Date("2026-03-25"),
  },
  {
    slug: "escola-estadual-sem-professores",
    title: "Escola fica 3 meses sem professor de matemática e Estado não age",
    lead: "Alunos de ensino médio de Ubatuba perderam um semestre letivo inteiro por falta de remodelação do quadro docente.",
    body: ["A Escola Estadual Professor Mário Covas, em Ubatuba, ficou sem professor de matemática por três meses consecutivos entre fevereiro e maio de 2026.","A Diretoria de Ensino de Caraguatatuba confirmou que sabia da vacância desde janeiro, mas que 'não conseguiu encontrar profissionais dispostos a se deslocar até Ubatuba'.","Pais de alunos relatam que tentaram resolver a situação por conta própria, organizando aulas voluntárias com um engenheiro aposentado do bairro.","O Ministério Público de São Paulo foi notificado sobre a situação e abriu um procedimento administrativo."],
    author: "João Gomes", authorImage: "https://picsum.photos/seed/avatar-joao/100/100", authorBio: "Repórter de educação e políticas públicas no Ubatuba Reage.",
    category: "Educação", categorySlug: "educacao",
    imageUrl: "https://picsum.photos/seed/escola-ubatuba/1200/675", imageCaption: "Sala de aula vazia na escola estadual de Ubatuba.",
    readingTime: "6 min de leitura", status: "published", publishedAt: new Date("2026-03-24"),
  },
  {
    slug: "obra-avenida-parada-2-anos",
    title: "Obra parada há 2 anos na Av. Iperoig: a foto que vale mais que mil processos",
    lead: "A construção foi interrompida sem explicação em 2023. Desde então, a área vira ponto de descarte irregular de lixo.",
    body: ["A obra de revitalização da Avenida Iperoig foi paralisada em outubro de 2023, apenas quatro meses após seu início.","O contrato original, no valor de R$ 3,2 milhões, previa a conclusão da obra em dezembro de 2023. O Ubatuba Reage obteve documentos que mostram que a Prefeitura pagou R$ 1,1 milhão à empreiteira antes da paralisação.","Moradores e comerciantes da avenida relatam prejuízos significativos.","A Prefeitura informou que 'a obra está em processo de reprogramação orçamentária' e que 'não há previsão para retomada no momento'."],
    author: "Luciana Torres", authorImage: "https://picsum.photos/seed/avatar-luciana/100/100", authorBio: "Fotógrafa e jornalista. Documenta o cotidiano e as lutas de Ubatuba.",
    category: "Abandono Público", categorySlug: "abandono-publico",
    imageUrl: "https://picsum.photos/seed/obra-parada/1200/675", imageCaption: "Obra abandonada na Av. Iperoig, Ubatuba.",
    readingTime: "5 min de leitura", status: "published", publishedAt: new Date("2026-03-22"),
  },
  {
    slug: "violencia-bairros-perifericos",
    title: "Bairros da periferia registram aumento de 40% na violência e PM some das ruas",
    lead: "Moradores das áreas mais afastadas relatam ausência de patrulhamento há meses.",
    body: ["Dados obtidos pelo Ubatuba Reage revelam que os bairros da periferia registraram aumento de 40% nos crimes violentos no primeiro trimestre de 2026.","O Perequê-Açu, Ipiranguinha e Estufa II são os bairros mais afetados.","Em contraste, o centro da cidade recebeu reforço policial significativo durante o Carnaval de 2026.","'É como se a gente não existisse', resume Dona Aparecida, moradora do Perequê-Açu há 30 anos."],
    author: "Marcos Vieira", authorImage: "https://picsum.photos/seed/avatar-marcos/100/100", authorBio: "Jornalista e ativista. Cobre segurança pública e periferias.",
    category: "Segurança", categorySlug: "seguranca",
    imageUrl: "https://picsum.photos/seed/violencia-uba/1200/675", imageCaption: "Rua sem iluminação em bairro periférico de Ubatuba.",
    readingTime: "7 min de leitura", status: "published", publishedAt: new Date("2026-03-20"),
  },
  {
    slug: "turismo-x-moradores-crise",
    title: "O turismo enriquece a cidade — mas quem paga a conta é o morador",
    lead: "A cidade bate recordes de visitantes enquanto moradores não conseguem pagar aluguel, faltam vagas nas UBSs e a praia mais bonita virou lixeiro.",
    body: ["Ubatuba recebeu mais de 1,2 milhão de turistas no verão de 2025/2026, batendo recorde histórico.","O preço médio do aluguel na cidade subiu 45% nos últimos três anos.","As Unidades Básicas de Saúde operam no limite da capacidade durante a alta temporada.","Na Praia do Félix, moradores documentaram acúmulo de lixo deixado por visitantes."],
    author: "Ubatuba Reage", authorImage: "https://picsum.photos/seed/avatar-redacao/100/100", authorBio: "Equipe editorial do Ubatuba Reage. Jornalismo cívico feito pela comunidade.",
    category: "Identidade Caiçara", categorySlug: "identidade-caicara",
    imageUrl: "https://picsum.photos/seed/turismo-ubatuba/1200/675", imageCaption: "Praia lotada de turistas em Ubatuba.",
    readingTime: "8 min de leitura", status: "published", publishedAt: new Date("2026-03-18"),
  },
];

async function seedAdmin() {
  const isDev = process.env.NODE_ENV !== "production";
  const adminEmail = process.env.ADMIN_EMAIL || (isDev ? "admin@ubatubareage.com.br" : undefined);
  const adminPassword = process.env.ADMIN_PASSWORD || (isDev ? "admin123" : undefined);

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required in production");
  }

  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, adminEmail));

  if (existing) {
    console.log(`Admin user already exists: ${adminEmail}`);
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await db.insert(usersTable).values({
    id: crypto.randomUUID(),
    email: adminEmail,
    passwordHash,
    firstName: "Admin",
    lastName: "Ubatuba Reage",
    role: "admin",
  });
  console.log(`Admin user created: ${adminEmail}`);
}

async function seed() {
  await seedAdmin();

  const [existing] = await db.select({ value: count() }).from(articlesTable);
  if (existing.value > 0) {
    console.log(`DB already has ${existing.value} articles, skipping article seed.`);
    process.exit(0);
  }
  
  for (const article of articles) {
    await db.insert(articlesTable).values(article);
    console.log(`Seeded: ${article.slug}`);
  }
  console.log(`Seeded ${articles.length} articles.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
