import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef, type PointerEvent as ReactPointerEvent } from 'react'

import { EASE_OUT } from '../../lib/motion'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { LatticeField } from './LatticeField'

/**
 * Hero: una sola idea, con il campo di rete come contrappeso. Il titolo è
 * volutamente più piccolo rispetto alla versione precedente: deve aprire la
 * pagina, non occuparla tutta. Il testo resta fermo e leggibile subito; si
 * muovono solo i livelli del campo, e nulla succede con movimento ridotto.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  })
  const fieldScrollY = useTransform(scrollYProgress, [0, 1], [0, -18])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const fieldX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.5 })
  const fieldPointerY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.5 })

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 18)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 14)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <Section spacing="none">
      <Container
        width="wide"
        className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,5vw,4.5rem)]"
      >
        <div ref={stageRef} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-7">
            <motion.p {...rise(0)} className="eyebrow text-ink-muted">
              Consulenza · Finanza · Innovazione
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className="mt-6 max-w-[19ch] font-display text-hero text-balance"
            >
              Tecnologia e finanza, dentro i processi.
            </motion.h1>

            <motion.p {...rise(0.16)} className="text-measure mt-7 text-lead text-ink-muted">
              In PwC Italy lavoro su trasformazione digitale e innovazione tecnologica per il
              settore Financial Services. Mi occupo di Blockchain, pagamenti digitali e Web3.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/about" arrow>
                Chi sono
              </Button>
              <Button to="/contact" variant="secondary">
                Scrivimi
              </Button>
            </motion.div>

            <motion.dl
              {...rise(0.32)}
              className="mt-11 grid gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-3"
            >
              <div>
                <dt className="eyebrow text-ink-faint">Ruolo</dt>
                <dd className="mt-1.5 text-small text-ink-muted">Consulente Blockchain</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-faint">Oggi</dt>
                <dd className="mt-1.5 text-small text-ink-muted">Consultant, PwC Italy</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-faint">Focus</dt>
                <dd className="mt-1.5 text-small text-ink-muted">Pagamenti digitali</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            {...rise(0.2)}
            data-surface="dark"
            className="relative isolate overflow-hidden bg-canvas text-ink lg:col-span-5"
          >
            <div className="surface-glow absolute inset-0" aria-hidden="true" />

            <div
              className="relative aspect-[5/6] overflow-hidden"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              onPointerCancel={resetPointer}
            >
              <motion.div
                style={reduce ? undefined : { y: fieldScrollY }}
                className="absolute inset-x-0 -inset-y-8"
              >
                <motion.div
                  style={reduce ? undefined : { x: fieldX, y: fieldPointerY }}
                  className="absolute -inset-x-3 inset-y-0"
                >
                  <LatticeField className="size-full" />
                </motion.div>
              </motion.div>
            </div>

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <Eyebrow className="text-ink-faint">Topologia di rete</Eyebrow>
                <Eyebrow className="text-ink-faint">VR</Eyebrow>
              </div>
              <div>
                <p className="font-display text-subtitle">Sistemi distribuiti,</p>
                <p className="font-display text-subtitle text-ink-muted">verificabili per costruzione.</p>
                <p className="mt-4 text-caption text-ink-faint">
                  Blockchain · Pagamenti digitali · Innovazione
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
