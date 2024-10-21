import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBlogPost } from '../Interfaces/i-blogpost';
import { Observable } from 'rxjs';
import { IMessage } from '../Interfaces/i-message';

@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  private readonly baseUrl = 'http://localhost:5018/Blog'; //provide link of API
  private getBlogDataUrl = `${this.baseUrl}/GetAllBlogData`;
  private getBlogByIdUrl = `${this.baseUrl}/GetBlogById`;
  private addEditBlogDataUrl = `${this.baseUrl}/AddEditBlog`;
  private deleteBlogDataUrl = `${this.baseUrl}/DeleteBlog`;
  private searchBlogUrl = `${this.baseUrl}/SearchBlog`;

  constructor(private http: HttpClient) {}

  getAllBlogData(): Observable<IBlogPost[]> {
    return this.http.get<IBlogPost[]>(this.getBlogDataUrl);
  }

  getBlogById(blogId: number): Observable<IBlogPost> {
    const url = `${this.getBlogByIdUrl}/${blogId}`;
    return this.http.get<IBlogPost>(url);
  }

  addEditBlogData(blog: IBlogPost): Observable<IMessage> {
    return this.http.post<IMessage>(this.addEditBlogDataUrl, blog);
  }

  deleteBlogData(blogId: number): Observable<IMessage> {
    const url = `${this.deleteBlogDataUrl}/${blogId}`;
    return this.http.delete<IMessage>(url);
  }

  searchBlog(searchText: string): Observable<IBlogPost[]> {
    const url = `${this.searchBlogUrl}/${searchText}`;
    return this.http.get<IBlogPost[]>(url);
  }
}
