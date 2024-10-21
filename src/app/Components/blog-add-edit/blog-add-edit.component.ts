import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BlogPost, IBlogPost } from 'src/app/Interfaces/i-blogpost';
import { BlogDataService } from 'src/app/services/blog-data.service';

@Component({
  selector: 'app-blog-add-edit',
  templateUrl: './blog-add-edit.component.html',
  styleUrls: ['./blog-add-edit.component.css'],
})
export class BlogAddEditComponent implements OnInit {
  blogForm: FormGroup;
  blogObj = new BlogPost();
  blogId: number = 0;
  title: string = 'Add Blog Details';
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private blogDataService: BlogDataService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      blogText: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required],
    });
  }

  getBlogById(blogId: number) {
    this.blogDataService.getBlogById(blogId).subscribe(
      (data: IBlogPost) => {
        this.blogForm.patchValue({
          id: blogId,
          blogText: data.blogText,
          createdBy: data.username,
          createdDate: new Date(data.dateCreated)
            .toISOString()
            .substring(0, 10),
        });
      },
      (error: any) => {
        console.error('Error fetching blog post:', error);
        window.alert(error.error.message);
        this.router.navigate(['/']);
      }
    );
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blogPost: IBlogPost = {
        id: this.blogId,
        blogText: this.blogForm.value.blogText,
        username: this.blogForm.value.createdBy,
        dateCreated: this.blogForm.value.createdDate,
      };

      this.blogForm.reset();
      this.blogDataService
        .addEditBlogData(blogPost)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (data) => {
            console.log(data);
            window.alert(data.message);
          },
          error: (error) => {
            console.error('Error saving employee data:', error);
            window.alert(error.message);
          },
          complete: () => {
            this.router.navigate(['/']);
          },
        });
    }
  }

  get blogText() {
    return this.blogForm.get('blogText');
  }

  get createdBy() {
    return this.blogForm.get('createdBy');
  }

  get createdDate() {
    return this.blogForm.get('createdDate');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = Number(params.get('blogId'));
      if (this.blogId) {
        this.title = 'Edit Blog Details';
        this.getBlogById(this.blogId);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
