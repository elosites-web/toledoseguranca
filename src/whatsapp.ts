export const WA_NUMBER = '5511913714556'
export const ELO_WA_NUMBER = '5511995722584'

export const waLink = (message: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
export const eloSitesWaLink = (message: string) => `https://wa.me/${ELO_WA_NUMBER}?text=${encodeURIComponent(message)}`

export type ServiceKey =
  | 'Segurança para eventos'
  | 'Condomínios'
  | 'Controle de acesso'
  | 'Portaria'
  | 'Segurança patrimonial'
  | 'Ronda preventiva'
  | 'Estabelecimentos comerciais'
  | 'Festas particulares'
  | 'Shows'
  | 'Bares e restaurantes'

export const waMessages = {
  menu:
    'Olá, Toledo Segurança! 👋\n\nGostaria de falar com a equipe sobre *um serviço de segurança*. 🛡️\n\nPodem me orientar sobre a melhor solução, disponibilidade e orçamento?',
  header:
    'Olá, Toledo Segurança! 👋\n\nVim pelo site e gostaria de um *orçamento de segurança*. 🛡️\n\nPodem me orientar sobre a solução ideal, disponibilidade e valores?',
  hero:
    'Olá, Toledo Segurança! 👋\n\nGostaria de solicitar um orçamento de *segurança para evento ou controle de acesso*. 🎫\n\nPreciso de uma equipe para garantir organização, prevenção e tranquilidade.\n\nPodem me orientar sobre a melhor solução e valores? 🛡️',
  contact:
    'Olá, Toledo Segurança! 👋\n\nCheguei até o site e quero conversar sobre *segurança para a minha necessidade*. 💬\n\nPodem me apresentar a melhor solução, a disponibilidade e os próximos passos?',
  contactLine:
    'Olá, Toledo Segurança! 👋\n\nEncontrei o WhatsApp de vocês no site e gostaria de falar sobre um *serviço de segurança*. 📋\n\nPodem me orientar sobre orçamento e disponibilidade?',
  floating:
    'Olá, Toledo Segurança! 👋\n\nQuero falar com um especialista sobre *segurança para evento, condomínio ou empresa*. 👮\n\nPodem me ajudar a montar a solução ideal? 💬',
  bubble:
    'Olá! 👋\n\nVi o aviso aqui no site e gostaria de um *orçamento de segurança* sem compromisso. 🛡️\n\nPodem me orientar sobre a melhor solução? 💬',
  resume:
    'Olá, Toledo Segurança! 👋\n\nGostaria de me candidatar às oportunidades de *eventos, portaria e controle de acesso*. 👮\n\nComo funciona o cadastro e o processo seletivo? 📋',
  eloSites:
    'Olá! 👋 Tudo bem?\n\nGostaria de saber mais sobre *como criar um site profissional para minha empresa* com a *ēloSites*. 🌐\n\nPoderia me passar mais informações?',
}

export const serviceMessages: Record<ServiceKey, string> = {
  'Segurança para eventos':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança para eventos*. 🎫\n\nPreciso de equipe para controle de entrada, organização do público e prevenção de incidentes.\n\nPodem me orientar sobre a solução ideal, disponibilidade e valores? 🛡️',
  Condomínios:
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança para condomínio*. 🏢\n\nQuero entender a melhor solução em portaria, controle de acesso e rondas preventivas para o meu condomínio.\n\nPodem me orientar sobre disponibilidade e valores? 🛡️',
  'Controle de acesso':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *controle de acesso*. 🔐\n\nPreciso organizar a entrada de visitantes e colaboradores, com autorização e registro no meu espaço.\n\nPodem me ajudar com a melhor solução e valores? 🛡️',
  Portaria:
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *serviço de portaria*. 👮\n\nQuero entender o controle de entradas e saídas, o recebimento de visitantes e o apoio à rotina do local.\n\nPodem me orientar sobre disponibilidade e valores? 🛡️',
  'Segurança patrimonial':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança patrimonial*. 🛡️\n\nBusco uma atuação preventiva para proteger o patrimônio do meu espaço, com presença e foco na prevenção.\n\nPodem me orientar sobre a melhor solução e valores?',
  'Ronda preventiva':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *rondas preventivas*. 🛡️\n\nQuero entender a cobertura de rondas a pé e motorizadas para o meu local e a melhor periodicidade.\n\nPodem me orientar sobre disponibilidade e valores?',
  'Estabelecimentos comerciais':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança para meu estabelecimento comercial*. 🏢\n\nPreciso de orientação sobre controle de acesso e prevenção para lojas, empresas e comércios.\n\nPodem me ajudar com a melhor solução e valores? 🛡️',
  'Festas particulares':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança para festa particular*. 📅\n\nPreciso de apoio no controle de entrada e na prevenção de incidentes durante a comemoração.\n\nPodem me orientar sobre disponibilidade e valores? 🛡️',
  Shows:
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança para show*. 🎫\n\nPreciso de orientação sobre organização de entrada, controle de público e prevenção de incidentes.\n\nPodem me orientar sobre disponibilidade e valores? 🛡️',
  'Bares e restaurantes':
    'Olá, Toledo Segurança! 👋\n\nGostaria de um orçamento de *segurança para bar ou restaurante*. 🏢\n\nQuero entender a melhor solução em controle de acesso e prevenção para o meu ambiente.\n\nPodem me ajudar com a melhor solução e valores? 🛡️',
}

const clean = (value?: string | null) => (value ?? '').trim()

type Field = { emoji: string; label: string; value?: string | null }

const formatFields = (fields: Field[]) =>
  fields
    .filter(field => clean(field.value) !== '')
    .map(field => `${field.emoji} *${field.label}:* ${clean(field.value)}`)
    .join('\n')

export type QuoteData = {
  name?: string | null
  phone?: string | null
  email?: string | null
  city?: string | null
  service?: string | null
  message?: string | null
}

export const buildQuoteMessage = (data: QuoteData) => {
  const service = clean(data.service)
  const fields = formatFields([
    { emoji: '👤', label: 'Nome', value: data.name },
    { emoji: '📱', label: 'WhatsApp', value: data.phone },
    { emoji: '📧', label: 'E-mail', value: data.email },
    { emoji: '📍', label: 'Cidade / local', value: data.city },
    { emoji: '📋', label: 'Detalhes', value: data.message },
  ])
  const intro = service
    ? `Gostaria de solicitar um orçamento para *${service}*. 🛡️`
    : 'Gostaria de solicitar um *orçamento de segurança*. 🛡️'
  return [
    'Olá, Toledo Segurança! 👋',
    '',
    intro,
    ...(fields ? ['', fields] : []),
    '',
    'Gostaria de receber uma orientação sobre a melhor solução e um orçamento. 💬',
    '',
    'Obrigado!',
  ].join('\n')
}

export type CareerData = {
  name?: string | null
  phone?: string | null
  email?: string | null
  city?: string | null
  area?: string | null
  message?: string | null
}

export const buildCareerMessage = (data: CareerData) => {
  const area = clean(data.area)
  const fields = formatFields([
    { emoji: '👤', label: 'Nome', value: data.name },
    { emoji: '📱', label: 'WhatsApp', value: data.phone },
    { emoji: '📧', label: 'E-mail', value: data.email },
    { emoji: '📍', label: 'Cidade', value: data.city },
    { emoji: '📋', label: 'Apresentação', value: data.message },
  ])
  const intro = area
    ? `Gostaria de me candidatar às oportunidades na área de *${area}*. 👮`
    : 'Gostaria de me candidatar a oportunidades na equipe. 👮'
  return [
    'Olá, Toledo Segurança! 👋',
    '',
    intro,
    ...(fields ? ['', fields] : []),
    '',
    'Gostaria de enviar meu currículo e saber mais sobre o processo seletivo. 📋',
    '',
    'Obrigado!',
  ].join('\n')
}
