export interface UserInterface
{
  nickname: String;
  username: String;
  password: String;
  authLevel: Number;
}

export interface UsersInterface
{
  user: UserInterface[];
}

export interface RESTStatus
{
  status: String;
  message: String;
}
