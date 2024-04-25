import { IUser } from "@/types/user";

export const useProfileQuery = (): IUser => ({
  id: 0,
  username: "tester@example.com",
  firstName: "Nick",
  lastName: "Pyl",
  email: "tester@example.com",
  password: "",
  mobilePhone: "",
  homePhone: "",
  businessPhone: "",
  officePhone: "",
  callCenterNumber: "",
  address: "",
  zipCode: "",
  city: "",
  region: "",
  afm: "",
  doy: "",
  gemh: "",
  profilePhoto: "",
  properties: [],
  isAdmin: false,
  isActive: false,
  joinedIn: "",
  registrationDate: "",
  preferredLanguage: { key: "GREEK", value: "Greek" },
});
