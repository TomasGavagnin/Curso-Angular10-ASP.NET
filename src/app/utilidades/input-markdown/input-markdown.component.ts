import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  contenidoMarkDown: string = ''

  @Output() changeMarkdown: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  inputTextArea(texto: string): void {
    this.contenidoMarkDown = texto
    this.changeMarkdown.emit(texto)
  }
}
