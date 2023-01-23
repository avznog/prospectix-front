export interface UpdateUserDto {
  firstname?: string;
  name?: string;
  pseudo?: string;
  tokenGoogle?: string;
  profilePictureLink?: string;
  admin?: boolean;
  disabled?: boolean;
  mail?: string;
  phone?: string;
  statsEnabled?: boolean;
  objectived?: boolean;
}