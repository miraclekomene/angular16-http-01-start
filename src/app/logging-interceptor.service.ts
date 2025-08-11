import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.log('Request URL:', req.url);
        // console.log('Request Method:', req.method);
        // console.log('Request Headers:', req.headers);
        // console.log('Request Body:', req.body);
        console.log(req.url);
        console.log(req.headers);
        
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response){
                console.log('Incoming response');
                console.log(event.body);
                
            }
        }));
    }
}