import U, { printfName, printfAge } from "./user.js";

const user = new U("Bob", 11);
console.log(user);

printfName(user);

printfAge(user);
