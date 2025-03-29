import AsMuiBtn from '../ProjectsArea/AsMuiBtn.jsx'
export default function ProjectsForm() {
  const createProject=(e)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={createProject} className="w-full my-3 px-[15px] flex flex-col gap-3 overflow-auto h-[430px]  text-white">
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Title :</h3>
        <input type="text" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Description :</h3>
        <textarea name="" rows={5} className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg" id=""></textarea>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Starting Date :</h3>
        <input type="date" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Ending Date :</h3>
        <input type="date" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>

      <div className="btns flex items-center gap-6">
      <AsMuiBtn text={"Clear"} variant={"normal"} openSide={()=>{}}/>
      <AsMuiBtn text={"Add"} type={'submit'} variant={"view"} openSide={()=>{}}/>
      </div>
    </form>
  )
}
