import { post } from "../serviceConfig";
import Services from "../serviceUrls";

async function login(data: Object): Promise<any> {
  return post(Services.login, data);
}

const AuthService = {
  login: login,
};

export default AuthService;
