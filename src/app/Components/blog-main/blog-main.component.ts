import { Component, OnInit } from '@angular/core';
import { IBlogPost } from 'src/app/Interfaces/i-blogpost';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { BlogDataService } from 'src/app/services/blog-data.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.css'],
})
export class BlogMainComponent implements OnInit {
  blogs: IBlogPost[] = [];
  filterdBlogs: IBlogPost[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private blogDataService: BlogDataService
  ) {}

  add(): void {
    this.router.navigate(['/add']);
  }

  edit(blogId: number): void {
    this.router.navigate(['/edit', blogId]);
  }

  delete(blogId: number): void {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      this.blogDataService
        .deleteBlogData(blogId)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (data) => {
            window.alert(data.message);
            this.getBlogData();
          },
          error: (error) => {
            console.error(error), window.alert(error.message);
          },
        });
    }
  }

  onSearch(): void {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.blogDataService
        .searchBlog(this.searchTerm)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (data) => {
            this.blogs = data;
            this.totalItems = this.blogs.length;
            this.updatePagedEmployees();
          },
          error: (error) => {
            console.error(error), window.alert(error.message);
          },
        });
    } else {
      this.getBlogData();
      this.searchTerm = '';
    }
  }

  getBlogData() {
    this.blogDataService
      .getAllBlogData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (data) => {
          this.blogs = data;
          this.totalItems = this.blogs.length;
          this.currentPage = 1;
          this.updatePagedEmployees();
        },
        error: (error) => {
          console.error(error), window.alert(error.message);
        },
      });
  }

  updatePagedEmployees(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filterdBlogs = this.blogs.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedEmployees();
  }

  ngOnInit(): void {
    this.getBlogData();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
