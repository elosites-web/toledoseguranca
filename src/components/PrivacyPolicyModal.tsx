import { useEffect, useRef } from 'react'
import {
  ShieldCheck, X, FileText, Lock, UserCheck, Mail, MapPin,
  Building2, Clock3, CheckCircle2,
} from 'lucide-react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const getFocusable = () =>
      modalRef.current
        ? Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
          ).filter(el => el.offsetParent !== null)
        : []

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || !modalRef.current?.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !modalRef.current?.contains(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      previouslyFocusedRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="privacy-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="privacy-modal-card" ref={modalRef}>
        <header className="privacy-modal-header">
          <div className="privacy-header-brand">
            <div className="privacy-icon-3d" aria-hidden="true">
              <ShieldCheck size={26} />
            </div>
            <div>
              <div className="privacy-eyebrow">
                <span>Diretrizes LGPD</span>
                <span className="privacy-dot" aria-hidden="true">·</span>
                <span>Lei Federal nº 13.709/2018</span>
              </div>
              <h2 id="privacy-modal-title" className="privacy-title">Política de Privacidade</h2>
              <p className="privacy-subtitle">Toledo Segurança · Toledo Eventos LTDA</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="privacy-modal-close"
            onClick={onClose}
            aria-label="Fechar política de privacidade"
          >
            <X size={20} />
          </button>
        </header>

        <div className="privacy-modal-content">
          <div className="privacy-summary-card">
            <div className="privacy-summary-header">
              <CheckCircle2 size={18} aria-hidden="true" />
              <strong>Compromisso de Transparência e Segurança</strong>
            </div>
            <p>
              Esta Política de Privacidade estabelece as diretrizes da <strong>Toledo Segurança</strong> (Toledo Eventos LTDA) quanto ao tratamento ético, transparente e seguro dos dados pessoais de clientes, parceiros e candidatos que utilizam este site institucional, em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei Federal nº 13.709/2018).
            </p>
          </div>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <Building2 size={18} aria-hidden="true" />
              <h3>1. Identificação do Controlador</h3>
            </div>
            <p>
              O controlador e responsável pelo tratamento dos seus dados pessoais é:
            </p>
            <div className="privacy-info-box">
              <div className="privacy-info-row">
                <span className="privacy-info-label">Razão Social:</span>
                <span className="privacy-info-val">Toledo Eventos LTDA</span>
              </div>
              <div className="privacy-info-row">
                <span className="privacy-info-label">Nome Fantasia:</span>
                <span className="privacy-info-val">Toledo Segurança</span>
              </div>
              <div className="privacy-info-row">
                <span className="privacy-info-label">CNPJ:</span>
                <span className="privacy-info-val">53.143.382/0001-79</span>
              </div>
              <div className="privacy-info-row">
                <span className="privacy-info-label">Endereço:</span>
                <span className="privacy-info-val">Rua José do Patrocínio, 134, Centro — Jundiaí/SP, CEP 13201-016</span>
              </div>
              <div className="privacy-info-row">
                <span className="privacy-info-label">Encarregado (DPO):</span>
                <span className="privacy-info-val">jt.toledoseguranca@gmail.com</span>
              </div>
              <div className="privacy-info-row">
                <span className="privacy-info-label">WhatsApp Oficial:</span>
                <span className="privacy-info-val">(11) 91371-4556</span>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <FileText size={18} aria-hidden="true" />
              <h3>2. Dados Coletados e Formas de Coleta</h3>
            </div>
            <p>
              Coletamos apenas os dados estritamente necessários para viabilizar o atendimento da sua solicitação. O fornecimento desses dados é inteiramente voluntário:
            </p>
            <ul className="privacy-bullet-list">
              <li>
                <strong>Solicitação de Orçamento (WhatsApp):</strong> Nome completo, número de WhatsApp/telefone, e-mail (opcional), cidade/local do evento ou patrimônio e mensagem detalhando a necessidade de segurança.
              </li>
              <li>
                <strong>Trabalhe Conosco (Candidatura):</strong> Nome completo, telefone/WhatsApp, e-mail, cidade de residência, área de atuação de interesse (Eventos, Portaria, Controle de Acesso, Rondas, etc.), mensagem de apresentação e currículo profissional enviado pelo candidato via WhatsApp.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <ShieldCheck size={18} aria-hidden="true" />
              <h3>3. Finalidades e Bases Legais do Tratamento</h3>
            </div>
            <p>
              Seus dados pessoais são tratados estritamente para as seguintes finalidades legítimas, fundamentadas na LGPD:
            </p>
            <ul className="privacy-bullet-list">
              <li>
                <strong>Atendimento a Solicitações de Orçamento:</strong> Compreender a demanda de segurança, calcular propostas comerciais adequadas e responder diretamente ao solicitante via WhatsApp ou e-mail (Base Legal: Art. 7º, inciso V — procedimentos preliminares relacionados a contrato).
              </li>
              <li>
                <strong>Processo Seletivo e Recrutamento:</strong> Avaliar o perfil de candidatos a postos de trabalho e escalas operacionais, agendar entrevistas e manter contato profissional (Base Legal: Art. 7º, inciso I — consentimento inequívoco do titular manifestado no envio da candidatura).
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <Lock size={18} aria-hidden="true" />
              <h3>4. Não Comercialização e Não Compartilhamento</h3>
            </div>
            <p>
              A Toledo Segurança <strong>não vende, não aluga, não comercializa e não compartilha</strong> dados pessoais com terceiros para fins publicitários ou mercadológicos. Os dados enviados são direcionados exclusivamente à nossa equipe operacional e de atendimento interno através do aplicativo WhatsApp oficial da empresa.
            </p>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <Lock size={18} aria-hidden="true" />
              <h3>5. Armazenamento, Segurança e Retenção</h3>
            </div>
            <p>
              Este site institucional atua como interface de contato e não armazena dados sensíveis ou informações de formulários em bancos de dados públicos ou desprotegidos. A transmissão dos dados ocorre por meio de protocolo seguro (HTTPS) diretamente para o canal de mensagens WhatsApp verificado da Toledo Segurança.
            </p>
            <p>
              Os dados de recrutamento são mantidos pelo período estritamente necessário para os processos seletivos vigentes e formação de cadastro reserva, sendo descartados de forma segura após o encerramento da finalidade ou mediante solicitação do titular.
            </p>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <UserCheck size={18} aria-hidden="true" />
              <h3>6. Direitos dos Titulares de Dados</h3>
            </div>
            <p>
              Nos termos do Art. 18 da LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="privacy-bullet-list">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso facilitado aos seus dados armazenados em nossos canais;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>Revogação do consentimento concedido a qualquer momento;</li>
              <li>Eliminação definitiva dos dados tratados com base no seu consentimento.</li>
            </ul>
            <p>
              Para exercer qualquer um dos seus direitos, basta enviar uma mensagem direta ao e-mail <strong>jt.toledoseguranca@gmail.com</strong> ou falar pelo nosso WhatsApp oficial <strong>(11) 91371-4556</strong> com o assunto "LGPD / Direitos do Titular".
            </p>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <FileText size={18} aria-hidden="true" />
              <h3>7. Cookies e Tecnologias de Navegação</h3>
            </div>
            <p>
              Nosso site utiliza apenas recursos estritamente técnicos essenciais para o funcionamento correto da navegação e segurança da aplicação. Não utilizamos cookies invasivos de rastreamento entre sites ou ferramentas de terceiros para publicidade comportamental sem o seu conhecimento.
            </p>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <Mail size={18} aria-hidden="true" />
              <h3>8. Canal de Contato do Encarregado (DPO)</h3>
            </div>
            <p>
              Para dúvidas, esclarecimentos, sugestões ou solicitações relativas à privacidade e proteção de dados pessoais, nosso canal oficial de atendimento está à disposição:
            </p>
            <div className="privacy-contact-card">
              <div>
                <Mail size={18} aria-hidden="true" />
                <span>E-mail: <strong>jt.toledoseguranca@gmail.com</strong></span>
              </div>
              <div>
                <MapPin size={18} aria-hidden="true" />
                <span>Rua José do Patrocínio, 134, Centro — Jundiaí/SP</span>
              </div>
              <div>
                <Clock3 size={18} aria-hidden="true" />
                <span>Horário de Atendimento: Segunda a sexta, das 08h às 18h</span>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <div className="privacy-section-header">
              <Clock3 size={18} aria-hidden="true" />
              <h3>9. Atualizações desta Política</h3>
            </div>
            <p>
              Esta Política de Privacidade poderá ser revisada e atualizada periodicamente para refletir melhorias em nossos procedimentos ou novas exigências legais e regulatórias.
            </p>
            <div className="privacy-date-badge">
              <span>Última atualização: Setembro de 2026</span>
            </div>
          </section>
        </div>

        <footer className="privacy-modal-footer">
          <button type="button" className="btn btn-gold" onClick={onClose}>
            Entendido e Aceito
          </button>
        </footer>
      </div>
    </div>
  )
}
