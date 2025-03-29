import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export default function SearchBar() {
  const [searchIcon,setSearchIcon]=useState(true);
  const searchRef=useRef();
  const handelSearchBtn=()=>{
    if(searchIcon){
      searchRef.current.focus();
    }
    else{
      searchRef.current.blur();
    }
    setSearchIcon(!searchIcon);
  }
  const onFocusHandel=()=>{
    setSearchIcon(false);

  }
  const onBlurHandel=()=>{
    setSearchIcon(true);

  }
  return (
    <div className="   px-3 py-0.5 flex w-[400px]  grow m-auto rounded-lg   items-center justify-start bg-white  border-2 border-[#027bff] hover:outline-[3px] ">
      <input type="text" ref={searchRef} onBlur={onBlurHandel} onFocus={onFocusHandel} className=' outline-0 grow' placeholder={"Search Project By Title or Description..."} />
      <div onClick={handelSearchBtn} className=" w-[35px] h-[35px] flex items-center justify-center rounded-full  cursor-pointer hover:bg-[#00000022] ">
      {searchIcon?  
      <CiSearch color="#333" fontSize={24}/>
      :
      <IoClose/>
}
      </div>
    </div>
  )
}
