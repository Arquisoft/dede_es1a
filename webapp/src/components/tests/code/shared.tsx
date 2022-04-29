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