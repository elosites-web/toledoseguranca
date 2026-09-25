const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  if (EDITABLE_TAGS.has(target.tagName)) return true
  return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
}

const blockEvent = (event: Event): void => {
  if (isEditableTarget(event.target)) return
  event.preventDefault()
}

export function initContentProtection(): void {
  document.addEventListener('copy', blockEvent)
  document.addEventListener('cut', blockEvent)
  document.addEventListener('contextmenu', blockEvent)
  document.addEventListener('dragstart', blockEvent)
  document.addEventListener('selectstart', blockEvent)

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (!event.ctrlKey && !event.metaKey) return
    const key = event.key.toLowerCase()
    if (key !== 'c' && key !== 'x' && key !== 'a') return
    if (isEditableTarget(event.target)) return
    event.preventDefault()
  })
}
