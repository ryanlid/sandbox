const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

fill.addEventListener("dragstart", dragstart);
fill.addEventListener("dragend", dragEnd);

for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}

function dragstart() {
  console.log("start");
  this.className += " hold";
  setTimeout(() => {
    this.className = "invisible";
  }, 0);
}

function dragEnd() {
  console.log("end");
  this.className = "fill";
}

function dragOver(e) {
  e.preventDefault();
  console.log("over");
}

function dragEnter() {
  console.log("enter");
  this.className += " hovered";
}

function dragLeave() {
  console.log("leave");
  this.className = "empty";
}

function dragDrop() {
  console.log("drop");
  this.className = "empty";
  this.append(fill);
}
