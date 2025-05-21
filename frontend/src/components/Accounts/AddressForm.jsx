import Input from "../Input";
import { Home, MapPin, Globe, Landmark } from "lucide-react";

export default function AddressForm({
  address,
  setAddress,
  title = "Business Address",
  border = true,
}) {
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`${
        border ? "border" : ""
      } rounded-xl border-neutral-300 p-4 w-full`}
    >
      <h2 className="font-semibold text-lg mb-3">{title}</h2>

      <Input
        name="street"
        placeholder="Street"
        icon={Home}
        value={address.street}
        onChange={handleChange}
        required
      />

      <Input
        name="city"
        placeholder="City"
        icon={MapPin}
        value={address.city}
        onChange={handleChange}
        required
        className="mt-2"
      />

      <Input
        name="state"
        placeholder="State"
        icon={Landmark}
        value={address.state}
        onChange={handleChange}
        required
        className="mt-2"
      />

      <Input
        type="number"
        name="pincode"
        placeholder="Pincode"
        icon={MapPin}
        value={address.pincode}
        onChange={handleChange}
        required
        className="mt-2"
      />

      <Input
        name="country"
        placeholder="Country"
        icon={Globe}
        value={address.country}
        onChange={handleChange}
        className="mt-2"
      />
    </div>
  );
}
