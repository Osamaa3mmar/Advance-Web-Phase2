export default function TaskInput({ label, id, type = "text", required, value, onChange, colors }) {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-gray-400 mb-1">
          {label}
        </label>
        <input
          type={type}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          className="text-white p-2 px-3 border border-gray-600 rounded-md text-[clamp(1vw,20px)]"
          style={{ backgroundColor: colors?.charcoal }}
        />
      </div>
    );
  }
  