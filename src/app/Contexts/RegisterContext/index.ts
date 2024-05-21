import { ReturnUseRegisterUser } from "@/app/customHooks/useRegisterUser/types";
import { createContext } from "react";

const ContextRegisterUser = createContext<ReturnUseRegisterUser>({
    isRegistering:false,
    profilePicture:null,
    setProfilePicture:()=>{},
    attemptRegisterUser:async()=>{}
});

export default ContextRegisterUser;