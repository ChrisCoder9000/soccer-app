import { APIError } from "@/utils/api";
import fs from "fs/promises";
import bcrypt from "bcryptjs";
import validator from "validator";
import { userTypes } from "../../../types/general";

export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  passwordRepeat?: string;
  type: userTypes;
}

export class User implements IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  passwordRepeat?: string;
  type: userTypes;

  constructor(data: {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
    type: userTypes;
  }) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.passwordRepeat = data.passwordRepeat;
    this.type = data.type;
  }

  async save(): Promise<IUser> {
    const filename = `${__dirname}/../../../../../../database/users.json`;

    const isEmailUnique = await this.isEmailUnique(this.email);

    if (!isEmailUnique) {
      throw new Error("11002 - This email is already registered");
    }

    const isUsernameUnique = await this.isUsernameUnique(this.username);

    if (!isUsernameUnique) {
      throw new Error("11001 - User with this username already exists");
    }

    await this.verifyEmail();
    await this.verifyPassword();
    const hashedPassword = await this.hashPassword();

    const data = await fs.readFile(filename, "utf8");
    const usersArray: User[] = data ? JSON.parse(data) : [];

    delete this.passwordRepeat;

    const newUser = {
      ...this,
      id: usersArray.length + 1,
      password: hashedPassword,
    };

    usersArray.push(newUser);

    const newData = JSON.stringify(usersArray, null, 2);

    await fs.writeFile(filename, newData, "utf8");

    return newUser;
  }

  static async findByCredentials(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const filename = `${__dirname}/../../../../../../database/users.json`;

      const data = await fs.readFile(filename, "utf8");
      const usersArray: User[] = data ? JSON.parse(data) : [];

      const user = usersArray.find((u) => u.email === email);

      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }

      return null;
    } catch (error) {
      throw new APIError("Error reading user data", 500);
    }
  }

  static async findOneBy(
    param: keyof IUser,
    value: string
  ): Promise<User | null> {
    try {
      const filename = `${__dirname}/../../../../../../database/users.json`;

      const data = await fs.readFile(filename, "utf8");
      const usersArray: User[] = data ? JSON.parse(data) : [];

      const user = usersArray.find((u: IUser) => u[param] === value);

      return user || null;
    } catch (error) {
      throw new APIError("Error reading user data", 500);
    }
  }

  private async verifyEmail(): Promise<void> {
    console.log(this);
    const isEmailValid = validator.isEmail(this.email);
    if (!isEmailValid) {
      throw new APIError("Email not valid", 400);
    }
  }

  private async verifyPassword(): Promise<void> {
    if (this.password !== this.passwordRepeat) {
      throw new APIError("Passwords do not match", 400);
    }
  }

  private async hashPassword(): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password!, salt);

      this.password = hashedPassword;
      this.passwordRepeat = undefined;
      return hashedPassword;
    } catch (error) {
      throw new APIError(
        "Errore durante la generazione dell'hash della password",
        500
      );
    }
  }

  private async isEmailUnique(email: string): Promise<boolean> {
    const filename = `${__dirname}/../../../../../../database/users.json`;

    try {
      const data = await fs.readFile(filename, "utf8");
      const usersArray: User[] = data ? JSON.parse(data) : [];

      return !usersArray.some((user) => user.email === email);
    } catch (error) {
      console.error("Error reading users data:", error);
      return false;
    }
  }

  private async isUsernameUnique(username: string): Promise<boolean> {
    const filename = `${__dirname}/../../../../../../database/users.json`;

    try {
      const data = await fs.readFile(filename, "utf8");
      const usersArray: User[] = data ? JSON.parse(data) : [];

      return !usersArray.some((user) => user.username === username);
    } catch (error) {
      console.error("Error reading users data:", error);
      return false;
    }
  }
}
