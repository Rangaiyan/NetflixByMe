import { IsString, Matches, MinLength } from 'class-validator';

export class Signup {
 
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/,{message:"password must contain @least one number"})
  password: string;
}


export class Signin{
   @IsString()
  email:string;
  @MinLength(6)
  password:string
}
