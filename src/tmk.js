const daString =
  "<div class='list-item-predot'></div><div class='list-item-dot'></div><div class='list-item-afterdot'></div>";
const elements = document.querySelectorAll('.list-timeline .list-item');
elements.forEach(function (item) {
  // let item = elements[i];
  console.log(elements, item);
  item.innerHTML += daString;
});
