export interface UserInterface
{
  nickname: String;
  username: String;
  authLevel: Number;
  password: String;
  sessionToken: String;
  refNum: Number;
  actualBtnLabel: String;
}

export interface UsersInterface
{
  user: UserInterface[];
}

export interface RESTStatus
{
  status: Number;
  body: String;
  title: String;
}

export interface MenuItem
{
  displayName: String;
}

export interface Menu
{
  menuItems: MenuItem[];
}


