export class ProductDto {
  productId: string;
  category: string;
  model: string;
  specs: object;
}

export class ExtProductDto extends ProductDto {
  type: string;
  series: string;
}
