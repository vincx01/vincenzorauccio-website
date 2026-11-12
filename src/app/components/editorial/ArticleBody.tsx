import type { ArticleBlock } from '../../../data/articles'

function List({ block }: { block: Extract<ArticleBlock, { type: 'list' }> }) {
  const Tag = block.ordered ? 'ol' : 'ul'
  return (
    <Tag>
      {block.items.map((item, index) => (
        <li key={index}>
          {typeof item === 'string' ? (
            item
          ) : (
            <>
              <strong>{item.title}</strong>: {item.text}
            </>
          )}
        </li>
      ))}
    </Tag>
  )
}

function BodyBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>
    case 'heading':
      return block.level === 3 ? <h3>{block.text}</h3> : <h2>{block.text}</h2>
    case 'list':
      return <List block={block} />
    case 'quote':
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.attribution && <footer>{block.attribution}</footer>}
        </blockquote>
      )
    case 'links':
      return (
        <aside className="prose-links">
          <p className="eyebrow text-ink-faint">{block.title ?? 'Link'}</p>
          <ul>
            {block.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )
    default:
      return null
  }
}

/**
 * Renders the published structure. The opening paragraph is set as a lead so
 * the first sentence is not repeated in a separate standfirst.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  const [first, ...rest] = blocks
  const lead = first?.type === 'paragraph' ? first : undefined
  const remainder = lead ? rest : blocks

  return (
    <div className="prose-article">
      {lead && <p className="article-lead">{lead.text}</p>}
      {remainder.map((block, index) => (
        <BodyBlock key={index} block={block} />
      ))}
    </div>
  )
}
