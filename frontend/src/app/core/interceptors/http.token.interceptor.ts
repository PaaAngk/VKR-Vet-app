import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentService, JwtService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private departmentService: DepartmentService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      //'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      'Authorization':'',
      'Department': ''
    };

    const token = this.jwtService.getToken();
    const department = this.departmentService.getCurrentDepartmentKey()

    console.log(department)

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    if (department) {
      headersConfig['Department'] = department;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
