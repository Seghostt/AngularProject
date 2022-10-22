import { Component, OnInit } from '@angular/core';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
type QeueItem = () => Promise<void>
var IconsText: HTMLElement= document.getElementById('Main')!

class typewriter{
queue: QeueItem[] = []   
element: HTMLElement
loop: boolean
typingspeed: number
deletingspeed: number

constructor(IconsText: HTMLElement,{loop = false, typingspeed = 50,deletingspeed = 50 } = {}){
this.element = document.createElement("div")
IconsText.append(this.element)
this.loop = loop
this.typingspeed = typingspeed
this.deletingspeed = deletingspeed
}

typestring(string: string){
  this.queue.push(() => {
    return new Promise((resolve,reject) =>{
      let i = 0;
      const interval = setInterval(() => {
        this.element.append(string[i])
        i++
        if(i >= string.length){
          clearInterval(interval)
          resolve()
        }
      }, this.typingspeed)
    })
  
  
  })

}

deletestring(number: number){
  console.log(number)
  return this
}

deleteall(deletespeed = this.deletingspeed){
  console.log(deletespeed)
}

pauseFor(duration: number){
  console.log(duration)
}

async start (){
  for(let i of this.queue){
    await i()
  }
  return this
}
}

const typewriter1 = new typewriter(document.body, {loop: true})

typewriter1.typestring("Linkedin")
typewriter1.start()
