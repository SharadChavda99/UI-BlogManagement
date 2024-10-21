import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBlogPost } from 'src/app/Interfaces/i-blogpost';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent {
  @Input() blog!: IBlogPost;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.blog.id);
  }

  onDelete() {
    this.delete.emit(this.blog.id);
  }
}
