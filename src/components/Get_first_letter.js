export default function getName(name) {
  if(name !== "" && name !== undefined && name !== null){
    var values = name.split(" ");
    var letter = values[0].charAt(0);
    return letter;
  }
}
