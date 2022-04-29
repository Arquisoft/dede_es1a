export type User = {
    name:string;
    email:string;
    dni:string;
    password:string;
    repeatPassword:string;

  };
export type Rock = {
    id:React.Key;
    rockId:string;
    name: string;
    img: string;
    price: number;
    mohsHardness:number;
    density:string;
    type:string;

    
    quantityCart:number
  }
export type Order = {
    orderId : String,
    date: Date,
    price : Number,
    productId: String,
    userEmail : String,
    productName : String,
    productType : String
}

export type Product = {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: string;
  url: string;
  descripcion: string;
  cantidad: number;
}