import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  squares: HTMLElement[] = [];
  colors: string[] = [
    'blue',
    'red',
    'green'
  ];
  usersSquares:HTMLElement[] = [];
  constructor(private renderer:Renderer2, private el: ElementRef) {
    for (let i = 0; i < 6; i++){
      this.squares.push(this.createSquare());
    }
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.flexDirection = 'row';
  }


  ngOnInit(): void {
    for (let i = 0; i < 6; i++){
      this.renderer.appendChild(this.el.nativeElement, this.squares[i]);
    }
  }
  public createSquare(){
    const square  = document.createElement('div');
     square.style.backgroundColor = `${this.colors[Math.floor(Math.random() * 3)]}`;
     square.style.width = '60px';
     square.style.height = '60px';
     square.style.margin = '50px';
     square.onclick = this.choice;
     return square;
  }

  public choice(){
    //this.usersSquares.push(square);
  }

  public onClick(){
    this.usersSquares.forEach((square)=>{
      console.log(square.style.color);
    });
  }
  

}
