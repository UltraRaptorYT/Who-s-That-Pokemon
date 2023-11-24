let string = "Asdf sseedseedsf asd";
var array = string.split("");
var y = 3;
let str = "";
var arr = [];
var length = array.length;
while (true) {
  while (x <= y) {
    str += array[x];
  }
  if (str == "seed") {
    var l = x;
    var z = y;
    while (l <= z) {
      arr.push(l);
      l++;
    }
  }
  x += 1;
  y = x + 4;
  if (x == str) break;
}

while (x <= arr.length) {
  if (x != Arr[x]) {
    realstr += arr[x];
  }
  x++;
}

console.log(Realstr);
