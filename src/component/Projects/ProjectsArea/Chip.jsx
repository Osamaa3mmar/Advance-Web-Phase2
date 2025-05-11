import style from './style.module.css'
export default function Chip({stu}) {
  
  return (
    <div className={" bg-[#ffffff44] rounded-2xl py-1 px-2 capitalize "+style.chipBorder}>
      {stu?.username}
    </div>
  )
}
