import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  res.send("Signup route new");
}

export async function login(req: Request, res: Response) {
  res.send("Login route new");
}

export async function logout(req: Request, res: Response) {
  res.send("Logout route new");
}
