import { useSelector } from "react-redux";

const Address = () => {
  const user = useSelector((state) => state.auth?.userData);

  const fullAddress = Object.values(user.addresses[0])
    .slice(0, 3)
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <div>
        <div className="font-bold text-lg">Delivery in 9 minutes</div>
        <div>{fullAddress}</div>
      </div>
    </div>
  );
};

export default Address;
