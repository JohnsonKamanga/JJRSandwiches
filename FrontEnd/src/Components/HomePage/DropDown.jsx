export default function DropDown({ isOpen }) {
  return (
    <div className=" absolute">
      {isOpen && (
        <ul className="p-1 rounded-b-lg border-2 border-amber-900 bg-amber-600 flex flex-col">
          <li className=" hover:text-white hover:cursor-pointer">
            Manage Account
          </li>
          <li className=" hover:text-white hover:cursor-pointer">Search</li>
          <li className="hover:text-white hover:cursor-pointer">Messages</li>
        </ul>
      )}
    </div>
  );
}
