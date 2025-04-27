
export default function TableHead({name,num}) {
  return (
    <th className={` text-[16px] px-4 py-2 w-[${num}]`}>
{name}
    </th>
  )
}
