export interface ProfileMenuProps {
  name: string;
  backgroundUrl: string;
  photoUrl: string;
  aboutMe: string;
  phone: string;
  birthDate: string;
  uid: string;
  handleClose: () => void;
  password: string;
}
export interface ProfileFormInputs {
  newName: string;
  phoneNumber: string;
  description: string;
  newBirthDate: string;
  newPassword: string;
}
