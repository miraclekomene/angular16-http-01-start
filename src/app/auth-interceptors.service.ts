import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    // constructor(private auth: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        // console.log('Request is on its way');
        // console.log(req.url);
    
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        return next.handle(modifiedRequest);
        // return next.handle(modifiedRequest).pipe(tap(event => {
        //     console.log(event);
    
        //     if(event.type === HttpEventType.Response) {
        //         console.log('Response Arrived, body ');
        //         console.log(event.body);
                
        //     }
        // }));
    }
}