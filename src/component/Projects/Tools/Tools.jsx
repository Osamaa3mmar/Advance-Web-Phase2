import { useContext } from "react";
import Button from "../../Button/Button.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import Select from "../../Select/Select.jsx";
import { CurrentUserContext } from "../../../Context/CurrentUserContext.jsx";
export default function Tools({modelControl,searchTerm}) {
  const {user} =useContext(CurrentUserContext);
  return (
    <div className=" flex  flex-col gap-6">
      <h3 className=" text-[#027bff] font-bold text-2xl">Projects Overview</h3>
      <div className=" flex items-center gap-[10px] justify-between flex-wrap">
        {user?user.role=='admin'?
        <Button text={"Add New Project"} onClick={modelControl} type={"primary"}/>
        :"":""}
        <SearchBar searchTerm={searchTerm}/>
        <Select searchTerm={searchTerm}/>
      </div>
    </div>
  )
}
