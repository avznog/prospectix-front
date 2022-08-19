export interface CreateUserDto {
  firstname: string;
  name: string;
  pseudo: string;
  tokenEmail: string;
  admin: boolean;
  disabled: boolean;
  mail: string;
}