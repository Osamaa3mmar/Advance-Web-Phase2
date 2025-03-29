import Button from "../../Button/Button.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import Select from "../../Select/Select.jsx";
import style from './style.module.css'
export default function Tools({modelControl}) {
  return (
    <div className=" flex flex-col gap-6">
      <h3 className=" text-[#027bff] font-bold text-2xl">Projects Overview</h3>
      <div className=" flex items-center gap-[10px] justify-between flex-wrap">
        <Button text={"Add New Project"} onClick={modelControl} type={"primary"}/>
        <SearchBar/>
        <Select/>
      </div>
    </div>
  )
}
