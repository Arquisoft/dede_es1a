export type User = {
    name:string;
    email:string;
    dni:string;
    password:string;
    repeatPassword:string;

  };
export type Rock = {
    id:React.Key;
    name: String;
    img: string;
    price: Number;
    mohsHardness:Number;
    density:String;
    type:String;
  }