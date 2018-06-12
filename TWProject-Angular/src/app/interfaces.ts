export interface UserInterface {
  nickname: String;
  username: String;
  authLevel: Number;
  password: String;
  sessionToken: String;
}

export interface UsersInterface {
  user: UserInterface[];
}

export interface RESTStatus {
  status: Number;
  body: String;
  title: String;
}

export interface QuizInterface {
  id: number;
  title: string;
  description: string;
  instructions: string;
  canvas: string;
}

export interface QuizzesInterface {
  quiz: QuizInterface[];
}

export interface FileReaderEventTarget extends EventTarget {
  result: string;
}

export interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
