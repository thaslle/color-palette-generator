import s from './search.module.scss'

export const Submit = () => (
  <button type="submit" className={s.submit} aria-label="Search palette">
    <span>↑</span>
  </button>
)
