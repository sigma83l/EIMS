import { UserType } from "aws-sdk/clients/workdocs";

export class UserInit {
  name: string;
  email: string;
  role: string;
  userType: UserType;
}
