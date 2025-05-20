const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border-2 border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);
export { Textarea };
