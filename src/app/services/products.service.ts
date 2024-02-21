import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, retry, throwError, BehaviorSubject, tap } from 'rxjs';
import { IProduct } from '../models/product';
import { ErrorService } from "./error.service";
import { products } from '../data/products';

@Injectable({
    providedIn: 'root'
})

export class ProductsService{

    constructor(
            private http : HttpClient,
            private errorService : ErrorService
        ){

    }

    products : IProduct[] = []

    getAll() : Observable<IProduct[]>{
        return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
            // params: new HttpParams().append('limit', 5)
            params: new HttpParams({
                // fromString: 'limit = 5',
                fromObject: {limit: 5}
            })
        }).pipe(
            delay(123),
            retry(2),
            tap(products => this.products = products),
            catchError(this.errorHandler.bind(this))
            )
    }

    create(product : IProduct) : Observable<IProduct>{
        return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
        .pipe(
            tap(prod => this.products.push(prod))
        )
    }

    private errorHandler(error : HttpErrorResponse){
        this.errorService.handle(error.message)
        return throwError(() => error.message)
    }

}