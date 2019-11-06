class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function printfName(user) {
  console.log(`User's name is ${user.name}`);
}

function printfAge(user) {
  console.log(`User's is ${user.age} years old`);
}

export default User;
export { printfName, printfAge };
