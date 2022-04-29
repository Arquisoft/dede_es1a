<<<<<<< HEAD
import { Rock } from "../../../shared/shareddtypes";

export const LIST_OF_ROCKS_TEST : Rock[]= [
    {
      id: 0,
      name: "test0",
      img: "test0img",
      price: 0,
      mohsHardness: 0,
      density: 0,
      type: "test0type",
      quantityCart: 0,
    },
    {
      id: 1,
      name: "test1",
      img: "test1img",
      price: 1,
      mohsHardness: 1,
      density: 1,
      type: "test1type",
      quantityCart: 1,
    },
    {
      id: 2,
      name: "test2",
      img: "test2img",
      price: 2,
      mohsHardness: 2,
      density: 2,
      type: "test2type",
      quantityCart: 2,
    },
    {
      id: 3,
      name: "test3",
      img: "test3img",
      price: 3,
      mohsHardness: 3,
      density: 3,
      type: "test3type",
      quantityCart: 3,
    },
  ];
=======
import { Order } from "../../../shared/shareddtypes"

export const LIST_OF_ORDERS_TEST : Order[]= [
    {
        orderId : "123",
        date: new Date("2020-12-12"),
        price : 150,
        productId: "1",
        userEmail : "admin@gmail.com",
        productName : "Granito",
        productType : "magmática"
    },
    {
        orderId : "1234",
        date: new Date("2021-12-12"),
        price : 180,
        productId: "12",
        userEmail : "admin@gmail.com",
        productName : "Cuarcita",
        productType : "metamórfica"
    },
    {
        orderId : "12345",
        date: new Date("2022-12-12"),
        price : 190,
        productId: "123",
        userEmail : "admin@gmail.com",
        productName : "Andesita",
        productType : "ígnea"
    },
    {
        orderId : "123567",
        date: new Date("2019-12-12"),
        price : 110,
        productId: "1011",
        userEmail : "admin@gmail.com",
        productName : "Marmol",
        productType : "metamórfica"
    },
];
>>>>>>> develop
