import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import {
  AlertCircle, AlertTriangle, ArrowRight, Building2, CheckCircle2, ChevronDown, ChevronUp, Clock3, ConciergeBell, Instagram,
  KeyRound, Landmark, Mail, MapPin, Martini, Menu, MessageCircle, Music,
  PartyPopper, Route, ShieldCheck, Sparkles, Store, X,
  type LucideIcon,
} from 'lucide-react'
import { WhatsAppIcon } from './components/WhatsAppIcon'
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal'
import {
  buildCareerMessage, buildQuoteMessage, eloSitesWaLink, serviceMessages, waLink, waMessages,
  type CareerData, type ServiceKey,
} from './whatsapp'
import secEventos from './assets/images/sec_eventos_1790230004814.jpg'
import secCondominio from './assets/images/sec_condominio_1790230015634.jpg'
import secAcesso from './assets/images/sec_acesso_1790230026359.jpg'
import secPortaria from './assets/images/sec_portaria_1790230036901.jpg'
import secPatrimonial from './assets/images/sec_patrimonial_1790230046674.jpg'
import secRondaMoto from './assets/images/sec_ronda_moto_1790230056469.jpg'
import secComercio from './assets/images/sec_comercio_1790230067710.jpg'
import secFestas from './assets/images/sec_festas_1790230098556.jpg'
import secShows from './assets/images/sec_shows_1790230077459.jpg'
import secBares from './assets/images/sec_bares_1790230088233.jpg'
import './styles.css'

const formatPhone = (val: string): string => {
  const digits = val.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

const isPhoneValid = (val: string): boolean => {
  const digits = val.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

const isEmailValid = (val: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim())
}

// Ordered to directly align with the 3D ceramic tile presentation in the reference visual
const clients = [
  { name: 'Jundiaí Shopping', logo: 'jundiaishopping-logo.png' },
  { name: 'JC Kids', logo: 'jckids-logo.png' },
  { name: 'Shopping Iguatemi Campinas', logo: 'shopping-iguatemi-campinas-logo.png' },
  { name: 'Jund-Trafo', logo: 'jund-trafo-logo.png' },
  { name: 'Azul Linhas Aéreas Brasileiras', logo: 'azul-linhas-aereas-logo.png' },
  { name: 'Clube Uirapuru', logo: 'clube-uirapuru-logo.png' },
]

const clientLogoSize: Record<string, { width: number; height: number }> = {
  'jundiaishopping-logo.png': { width: 837, height: 200 },
  'jckids-logo.png': { width: 240, height: 200 },
  'shopping-iguatemi-campinas-logo.png': { width: 792, height: 200 },
  'jund-trafo-logo.png': { width: 465, height: 200 },
  'azul-linhas-aereas-logo.png': { width: 692, height: 200 },
  'clube-uirapuru-logo.png': { width: 348, height: 200 },
}

// Lazy loading component for client logos with graceful fade-in
function LazyClientTile({
  name,
  logo,
  width,
  height,
  style,
}: {
  name: string
  logo: string
  width: number
  height: number
  style: React.CSSProperties
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="client-tile-3d reveal" style={style}>
      <img
        ref={imgRef}
        src={`/assets/clients/${logo}`}
        alt={name}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? 'img-loaded' : 'img-loading'}
      />
    </div>
  )
}

type Service = {
  icon: LucideIcon
  title: ServiceKey
  text: string
  image: string
  tag: string
}

const services: Service[] = [
  {
    icon: ShieldCheck,
    title: 'Segurança para eventos',
    text: 'Organização de entradas e saídas, controle de público e prevenção de incidentes em convenções e celebrações.',
    image: secEventos,
    tag: 'Eventos & Festivais',
  },
  {
    icon: Building2,
    title: 'Condomínios',
    text: 'Portaria, controle de acesso, acompanhamento de áreas comuns e rondas preventivas para condomínios residenciais.',
    image: secCondominio,
    tag: 'Condomínios Residenciais',
  },
  {
    icon: KeyRound,
    title: 'Controle de acesso',
    text: 'Acesso de visitantes e colaboradores, autorização biométrica e crachás, registro e monitoramento de fluxo.',
    image: secAcesso,
    tag: 'Controle & Fluxo',
  },
  {
    icon: ConciergeBell,
    title: 'Portaria',
    text: 'Controle de entradas e saídas, visitantes, entregas, apoio básico e organização contínua da rotina operacional.',
    image: secPortaria,
    tag: 'Portaria & Recepção',
  },
  {
    icon: Landmark,
    title: 'Segurança patrimonial',
    text: 'Atuação preventiva voltada à proteção do patrimônio empresarial, com postura profissional e supervisão próxima.',
    image: secPatrimonial,
    tag: 'Proteção Patrimonial',
  },
  {
    icon: Route,
    title: 'Rondas preventivas',
    text: 'Presença preventiva constante, com rondas táticas a pé e motorizadas em motocicletas equipadas.',
    image: secRondaMoto,
    tag: 'Ronda Motorizada',
  },
  {
    icon: Store,
    title: 'Estabelecimentos comerciais',
    text: 'Segurança e controle de acesso para lojas, empresas, galerias e centros comerciais de médio e grande porte.',
    image: secComercio,
    tag: 'Comércio & Empresas',
  },
  {
    icon: PartyPopper,
    title: 'Festas particulares',
    text: 'Controle de entrada de convidados, segurança discreta e prevenção de incidentes para festas e aniversários.',
    image: secFestas,
    tag: 'Festas & Celebrações',
  },
  {
    icon: Music,
    title: 'Shows',
    text: 'Organização de entradas, contenção de público, proteção de palco e prevenção ágil em shows e grandes palcos.',
    image: secShows,
    tag: 'Shows & Espetáculos',
  },
  {
    icon: Martini,
    title: 'Bares e restaurantes',
    text: 'Controle de acesso na porta, segurança preventiva discreta, mediação e tranquilidade no ambiente gastronômico.',
    image: secBares,
    tag: 'Bares & Restaurantes',
  },
]

const differentials = [
  ['01', 'Equipe treinada', 'Profissionais preparados para atuar com responsabilidade e postura profissional.'],
  ['02', 'Pontualidade e disciplina', 'Compromisso com horários, procedimentos e organização da operação.'],
  ['03', 'Supervisão próxima', 'Acompanhamento constante para manter o padrão de atendimento e execução.'],
]

const processSteps = [
  ['01', 'Conversa inicial', 'Entendemos o local, o evento ou a necessidade do cliente.'],
  ['02', 'Planejamento', 'Definimos a estrutura adequada para a operação.'],
  ['03', 'Execução', 'Profissionais atuam com disciplina, presença e foco na prevenção.'],
  ['04', 'Acompanhamento', 'Supervisão próxima durante todo o serviço.'],
]

const faqs = [
  ['Quais serviços a Toledo oferece?', 'Atuamos com segurança para eventos, condomínios, portaria, controle de acesso e rondas preventivas, entre outras soluções compatíveis com cada operação.'],
  ['Onde a Toledo atende?', 'A Toledo atua em Jundiaí e região, avaliando a necessidade de cada cliente e de cada operação.'],
  ['A Toledo atende eventos?', 'Sim. Atuamos em eventos, festas, shows e outros formatos, com foco em controle de entrada, organização do público e prevenção de incidentes.'],
  ['A Toledo possui segurança armada?', 'Não. A Toledo não realiza segurança armada. O trabalho é voltado a portaria, controle de acesso, eventos em geral e atuação preventiva.'],
  ['Como solicitar um orçamento?', 'Entre em contato pelo WhatsApp ou e-mail. A equipe entende a necessidade e orienta os próximos passos.'],
  ['A Toledo contrata profissionais?', 'Sim. Mantemos um canal permanente de cadastro para profissionais que desejam atuar em eventos, portaria e demais operações.'],
]

const interestAreas = [
  'Segurança para eventos', 'Portaria', 'Controle de acesso', 'Rondas preventivas',
  'Condomínios', 'Estabelecimentos comerciais', 'Outros',
]

const navItems = [
  ['sobre', 'A Toledo'],
  ['servicos', 'Serviços'],
  ['atuacao', 'Atuação'],
  ['clientes', 'Clientes'],
  ['trabalhe', 'Trabalhe conosco'],
  ['faq', 'Perguntas frequentes'],
  ['contato', 'Contato'],
] as const

const navSectionIds = navItems.map(([id]) => id)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [careerSent, setCareerSent] = useState(false)
  const [quoteSent, setQuoteSent] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)

  // Desktop Parallax effect on background hero images for depth perception
  useEffect(() => {
    const isDesktop = () =>
      window.innerWidth >= 1024 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const heroEl = heroRef.current
    if (!heroEl) return

    let currentMouseX = 0
    let currentMouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0
    let isMouseOverHero = false
    let animFrameId: number | null = null

    const updateParallax = () => {
      if (!isDesktop() || !heroEl) {
        heroEl.style.removeProperty('--hero-skull-y')
        heroEl.style.removeProperty('--hero-skull-x')
        heroEl.style.removeProperty('--hero-skull-my')
        heroEl.style.removeProperty('--hero-tilt-x')
        heroEl.style.removeProperty('--hero-tilt-y')
        heroEl.style.removeProperty('--hero-photo-y')
        heroEl.style.removeProperty('--hero-photo-x')
        heroEl.style.removeProperty('--hero-grid-y')
        heroEl.style.removeProperty('--hero-grid-x')
        heroEl.style.removeProperty('--hero-glow-x')
        heroEl.style.removeProperty('--hero-glow-y')
        return
      }

      const scrollY = window.scrollY
      const heroHeight = heroEl.offsetHeight || window.innerHeight

      if (scrollY <= heroHeight * 1.3) {
        const photoScrollY = scrollY * 0.10
        const gridScrollY = scrollY * 0.06
        const skullScrollY = scrollY * 0.28
        const glowScrollY = scrollY * 0.18

        currentMouseX += (targetMouseX - currentMouseX) * 0.08
        currentMouseY += (targetMouseY - currentMouseY) * 0.08

        heroEl.style.setProperty('--hero-skull-y', `${skullScrollY.toFixed(1)}px`)
        heroEl.style.setProperty('--hero-skull-x', `${(currentMouseX * 18).toFixed(1)}px`)
        heroEl.style.setProperty('--hero-skull-my', `${(currentMouseY * 14).toFixed(1)}px`)
        heroEl.style.setProperty('--hero-tilt-x', `${(currentMouseY * -3.5).toFixed(2)}deg`)
        heroEl.style.setProperty('--hero-tilt-y', `${(currentMouseX * 4.5).toFixed(2)}deg`)

        heroEl.style.setProperty('--hero-photo-y', `${photoScrollY.toFixed(1)}px`)
        heroEl.style.setProperty('--hero-photo-x', `${(currentMouseX * -7).toFixed(1)}px`)

        heroEl.style.setProperty('--hero-grid-y', `${gridScrollY.toFixed(1)}px`)
        heroEl.style.setProperty('--hero-grid-x', `${(currentMouseX * -4).toFixed(1)}px`)

        heroEl.style.setProperty('--hero-glow-x', `${(currentMouseX * 14).toFixed(1)}px`)
        heroEl.style.setProperty('--hero-glow-y', `${(glowScrollY + currentMouseY * 10).toFixed(1)}px`)
      }

      const isSettled =
        Math.abs(targetMouseX - currentMouseX) < 0.001 &&
        Math.abs(targetMouseY - currentMouseY) < 0.001

      if (isMouseOverHero || !isSettled) {
        animFrameId = requestAnimationFrame(updateParallax)
      } else {
        animFrameId = null
      }
    }

    const startLoop = () => {
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(updateParallax)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop()) return
      const rect = heroEl.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isMouseOverHero = true
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        targetMouseX = Math.max(-1, Math.min(1, x))
        targetMouseY = Math.max(-1, Math.min(1, y))
        startLoop()
      } else if (isMouseOverHero) {
        isMouseOverHero = false
        targetMouseX = 0
        targetMouseY = 0
        startLoop()
      }
    }

    const handleMouseLeave = () => {
      isMouseOverHero = false
      targetMouseX = 0
      targetMouseY = 0
      startLoop()
    }

    const handleScroll = () => {
      if (!isDesktop()) return
      startLoop()
    }

    const handleResize = () => {
      if (!isDesktop()) {
        targetMouseX = 0
        targetMouseY = 0
        currentMouseX = 0
        currentMouseY = 0
        updateParallax()
      } else {
        startLoop()
      }
    }

    startLoop()

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    heroEl.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      heroEl.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Real-time Form State & Validation: Career
  const [careerValues, setCareerValues] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    area: '',
    message: '',
    consent: false,
  })
  const [careerTouched, setCareerTouched] = useState<Record<string, boolean>>({})
  const [careerSubmitAttempted, setCareerSubmitAttempted] = useState(false)

  // Real-time Form State & Validation: Quote
  const [quoteValues, setQuoteValues] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    message: '',
    consent: false,
  })
  const [quoteTouched, setQuoteTouched] = useState<Record<string, boolean>>({})
  const [quoteSubmitAttempted, setQuoteSubmitAttempted] = useState(false)

  const careerErrors = {
    name: !careerValues.name.trim()
      ? 'Informe seu nome completo.'
      : careerValues.name.trim().length < 3
      ? 'Nome deve ter no mínimo 3 caracteres.'
      : '',
    phone: !careerValues.phone.replace(/\D/g, '')
      ? 'Informe seu WhatsApp com DDD.'
      : !isPhoneValid(careerValues.phone)
      ? 'WhatsApp incompleto (digite 10 ou 11 dígitos com DDD).'
      : '',
    email: !careerValues.email.trim()
      ? 'Informe seu endereço de e-mail.'
      : !isEmailValid(careerValues.email)
      ? 'Endereço de e-mail inválido (ex: seu@email.com).'
      : '',
    city: !careerValues.city.trim()
      ? 'Informe sua cidade de residência.'
      : careerValues.city.trim().length < 2
      ? 'Cidade deve ter no mínimo 2 letras.'
      : '',
    area: !careerValues.area
      ? 'Selecione uma área de atuação de interesse.'
      : '',
    consent: !careerValues.consent
      ? 'É necessário aceitar os termos da Política de Privacidade para recrutamento.'
      : '',
  }

  const quoteErrors = {
    name: !quoteValues.name.trim()
      ? 'Informe seu nome ou empresa.'
      : quoteValues.name.trim().length < 3
      ? 'Nome deve ter no mínimo 3 caracteres.'
      : '',
    phone: !quoteValues.phone.replace(/\D/g, '')
      ? 'Informe seu WhatsApp com DDD.'
      : !isPhoneValid(quoteValues.phone)
      ? 'WhatsApp incompleto (digite 10 ou 11 dígitos com DDD).'
      : '',
    email: quoteValues.email.trim() && !isEmailValid(quoteValues.email)
      ? 'Endereço de e-mail inválido (ou deixe em branco).'
      : '',
    consent: !quoteValues.consent
      ? 'É necessário autorizar o uso dos dados para solicitar uma proposta.'
      : '',
  }

  const isCareerHasErrors = Object.values(careerErrors).some(err => !!err)
  const isQuoteHasErrors = Object.values(quoteErrors).some(err => !!err)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#privacidade') {
        setPrivacyOpen(true)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen])

  const getHeaderHeight = useCallback((): number => {
    const headerEl = document.querySelector<HTMLElement>('.header')
    if (headerEl) {
      const rect = headerEl.getBoundingClientRect()
      if (rect.height > 0) return rect.height
      if (headerEl.offsetHeight > 0) return headerEl.offsetHeight
    }
    const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    const parsed = parseFloat(cssVar)
    if (!isNaN(parsed) && parsed > 0) return parsed
    return window.innerWidth <= 720 ? 72 : 84
  }, [])

  useEffect(() => {
    let ticking = false
    const updateActive = () => {
      ticking = false
      const headerH = getHeaderHeight()

      const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      if (reachedBottom && navSectionIds.length > 0) {
        const lastId = navSectionIds[navSectionIds.length - 1]
        setActiveSection(prev => (prev === lastId ? prev : lastId))
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(maxScroll > 0 ? 100 : 0)
        return
      }

      let current = ''
      for (let i = 0; i < navSectionIds.length; i++) {
        const id = navSectionIds[i]
        const element = document.getElementById(id)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        if (rect.top <= headerH + 3) {
          current = id
        }
      }

      setActiveSection(prev => (prev === current ? prev : current))
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0
      setScrollProgress(progress)
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateActive)
      }
    }

    updateActive()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [getHeaderHeight])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .section-fade'))
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('in'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const revealDelay = (i: number, step = 80) => ({ transitionDelay: `${(i % 3) * step}ms` })

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    closeMenu()

    if (id === 'inicio') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      window.history.pushState(null, '', '#inicio')
      setActiveSection('')
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    setActiveSection(id)

    const headerH = getHeaderHeight()
    const targetRect = target.getBoundingClientRect()
    const elementAbsoluteTop = targetRect.top + window.scrollY
    const targetScrollY = Math.max(0, Math.round(elementAbsoluteTop - headerH + 1))

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: targetScrollY,
      behavior: reduce ? 'auto' : 'smooth',
    })

    window.history.pushState(null, '', `#${id}`)
  }

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && hash !== 'privacidade' && (navSectionIds as readonly string[]).includes(hash)) {
      const timer = setTimeout(() => {
        const target = document.getElementById(hash)
        if (!target) return
        const headerH = getHeaderHeight()
        const elementAbsoluteTop = target.getBoundingClientRect().top + window.scrollY
        const targetScrollY = Math.max(0, Math.round(elementAbsoluteTop - headerH + 1))
        window.scrollTo({ top: targetScrollY, behavior: 'auto' })
        setActiveSection(hash)
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [getHeaderHeight])

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  const clearBubbleTimer = useCallback(() => {
    if (bubbleTimer.current !== null) {
      clearTimeout(bubbleTimer.current)
      bubbleTimer.current = null
    }
  }, [])

  const scheduleBubble = useCallback((delay: number) => {
    clearBubbleTimer()
    bubbleTimer.current = setTimeout(() => {
      bubbleTimer.current = null
      setBubbleOpen(true)
    }, delay)
  }, [clearBubbleTimer])

  useEffect(() => {
    scheduleBubble(60000)
    return clearBubbleTimer
  }, [scheduleBubble, clearBubbleTimer])

  const closeBubble = useCallback(() => {
    setBubbleOpen(false)
    scheduleBubble(80000)
  }, [scheduleBubble])

  useEffect(() => {
    if (!bubbleOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeBubble()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [bubbleOpen, closeBubble])

  const handleCareer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isCareerHasErrors) {
      setCareerSubmitAttempted(true)
      setCareerTouched({
        name: true,
        phone: true,
        email: true,
        city: true,
        area: true,
        consent: true,
      })
      const firstInvalidKey = (['name', 'phone', 'email', 'city', 'area', 'consent'] as const).find(
        key => !!careerErrors[key]
      )
      if (firstInvalidKey) {
        document.getElementById(`career-${firstInvalidKey}`)?.focus()
      }
      return
    }

    const career: CareerData = {
      name: careerValues.name.trim(),
      phone: careerValues.phone.trim(),
      email: careerValues.email.trim(),
      city: careerValues.city.trim(),
      area: careerValues.area,
      message: careerValues.message.trim(),
    }
    window.open(waLink(buildCareerMessage(career)), '_blank', 'noopener,noreferrer')
    setCareerSent(true)
  }

  const handleQuote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isQuoteHasErrors) {
      setQuoteSubmitAttempted(true)
      setQuoteTouched({
        name: true,
        phone: true,
        email: true,
        consent: true,
      })
      const firstInvalidKey = (['name', 'phone', 'email', 'consent'] as const).find(
        key => !!quoteErrors[key]
      )
      if (firstInvalidKey) {
        if (firstInvalidKey === 'consent') {
          document.getElementById('quote-consent')?.focus()
        } else {
          document.getElementById(`quote-${firstInvalidKey}`)?.focus()
        }
      }
      return
    }

    const message = buildQuoteMessage({
      name: quoteValues.name.trim(),
      phone: quoteValues.phone.trim(),
      email: quoteValues.email.trim(),
      service: quoteValues.service,
      city: quoteValues.city.trim(),
      message: quoteValues.message.trim(),
    })
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
    setQuoteSent(true)
  }

  return (
    <div className="site">
      <div
        className={scrollProgress > 0.5 ? 'scroll-progress active' : 'scroll-progress'}
        role="progressbar"
        aria-label="Progresso de navegação na página"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: `${scrollProgress}%` }}
      />
      <header className={menuOpen ? 'header menu-open' : 'header'}>
        <a className="brand" href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} aria-label="Toledo Segurança — início">
          <img src="/assets/brand/toledo-logo.png" alt="Toledo Segurança" width="1377" height="950" fetchPriority="high" decoding="async" />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav id="primary-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">
          {navItems.map(([id, label]) => {
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={isActive ? 'active' : undefined}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => scrollToSection(e, id)}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <a className="header-cta" href={waLink(waMessages.header)} target="_blank" rel="noreferrer">
          <span>Fale conosco</span>
          <WhatsAppIcon size={18} aria-hidden="true" />
        </a>
      </header>

      {menuOpen && <button className="menu-backdrop" type="button" aria-label="Fechar menu" onClick={closeMenu} />}

      <main>
        <section
          id="inicio"
          ref={heroRef}
          className="hero section-dark section-fade in"
          aria-label="Apresentação"
        >
          <div className="hero-bg-photo" aria-hidden="true">
            <img src={secPatrimonial} alt="" decoding="async" />
            <div className="hero-bg-overlay" />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-ambient-glow" aria-hidden="true" />
          <div className="hero-skull-wrapper" aria-hidden="true">
            <div className="hero-skull"><img src="/assets/brand/toledo-skull.png" alt="" /></div>
          </div>
          <div className="hero-content reveal">
            <p className="eyebrow"><span /> Jundiaí e região</p>
            <h1>Segurança que<br /><em>protege</em> o que importa.</h1>
            <p className="hero-lead">Segurança profissional para eventos e controle de acesso, com profissionais treinados, disciplina e presença constante em Jundiaí e região.</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href={waLink(waMessages.hero)} target="_blank" rel="noreferrer">
                Solicitar orçamento <WhatsAppIcon size={18} aria-hidden="true" /> <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#servicos" onClick={(e) => scrollToSection(e, 'servicos')}>
                Conheça os serviços <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-proof">
            <div className="hero-proof-item">
              <strong>Desde 2019</strong>
              <span>experiência no setor</span>
            </div>
            <div className="hero-proof-item">
              <strong>Jundiaí e Região</strong>
              <span>atendimento regional</span>
            </div>
            <div className="hero-proof-item">
              <strong>Disciplina</strong>
              <span>supervisão próxima</span>
            </div>
          </div>
        </section>

        <section id="sobre" className="about section-light section-fade" aria-labelledby="sobre-title">
          <div className="section-wrap split">
            <div className="section-heading reveal">
              <p className="eyebrow dark"><span /> Quem somos</p>
              <h2 id="sobre-title">Presença, prevenção<br /><strong>e confiança.</strong></h2>
              <p className="about-positioning">Segurança que protege o que importa. Atendimento especializado em segurança para eventos e controle de acesso, com profissionais treinados e presença constante.</p>
            </div>
            <div className="about-copy reveal">
              <p className="lead">A Toledo Eventos iniciou suas atividades em 2019 atuando com segurança para eventos e portaria.</p>
              <p>Com o tempo, ampliou sua atuação para condomínios, empresas e estabelecimentos comerciais, mantendo foco em segurança, controle de acesso e apoio operacional.</p>
              <div className="mission">
                <ShieldCheck size={24} aria-hidden="true" />
                <div>
                  <strong>Nossa missão</strong>
                  <p>Oferecer serviços de segurança e controle de acesso com profissionalismo, disciplina e foco na prevenção, contribuindo para ambientes mais seguros e organizados.</p>
                </div>
              </div>
              <div className="values">
                <span>Ética</span><span>Responsabilidade</span><span>Respeito</span>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="services section-dark section-fade" aria-labelledby="servicos-title">
          <div className="section-wrap">
            <div className="section-heading centered reveal">
              <p className="eyebrow"><span /> Serviços</p>
              <h2 id="servicos-title">Segurança pensada para<br /><em>cada operação.</em></h2>
              <p>Serviços estruturados de acordo com a necessidade do ambiente, do evento ou da rotina do cliente.</p>
            </div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text, image, tag }, i) => (
                <article className="service-card reveal" key={title} style={revealDelay(i)}>
                  <div className="service-media" aria-hidden="true">
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="service-media-img"
                    />
                    <div className="service-media-overlay" />
                    <span className="service-tag">{tag}</span>
                  </div>
                  <div className="service-body">
                    <div className="service-body-top">
                      <div className="service-icon-3d"><Icon size={24} strokeWidth={1.8} aria-hidden="true" /></div>
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a
                      className="card-cta"
                      href={waLink(serviceMessages[title])}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Solicitar orçamento de ${title} pelo WhatsApp`}
                    >
                      Solicitar orçamento <WhatsAppIcon size={15} aria-hidden="true" /> <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="atuacao" className="coverage section-light section-fade" aria-labelledby="atuacao-title">
          <div className="section-wrap coverage-inner">
            <div className="coverage-mark" aria-hidden="true"><img src="/assets/brand/toledo-skull.png" alt="" /></div>
            <div className="reveal">
              <p className="eyebrow dark"><span /> Área de atuação</p>
              <h2 id="atuacao-title">Jundiaí<br /><strong>e região.</strong></h2>
              <p>Atendimento regional para condomínios, eventos, empresas e estabelecimentos comerciais, com operações dimensionadas para cada necessidade.</p>
            </div>
            <div className="coverage-list reveal">
              <div className="coverage-list-item"><MapPin size={20} aria-hidden="true" /> Jundiaí e região</div>
              <div className="coverage-list-item"><ShieldCheck size={20} aria-hidden="true" /> Operações sob medida</div>
              <div className="coverage-list-item"><Clock3 size={20} aria-hidden="true" /> Atendimento comercial</div>
            </div>
          </div>
        </section>

        <section className="differentials section-dark section-fade" aria-labelledby="diferenciais-title">
          <div className="section-wrap">
            <div className="section-heading reveal">
              <p className="eyebrow"><span /> Diferenciais</p>
              <h2 id="diferenciais-title">Profissionalismo<br /><em>na prática.</em></h2>
            </div>
            <div className="diff-grid">
              {differentials.map(([n, title, text], i) => (
                <div className="diff-item reveal" key={n} style={revealDelay(i)}>
                  <b>{n}</b><h3>{title}</h3><p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clientes em estilo 3D Premium Cerâmico com Lazy Loading otimizado */}
        <section id="clientes" className="clients section-dark section-fade" aria-labelledby="clientes-title">
          <div className="section-wrap">
            <div className="section-heading centered reveal">
              <p className="eyebrow"><span /> Empresas atendidas</p>
              <h2 id="clientes-title">Marcas que já<br /><strong>contaram com a Toledo.</strong></h2>
              <p>Empresas e organizações atendidas com excelência, apresentadas com autorização.</p>
            </div>
            <div className="client-grid">
              {clients.map(({ name, logo }, i) => {
                const size = clientLogoSize[logo]
                return (
                  <LazyClientTile
                    key={name}
                    name={name}
                    logo={logo}
                    width={size.width}
                    height={size.height}
                    style={revealDelay(i)}
                  />
                )
              })}
            </div>
          </div>
        </section>

        <section className="process section-dark section-fade" aria-labelledby="processo-title">
          <div className="section-wrap">
            <div className="section-heading centered reveal">
              <p className="eyebrow"><span /> Como funciona</p>
              <h2 id="processo-title">Do primeiro contato<br /><em>à operação.</em></h2>
            </div>
            <div className="process-grid">
              {processSteps.map(([n, title, text], i) => (
                <div className="process-item reveal" key={n} style={revealDelay(i)}>
                  <span className="process-badge">{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trabalhe" className="career section-light section-fade" aria-labelledby="trabalhe-title">
          <div className="section-wrap career-inner">
            <div className="section-heading reveal">
              <p className="eyebrow dark"><span /> Trabalhe conosco</p>
              <h2 id="trabalhe-title">Quer fazer parte<br /><strong>da Toledo?</strong></h2>
              <p>Estamos em busca de profissionais comprometidos, responsáveis e preparados para atuar em eventos e demais operações.</p>
              <div className="career-note"><Sparkles size={19} aria-hidden="true" /> Cadastro para futuras oportunidades e escalas.</div>
            </div>
            <form className="career-form reveal" onSubmit={handleCareer} noValidate>
              <div className="form-row">
                <div className={`field-group ${(careerTouched.name || careerSubmitAttempted) && careerErrors.name ? 'field-invalid' : (careerTouched.name || careerSubmitAttempted) && !careerErrors.name ? 'field-valid' : ''}`}>
                  <label htmlFor="career-name" className="field-label">
                    <span>Nome completo <span className="field-req" aria-hidden="true">*</span></span>
                  </label>
                  <div className="field-control">
                    <input
                      id="career-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      value={careerValues.name}
                      onChange={(e) => {
                        const val = e.target.value
                        setCareerValues(prev => ({ ...prev, name: val }))
                        setCareerTouched(prev => ({ ...prev, name: true }))
                      }}
                      onBlur={() => setCareerTouched(prev => ({ ...prev, name: true }))}
                      aria-invalid={(careerTouched.name || careerSubmitAttempted) && !!careerErrors.name}
                      aria-describedby={(careerTouched.name || careerSubmitAttempted) && careerErrors.name ? 'career-name-err' : undefined}
                    />
                    {(careerTouched.name || careerSubmitAttempted) && !careerErrors.name && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(careerTouched.name || careerSubmitAttempted) && !!careerErrors.name && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(careerTouched.name || careerSubmitAttempted) && careerErrors.name && (
                    <span id="career-name-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {careerErrors.name}
                    </span>
                  )}
                </div>

                <div className={`field-group ${(careerTouched.phone || careerSubmitAttempted) && careerErrors.phone ? 'field-invalid' : (careerTouched.phone || careerSubmitAttempted) && !careerErrors.phone ? 'field-valid' : ''}`}>
                  <label htmlFor="career-phone" className="field-label">
                    <span>WhatsApp <span className="field-req" aria-hidden="true">*</span></span>
                  </label>
                  <div className="field-control">
                    <input
                      id="career-phone"
                      type="tel"
                      inputMode="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      value={careerValues.phone}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value)
                        setCareerValues(prev => ({ ...prev, phone: formatted }))
                        setCareerTouched(prev => ({ ...prev, phone: true }))
                      }}
                      onBlur={() => setCareerTouched(prev => ({ ...prev, phone: true }))}
                      aria-invalid={(careerTouched.phone || careerSubmitAttempted) && !!careerErrors.phone}
                      aria-describedby={(careerTouched.phone || careerSubmitAttempted) && careerErrors.phone ? 'career-phone-err' : undefined}
                    />
                    {(careerTouched.phone || careerSubmitAttempted) && !careerErrors.phone && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(careerTouched.phone || careerSubmitAttempted) && !!careerErrors.phone && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(careerTouched.phone || careerSubmitAttempted) && careerErrors.phone && (
                    <span id="career-phone-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {careerErrors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className={`field-group ${(careerTouched.email || careerSubmitAttempted) && careerErrors.email ? 'field-invalid' : (careerTouched.email || careerSubmitAttempted) && !careerErrors.email ? 'field-valid' : ''}`}>
                  <label htmlFor="career-email" className="field-label">
                    <span>E-mail <span className="field-req" aria-hidden="true">*</span></span>
                  </label>
                  <div className="field-control">
                    <input
                      id="career-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={careerValues.email}
                      onChange={(e) => {
                        const val = e.target.value
                        setCareerValues(prev => ({ ...prev, email: val }))
                        setCareerTouched(prev => ({ ...prev, email: true }))
                      }}
                      onBlur={() => setCareerTouched(prev => ({ ...prev, email: true }))}
                      aria-invalid={(careerTouched.email || careerSubmitAttempted) && !!careerErrors.email}
                      aria-describedby={(careerTouched.email || careerSubmitAttempted) && careerErrors.email ? 'career-email-err' : undefined}
                    />
                    {(careerTouched.email || careerSubmitAttempted) && !careerErrors.email && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(careerTouched.email || careerSubmitAttempted) && !!careerErrors.email && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(careerTouched.email || careerSubmitAttempted) && careerErrors.email && (
                    <span id="career-email-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {careerErrors.email}
                    </span>
                  )}
                </div>

                <div className={`field-group ${(careerTouched.city || careerSubmitAttempted) && careerErrors.city ? 'field-invalid' : (careerTouched.city || careerSubmitAttempted) && !careerErrors.city ? 'field-valid' : ''}`}>
                  <label htmlFor="career-city" className="field-label">
                    <span>Cidade <span className="field-req" aria-hidden="true">*</span></span>
                  </label>
                  <div className="field-control">
                    <input
                      id="career-city"
                      name="city"
                      autoComplete="address-level2"
                      placeholder="Jundiaí"
                      value={careerValues.city}
                      onChange={(e) => {
                        const val = e.target.value
                        setCareerValues(prev => ({ ...prev, city: val }))
                        setCareerTouched(prev => ({ ...prev, city: true }))
                      }}
                      onBlur={() => setCareerTouched(prev => ({ ...prev, city: true }))}
                      aria-invalid={(careerTouched.city || careerSubmitAttempted) && !!careerErrors.city}
                      aria-describedby={(careerTouched.city || careerSubmitAttempted) && careerErrors.city ? 'career-city-err' : undefined}
                    />
                    {(careerTouched.city || careerSubmitAttempted) && !careerErrors.city && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(careerTouched.city || careerSubmitAttempted) && !!careerErrors.city && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(careerTouched.city || careerSubmitAttempted) && careerErrors.city && (
                    <span id="career-city-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {careerErrors.city}
                    </span>
                  )}
                </div>
              </div>

              <div className={`field-group ${(careerTouched.area || careerSubmitAttempted) && careerErrors.area ? 'field-invalid' : (careerTouched.area || careerSubmitAttempted) && !careerErrors.area ? 'field-valid' : ''}`}>
                <label htmlFor="career-area" className="field-label">
                  <span>Área de interesse <span className="field-req" aria-hidden="true">*</span></span>
                </label>
                <div className="field-control">
                  <select
                    id="career-area"
                    name="area"
                    value={careerValues.area}
                    onChange={(e) => {
                      const val = e.target.value
                      setCareerValues(prev => ({ ...prev, area: val }))
                      setCareerTouched(prev => ({ ...prev, area: true }))
                    }}
                    onBlur={() => setCareerTouched(prev => ({ ...prev, area: true }))}
                    aria-invalid={(careerTouched.area || careerSubmitAttempted) && !!careerErrors.area}
                    aria-describedby={(careerTouched.area || careerSubmitAttempted) && careerErrors.area ? 'career-area-err' : undefined}
                  >
                    <option value="" disabled>Selecione uma área operacional</option>
                    {interestAreas.map(area => <option key={area} value={area}>{area}</option>)}
                  </select>
                  {(careerTouched.area || careerSubmitAttempted) && !careerErrors.area && (
                    <span className="field-feedback-icon valid" aria-hidden="true">
                      <CheckCircle2 size={16} />
                    </span>
                  )}
                  {(careerTouched.area || careerSubmitAttempted) && !!careerErrors.area && (
                    <span className="field-feedback-icon invalid" aria-hidden="true">
                      <AlertCircle size={16} />
                    </span>
                  )}
                </div>
                {(careerTouched.area || careerSubmitAttempted) && careerErrors.area && (
                  <span id="career-area-err" className="field-error-msg" role="alert">
                    <AlertCircle size={13} aria-hidden="true" /> {careerErrors.area}
                  </span>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="career-message" className="field-label">
                  <span>Breve apresentação (opcional)</span>
                </label>
                <div className="field-control">
                  <textarea
                    id="career-message"
                    name="message"
                    rows={3}
                    placeholder="Conte brevemente sobre você e sua experiência prévia na área de segurança ou portaria."
                    value={careerValues.message}
                    onChange={(e) => setCareerValues(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
              </div>

              <div className="field-group">
                <label className={`consent ${(careerTouched.consent || careerSubmitAttempted) && careerErrors.consent ? 'consent-invalid' : ''}`}>
                  <input
                    id="career-consent"
                    type="checkbox"
                    checked={careerValues.consent}
                    onChange={(e) => {
                      const checked = e.target.checked
                      setCareerValues(prev => ({ ...prev, consent: checked }))
                      setCareerTouched(prev => ({ ...prev, consent: true }))
                    }}
                    aria-invalid={(careerTouched.consent || careerSubmitAttempted) && !!careerErrors.consent}
                  />
                  <span>
                    Autorizo o uso dos dados pessoais e do currículo enviados exclusivamente para fins de recrutamento e seleção, em conformidade com a{' '}
                    <button type="button" className="inline-link-btn" onClick={() => setPrivacyOpen(true)}>
                      Política de Privacidade
                    </button>
                    , podendo solicitar a exclusão a qualquer momento.
                  </span>
                </label>
                {(careerTouched.consent || careerSubmitAttempted) && careerErrors.consent && (
                  <span className="field-error-msg" role="alert">
                    <AlertCircle size={13} aria-hidden="true" /> {careerErrors.consent}
                  </span>
                )}
              </div>

              {careerSubmitAttempted && isCareerHasErrors && (
                <div className="form-submit-alert" role="alert">
                  <AlertTriangle size={18} aria-hidden="true" />
                  <span>Por favor, preencha os campos obrigatórios destacados acima para prosseguir para o WhatsApp.</span>
                </div>
              )}

              <p className="form-status">
                Ao enviar, abriremos o WhatsApp com seus dados preenchidos. Anexe seu currículo diretamente na conversa para concluir a candidatura.
              </p>
              <button className="btn btn-dark" type="submit">
                <WhatsAppIcon size={18} aria-hidden="true" /> {careerSent ? 'Dados validados — Abrir novamente' : 'Enviar candidatura'} <ArrowRight size={18} />
              </button>
              {careerSent && (
                <p className="form-status" role="status">
                  Dados validados com sucesso! Se o WhatsApp não abrir automaticamente, clique novamente no botão acima ou fale pelo botão no canto da tela.
                </p>
              )}
            </form>
          </div>
        </section>

        <section id="faq" className="faq section-light section-fade" aria-labelledby="faq-title">
          <div className="section-wrap faq-inner">
            <div className="section-heading reveal">
              <p className="eyebrow dark"><span /> Dúvidas</p>
              <h2 id="faq-title">Perguntas<br /><strong>frequentes.</strong></h2>
            </div>
            <div className="faq-list reveal">
              {faqs.map(([q, a], i) => (
                <div className="faq-item" key={q}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span>{q}</span><ChevronDown className={openFaq === i ? 'rotated' : ''} aria-hidden="true" />
                  </button>
                  {openFaq === i && <div className="faq-answer" id={`faq-answer-${i}`}><p>{a}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="orcamento" className="quote section-dark section-fade" aria-labelledby="orcamento-title">
          <div className="section-wrap quote-inner">
            <div className="section-heading reveal">
              <p className="eyebrow"><span /> Solicite orçamento</p>
              <h2 id="orcamento-title">Conte o que você<br /><em>precisa proteger.</em></h2>
              <p>Preencha os dados abaixo e envie diretamente pelo WhatsApp. Assim, a equipe já entende a sua necessidade e responde com mais agilidade.</p>
              <ul className="quote-list">
                <li><ShieldCheck size={18} aria-hidden="true" /> Atendimento em Jundiaí e região</li>
                <li><Clock3 size={18} aria-hidden="true" /> Resposta em horário comercial</li>
                <li><MessageCircle size={18} aria-hidden="true" /> Contato direto pelo WhatsApp</li>
              </ul>
            </div>
            <form className="quote-form reveal" onSubmit={handleQuote} noValidate>
              <div className="form-row">
                <div className={`field-group ${(quoteTouched.name || quoteSubmitAttempted) && quoteErrors.name ? 'field-invalid' : (quoteTouched.name || quoteSubmitAttempted) && !quoteErrors.name ? 'field-valid' : ''}`}>
                  <label htmlFor="quote-name" className="field-label">
                    <span>Nome ou empresa <span className="field-req" aria-hidden="true">*</span></span>
                  </label>
                  <div className="field-control">
                    <input
                      id="quote-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Seu nome ou empresa"
                      value={quoteValues.name}
                      onChange={(e) => {
                        const val = e.target.value
                        setQuoteValues(prev => ({ ...prev, name: val }))
                        setQuoteTouched(prev => ({ ...prev, name: true }))
                      }}
                      onBlur={() => setQuoteTouched(prev => ({ ...prev, name: true }))}
                      aria-invalid={(quoteTouched.name || quoteSubmitAttempted) && !!quoteErrors.name}
                      aria-describedby={(quoteTouched.name || quoteSubmitAttempted) && quoteErrors.name ? 'quote-name-err' : undefined}
                    />
                    {(quoteTouched.name || quoteSubmitAttempted) && !quoteErrors.name && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(quoteTouched.name || quoteSubmitAttempted) && !!quoteErrors.name && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(quoteTouched.name || quoteSubmitAttempted) && quoteErrors.name && (
                    <span id="quote-name-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {quoteErrors.name}
                    </span>
                  )}
                </div>

                <div className={`field-group ${(quoteTouched.phone || quoteSubmitAttempted) && quoteErrors.phone ? 'field-invalid' : (quoteTouched.phone || quoteSubmitAttempted) && !quoteErrors.phone ? 'field-valid' : ''}`}>
                  <label htmlFor="quote-phone" className="field-label">
                    <span>WhatsApp <span className="field-req" aria-hidden="true">*</span></span>
                  </label>
                  <div className="field-control">
                    <input
                      id="quote-phone"
                      type="tel"
                      inputMode="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      value={quoteValues.phone}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value)
                        setQuoteValues(prev => ({ ...prev, phone: formatted }))
                        setQuoteTouched(prev => ({ ...prev, phone: true }))
                      }}
                      onBlur={() => setQuoteTouched(prev => ({ ...prev, phone: true }))}
                      aria-invalid={(quoteTouched.phone || quoteSubmitAttempted) && !!quoteErrors.phone}
                      aria-describedby={(quoteTouched.phone || quoteSubmitAttempted) && quoteErrors.phone ? 'quote-phone-err' : undefined}
                    />
                    {(quoteTouched.phone || quoteSubmitAttempted) && !quoteErrors.phone && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(quoteTouched.phone || quoteSubmitAttempted) && !!quoteErrors.phone && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(quoteTouched.phone || quoteSubmitAttempted) && quoteErrors.phone && (
                    <span id="quote-phone-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {quoteErrors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className={`field-group ${(quoteTouched.email || quoteSubmitAttempted) && quoteErrors.email ? 'field-invalid' : (quoteTouched.email || quoteSubmitAttempted) && quoteValues.email.trim() && !quoteErrors.email ? 'field-valid' : ''}`}>
                  <label htmlFor="quote-email" className="field-label">
                    <span>E-mail (opcional)</span>
                  </label>
                  <div className="field-control">
                    <input
                      id="quote-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={quoteValues.email}
                      onChange={(e) => {
                        const val = e.target.value
                        setQuoteValues(prev => ({ ...prev, email: val }))
                        setQuoteTouched(prev => ({ ...prev, email: true }))
                      }}
                      onBlur={() => {
                        if (quoteValues.email.trim()) {
                          setQuoteTouched(prev => ({ ...prev, email: true }))
                        }
                      }}
                      aria-invalid={(quoteTouched.email || quoteSubmitAttempted) && !!quoteErrors.email}
                      aria-describedby={(quoteTouched.email || quoteSubmitAttempted) && quoteErrors.email ? 'quote-email-err' : undefined}
                    />
                    {(quoteTouched.email || quoteSubmitAttempted) && quoteValues.email.trim() && !quoteErrors.email && (
                      <span className="field-feedback-icon valid" aria-hidden="true">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                    {(quoteTouched.email || quoteSubmitAttempted) && !!quoteErrors.email && (
                      <span className="field-feedback-icon invalid" aria-hidden="true">
                        <AlertCircle size={16} />
                      </span>
                    )}
                  </div>
                  {(quoteTouched.email || quoteSubmitAttempted) && quoteErrors.email && (
                    <span id="quote-email-err" className="field-error-msg" role="alert">
                      <AlertCircle size={13} aria-hidden="true" /> {quoteErrors.email}
                    </span>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="quote-city" className="field-label">
                    <span>Cidade / local</span>
                  </label>
                  <div className="field-control">
                    <input
                      id="quote-city"
                      name="city"
                      placeholder="Jundiaí"
                      value={quoteValues.city}
                      onChange={(e) => setQuoteValues(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="quote-service" className="field-label">
                  <span>Serviço de interesse</span>
                </label>
                <div className="field-control">
                  <select
                    id="quote-service"
                    name="service"
                    value={quoteValues.service}
                    onChange={(e) => setQuoteValues(prev => ({ ...prev, service: e.target.value }))}
                  >
                    <option value="">Selecione um serviço (opcional)</option>
                    {services.map(service => <option key={service.title} value={service.title}>{service.title}</option>)}
                  </select>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="quote-message" className="field-label">
                  <span>Mensagem (opcional)</span>
                </label>
                <div className="field-control">
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={3}
                    placeholder="Descreva o evento, o condomínio, comércio ou necessidade de segurança."
                    value={quoteValues.message}
                    onChange={(e) => setQuoteValues(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
              </div>

              <div className="field-group">
                <label
                  htmlFor="quote-consent"
                  className={`consent ${(quoteTouched.consent || quoteSubmitAttempted) && quoteErrors.consent ? 'consent-invalid' : ''}`}
                >
                  <input
                    id="quote-consent"
                    type="checkbox"
                    name="consent"
                    required
                    checked={quoteValues.consent}
                    onChange={(e) => {
                      const checked = e.target.checked
                      setQuoteValues(prev => ({ ...prev, consent: checked }))
                      setQuoteTouched(prev => ({ ...prev, consent: true }))
                    }}
                    aria-invalid={(quoteTouched.consent || quoteSubmitAttempted) && !!quoteErrors.consent}
                  />
                  <span>
                    Autorizo o uso dos dados pessoais enviados exclusivamente para fins de elaboração de proposta comercial, atendimento e contato pela Toledo Segurança, em conformidade com a{' '}
                    <button type="button" className="inline-link-btn" onClick={() => setPrivacyOpen(true)}>
                      Política de Privacidade
                    </button>
                    .
                  </span>
                </label>
                {(quoteTouched.consent || quoteSubmitAttempted) && quoteErrors.consent && (
                  <span className="field-error-msg" role="alert">
                    <AlertCircle size={13} aria-hidden="true" /> {quoteErrors.consent}
                  </span>
                )}
              </div>

              {quoteSubmitAttempted && isQuoteHasErrors && (
                <div className="form-submit-alert" role="alert">
                  <AlertTriangle size={18} aria-hidden="true" />
                  <span>Por favor, preencha os campos obrigatórios destacados acima para prosseguir para o WhatsApp.</span>
                </div>
              )}

              <button className="btn btn-gold" type="submit">
                <WhatsAppIcon size={18} aria-hidden="true" /> {quoteSent ? 'Proposta enviada — Abrir novamente' : 'Enviar pelo WhatsApp'}
              </button>
              <p className="quote-note" role="status">
                {quoteSent ? (
                  'Abrimos o WhatsApp com os dados preenchidos. Se a janela não abrir, use o botão de WhatsApp no canto da tela.'
                ) : (
                  <>
                    Ao enviar, você será direcionado ao WhatsApp com os dados preenchidos. Nenhuma informação é armazenada neste site. Consulte nossa{' '}
                    <button type="button" className="inline-link-btn" onClick={() => setPrivacyOpen(true)}>
                      Política de Privacidade
                    </button>
                    .
                  </>
                )}
              </p>
            </form>
          </div>
        </section>

        <section id="contato" className="contact section-dark section-fade" aria-labelledby="contato-title">
          <div className="section-wrap contact-inner reveal">
            <div>
              <p className="eyebrow"><span /> Contato</p>
              <h2 id="contato-title">Vamos conversar sobre<br /><em>sua necessidade.</em></h2>
              <p>Solicite um orçamento e conte o que você precisa proteger.</p>
              <a className="btn btn-gold" href={waLink(waMessages.contact)} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} aria-hidden="true" /> Falar no WhatsApp
              </a>
            </div>
            <address className="contact-details">
              <a className="contact-line" href={waLink(waMessages.contactLine)} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} aria-hidden="true" /> WhatsApp: (11) 91371-4556</a>
              <a className="contact-line" href="mailto:jt.toledoseguranca@gmail.com"><Mail size={17} aria-hidden="true" /> jt.toledoseguranca@gmail.com</a>
              <a className="contact-line" href="https://www.instagram.com/toledoseguranca4/" target="_blank" rel="noreferrer"><Instagram size={17} aria-hidden="true" /> @toledoseguranca4</a>
              <span className="contact-line"><MapPin size={17} aria-hidden="true" /> Rua José do Patrocínio, 134, Centro — Jundiaí/SP</span>
              <span className="contact-line"><Clock3 size={17} aria-hidden="true" /> Segunda a sexta, 08h às 18h</span>
            </address>
          </div>
        </section>
      </main>

      <footer className={bubbleOpen ? 'footer wa-bubble-active' : 'footer'}>
        <div className="footer-main">
          <a
            className="footer-brand"
            href="#inicio"
            aria-label="Voltar ao topo"
            onClick={(event) => {
              event.preventDefault()
              closeMenu()
              const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
              window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
            }}
          >
            <img src="/assets/brand/toledo-logo.png" alt="Toledo Segurança" />
          </a>
          <div>
            <p>Segurança que protege o que importa.</p>
            <span>Jundiaí e região</span>
          </div>
          <a className="instagram" href="https://www.instagram.com/toledoseguranca4/" target="_blank" rel="noreferrer" aria-label="Instagram da Toledo Segurança"><Instagram /></a>
        </div>
        <div className="footer-bottom">
          <span>Toledo Eventos LTDA · CNPJ 53.143.382/0001-79</span>
          <span>Rua José do Patrocínio, 134, Centro — Jundiaí/SP</span>
          <button
            type="button"
            className="footer-privacy-btn"
            onClick={() => setPrivacyOpen(true)}
            aria-haspopup="dialog"
          >
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Política de Privacidade</span>
          </button>
          <span>© {new Date().getFullYear()} Toledo Segurança. Todos os direitos reservados.</span>
        </div>
        <div className="footer-credit">
          <span>Criado e desenvolvido por</span>
          <a
            className="footer-credit-link"
            href={eloSitesWaLink(waMessages.eloSites)}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a Elo Sites pelo WhatsApp"
          >
            <img src="/assets/brand/elo-sites-logo.png" alt="Elo Sites" width="1536" height="382" decoding="async" />
          </a>
          <span>o melhor site pelo melhor preço</span>
        </div>
        <div className="footer-action">
          <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={13} aria-hidden="true" />
            <span>Voltar ao topo</span>
          </button>
        </div>
      </footer>

      <div className={bubbleOpen ? 'wa-widget bubble-open' : 'wa-widget'}>
        {bubbleOpen && (
          <aside className="wa-bubble" aria-label="Convite para contato pelo WhatsApp" aria-live="polite">
            <button type="button" className="wa-bubble-close" onClick={closeBubble} aria-label="Fechar aviso">
              <X size={15} aria-hidden="true" />
            </button>
            <a className="wa-bubble-link" href={waLink(waMessages.bubble)} target="_blank" rel="noreferrer">
              <span>Olá! Posso te ajudar a encontrar a solução ideal para sua segurança? Fale com a gente.</span>
            </a>
          </aside>
        )}
        <a className="floating-wa" href={waLink(waMessages.floating)} target="_blank" rel="noreferrer" aria-label="Falar com a Toledo pelo WhatsApp" title="Falar no WhatsApp">
          <WhatsAppIcon size={24} aria-hidden="true" />
        </a>
      </div>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  )
}

export default App
