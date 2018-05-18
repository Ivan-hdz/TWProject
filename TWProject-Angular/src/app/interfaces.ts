export interface UserInterface
{
  nickname: String;
  username: String;
  authLevel: Number;
  password: String;
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

export interface MenuItem
{
  displayName: String;
  selectorName: String;
}

export interface Menu
{
  menuItems: MenuItem[];
}
