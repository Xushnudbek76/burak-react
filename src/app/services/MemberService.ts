import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";

class MemberService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getTopUsers(): Promise<Member[]> {
        try {
            const url = this.path + "/member/top-users";
            const result = await axios.get(url);

            return result.data;
        } catch (error) {
            console.log("Error, getTopUsers:", error);
            throw error
        }
    }

        public async getRestaurant(): Promise<Member> {
        try {
            const url = this.path + "/member/restaurant";
            const result = await axios.get(url);

            return result.data;
        } catch (error) {
            console.log("Error, getTopUsers:", error);
            throw error
        }
    }

    public async signup(input: MemberInput): Promise<Member> {
        try {
            const url = this.path + "/member/signup";
            const result = await axios.post(url, input, {withCredentials: true});
            localStorage.setItem("memberData", JSON.stringify(result.data.member))
            return result.data.member;
        } catch (error) {
            console.log("Error, signup", error)
            throw error
        }
    }

    
    public async login(input: LoginInput): Promise<Member> {
        try {
            const url = this.path + "/member/login";
            const result = await axios.post(url, input, {withCredentials: true});
            localStorage.setItem("memberData", JSON.stringify(result.data.member))
            return result.data.member;
        } catch (error) {
            console.log("Error, login", error)
            throw error
        }
    }

    public async logout(): Promise<boolean> {
        try {
            const url = this.path + "/member/logout";
            const result = await axios.post(url, {}, {withCredentials: true});
            localStorage.removeItem("memberData")
            return result.data.logout;
        } catch (error) {
            console.log("Error, logout", error)
            throw error
        }
    }    
}

export default MemberService;