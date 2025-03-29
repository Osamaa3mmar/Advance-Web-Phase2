import style from './style.module.css';
export default function Select() {
  return (
    <select className={style.select+ ' w-full m-auto  md:w-[100px] '}>
      <option className={style.option}>osama</option>
      <option className={style.option}>osama</option>
      <option className={style.option}>osama</option>
      <option className={style.option}>osama</option>
    </select>
  )
}
