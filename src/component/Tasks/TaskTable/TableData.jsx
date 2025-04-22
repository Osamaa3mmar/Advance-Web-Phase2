export default function TableHeader({children}){
    return (
        <td class="px-2 py-1 text-left border-b border-gray-800 text-gray-500 font-normal text-[clamp(6px,1vw,20px)]">{children}</td>
    );
}

