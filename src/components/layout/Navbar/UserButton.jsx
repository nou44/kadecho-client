import { User } from "lucide-react";
import IconButton from "../../ui/IconButton";

export default function UserButton() {
  return (
    <IconButton
      ariaLabel="User Account"
    >
      <User
        size={19}
        strokeWidth={2.2}
      />
    </IconButton>
  );
}