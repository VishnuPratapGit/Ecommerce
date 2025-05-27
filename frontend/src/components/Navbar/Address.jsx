import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Address = () => {
  const [fullAddress, setFullAddress] = useState("Load Address...");
  const user = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    if (user?.addresses?.length > 0) {
      const add = Object.values(user.addresses[0])
        .slice(0, 3)
        .filter(Boolean)
        .join(", ");
      setFullAddress(add);
    }
  }, [user]);

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
