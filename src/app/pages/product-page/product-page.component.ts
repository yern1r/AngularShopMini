import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  title = 'shop-project';
  // products: IProduct[] = []
  loading = false
  //product$ : Observable<IProduct[]>
  term=''

  constructor(
    public productsService : ProductsService,
    public modalService : ModalService
  ){}

  ngOnInit(): void {
    this.loading = true
    // this.product$ = this.productsService.getAll().pipe(
    //   tap( () => this.loading = false)
    // );

    this.productsService.getAll().subscribe(
      productsSubscribe => {
        console.log(productsSubscribe);
        // this.products = productsSubscribe;
        this.loading = false
      }
    )
  }
}
