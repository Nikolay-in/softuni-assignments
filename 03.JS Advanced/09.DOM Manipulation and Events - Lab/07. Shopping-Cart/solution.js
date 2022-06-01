function solve() {
   let buttons = Array.from(document.querySelectorAll('button.add-product'));
   let textArea = document.getElementsByTagName('textarea')[0];
   buttons.map(e => e.addEventListener('click', addProduct));
   document.querySelector('button.checkout').addEventListener('click', checkOut);
   let list = new Set();
   let total = 0;
   function addProduct(e) {
      let title = e.target.parentElement.previousElementSibling.querySelector('div.product-title').textContent;
      let price = Number(e.target.parentElement.nextElementSibling.textContent);
      total += price;
      list.add(title);
      textArea.value += `Added ${title} for ${price.toFixed(2)} to the cart.\n`;
   }
   function checkOut() {
      list = Array.from(list.keys()).join(', ');
      textArea.value += `You bought ${list} for ${total.toFixed(2)}.`;
   }
}