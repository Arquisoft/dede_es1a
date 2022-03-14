import { Roca } from "../shared/shareddtypes";

export function createData():Roca[]{
    const rocas=[];
    const numDatos=100;
    const rugosidad=["lisa","rugosa", "pulida"]
    const tipo=["igneas","metamorficas", "sedimentarias"]
    for (let i = 0; i < numDatos; i++) {
      var rock: Roca={
        id: i,
        name: "roca n "+i,
        img: "https://www.amazon.es/clouddrive/folder/wNswVOqSROmGTyY4eElu1Q/2kc6XNUwT-St2ffSBPMuGw?sort=sortKind&sortOrder=desc",
        precio: (i^3)%20+10,
        durezaMohs: (i*9999)%7000,
        rugosidad: rugosidad[i%3],
        Tipo: tipo[i%3]
      }
      rocas.unshift(rock)
    }
    return rocas
}
