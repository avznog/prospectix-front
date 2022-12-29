export interface CreateUserDto {
  firstname: string;
  name: string;
  pseudo: string;
  tokenGoogle: string;
  admin: boolean;
  disabled: boolean;
  mail: string;
  phone: string;
  statsEnabled: boolean;
}