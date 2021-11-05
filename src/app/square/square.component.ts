import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  container: HTMLElement = document.createElement('div');
  squares: HTMLElement[] = [];
  colors: string[] = [
    'brown',
    'purple',
    'green'
  ];
  clicks: boolean[] = [false, false, false, false, false];
  constructor(private renderer:Renderer2, private el: ElementRef) {
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'row';
    this.renderer.appendChild(el.nativeElement, this.container);
  }


  ngOnInit(): void {
    for (let i = 0; i < 6; i++){
      this.squares.push(this.createSquare(`${i}`));
      this.renderer.appendChild(this.container, this.squares[i]);
    }
    this.checkBlue();
  }
  public createSquare(id: string){
    const square  = document.createElement('div');
    square.id = id;
     square.style.backgroundColor = `${this.colors[Math.floor(Math.random() * this.colors.length)]}`;
     square.style.width = '60px';
     square.style.height = '60px';
     square.style.margin = '50px';
     square.style.border = "5px solid transparent";
     square.onclick = () =>{
       this.clicks[+square.id] = !this.clicks[+square.id];
       square.style.border = (this.clicks[+square.id]) ? "5px solid orange" : "5px solid transparent";
       console.log(+square.id);
     }
     return square;
  }

  checkBlue(){
    let pastId = [];
    while(true){
      let id = Math.floor(Math.random() * 6);
      if(pastId.length === 3) break;
      if(pastId.find((pId)=>id===pId) === undefined) {
        pastId.push(id);
        this.squares[id].style.backgroundColor = 'blue';
      }
    }
  }

  onClick(){
    let counterTrue = 0;
    let counterFalse = 0;
    for(let i = 0; i < this.squares.length; ++i){
      if(this.clicks[+this.squares[i].id] && this.squares[i].style.backgroundColor === 'blue'){
        ++counterTrue;
      }
      else if(this.clicks[+this.squares[i].id]){
        this.messageError();
        return;
      }
    }
    if(counterTrue === 3){
      this.messageAllRight();
    }
    else{
      this.messageError();
    }
  }

  messageError(){
    const message  = document.createElement('h3');
    this.renderer.appendChild(this.el.nativeElement,message);
    message.textContent = 'ERROR';
  }
  
  messageAllRight(){
    const message  = document.createElement('h3');
    this.renderer.appendChild(this.el.nativeElement,message);
    message.textContent = 'All Right';
  }
}
