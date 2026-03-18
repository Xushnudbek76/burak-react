import { createContext } from "vm";
import { Member } from "../../lib/types/member";
import { useContext } from "react";

interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
}
// @ts-ignore
export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined
)

export const useGlobals = () => {
    // @ts-ignore

    const context = useContext(GlobalContext);
    if(context === undefined) throw new Error("useGlobals with it provider");
    return context;
};