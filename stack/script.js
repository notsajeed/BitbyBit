 // Get Canvas Context
       
 const canvas = document.getElementById("stackCanvas");
 const ctx = canvas.getContext("2d");
 let logContent = document.getElementById("log");

 // Stack Data
 let stack = [];
 const boxHeight = 50; // Height of each stack element
 const maxStackSize = 10; // Max elements to fit in canvas

     
 // Function to Draw Stack
 function drawStack(highlightIndex = -1, highlightColor = "blue") {
     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

     for (let i = 0; i < stack.length; i++) {
         let color = (i === highlightIndex) ? highlightColor : "blue"; // Highlight if index matches
         
         ctx.fillStyle = color;
         ctx.fillRect(50, canvas.height - (i + 1) * boxHeight - 10, 200, boxHeight);
         ctx.strokeStyle = "black";
         ctx.strokeRect(50, canvas.height - (i + 1) * boxHeight - 10, 200, boxHeight);

         ctx.fillStyle = "white";
         ctx.font = "bold 20px Poppins";
         ctx.textAlign = "center";      // Centers text horizontally
         ctx.textBaseline = "middle";   // Centers text vertically
         ctx.fillText(stack[i],canvas.width / 2, canvas.height - (i * boxHeight) - 35);
     }
 }

 function pushElement() {
     let value = document.getElementById("stack-input").value;
     if (value === "") return alert("Enter a value!");
     if (value >= 999999999999999) return alert("its too big")

     if (stack.length < maxStackSize) {
         stack.push(value);
         drawStack(stack.length - 1, "green");
         logContent.innerText += `${value} is Added to the stack \n`;  // Highlight new top element in green
     } else {
         alert("Stack Overflow! Can't push more.");
         logContent.innerHTML += `<a href="#overflow-section"  class="tag">Stack OverFlow</a> \n`;
     }
    
 }

 function popElement() {
     if (stack.length > 0) {
         let poppedIndex = stack.length - 1; // Get top index
         
         logContent.innerText += `${stack[poppedIndex]} is Removed from the stack \n`; 
         // Step 1: Highlight popped element in red
         drawStack(poppedIndex, "red");

         // Step 2: Remove after delay
         setTimeout(() => {
             stack.pop();
             drawStack(stack.length - 1, "green");  // Redraw stack after popping
         }, 300); // 300ms delay
     } else {
         alert("Stack Underflow! No elements left.");
         logContent.innerHTML += `<a href="#underflow-section" class="tag">Stack UnderFlow</a> \n`; 
     }}

     function clearLog(){
         logContent.innerHTML ='';
     }

     function returnTop(){
        if(stack.length - 1 === -1){
            alert("NO element in the stack")
        }
        else{
        alert(`${stack[stack.length - 1]} is the top element of stack at index ${stack.length - 1}, That green colored block`); // gives top
        }
     }

     function returnToInput() {
        document.getElementById("stack-input").focus(); // Moves focus back to input
      }


     drawStack();// Initial call to draw empty stack