import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}
    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        // Create a new post
        this.http
            .post<{ name: string }>(
            // .post(
            'https://ng-complete-guide-e9401-default-rtdb.firebaseio.com/posts.json', 
            postData,
                {
                observe: 'response',
                // headers: new HttpHeaders({'Custom-Header': 'Hello'}),
                // params: new HttpParams().set('print', 'pretty')
                }
            )
            .subscribe(responseData => {
            console.log(responseData);
            }, error => {
                this.error.next(error.message);
        });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        // Fetch posts from the server
        return this.http
        .get<{ [key: string]: Post }>(
        // .get(
        'https://ng-complete-guide-e9401-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({"Custom-Header": "Hello"}),
            // params: new HttpParams().set('print', 'pretty')
            params: searchParams,
            responseType: 'json'
            // responseType: 'text'
        }
    )
        .pipe(
            // map((responseData: {[key: string]: Post}) => {
            map(responseData => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
            if(responseData.hasOwnProperty(key)){
                postsArray.push({ ...responseData[key], id: key})
            }
            }
            return postsArray;
        }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        );

    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-e9401-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                // responseType: 'json'
                responseType: 'text'
            }
        ).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Sent) {
                // ...
            }
            if(event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }))
    }
}