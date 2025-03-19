import Button from "../../Button/Button.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import Select from "../../Select/Select.jsx";

export default function Tools({modelControl}) {
  return (
    <div>
      <h3 className=" text-[#027bff] font-bold text-2xl">Projects Overview</h3>
      <div className=" flex items-center gap-[40px] justify-between">
        <Button text={"Add New Project"} onClick={modelControl} type={"primary"}/>
        <SearchBar/>
        <Select/>
      </div>
    </div>
  )
}
