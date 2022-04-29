export type User = {
    name:string;
    email:string;
    dni:string;
    password:string;
    repeatPassword:string;

  };
export type Rock = {
    id:React.Key;
    name: string;
    img: string;
    price: number;
    mohsHardness:number;
    density:number;
    type:string;
    quantityCart:number
  }