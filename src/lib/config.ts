const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
const viteApiUrl = viteEnv?.VITE_API_URL ?? viteEnv?.REACT_APP_API_URL;
const craApiUrl =
  typeof process !== "undefined" && process.env
    ? process.env.REACT_APP_API_URL
    : undefined;

export const serverApi: string = `${viteApiUrl ?? craApiUrl ?? ""}`;

export const Messages = {
    error1: "Something went wrong",
    error2: "Please login first",
    error3: "Please fulfill all inputs",
    error4: "Message is empty!",
    error5: "Only images with jpeg, jpg, png format allowed!"
 }