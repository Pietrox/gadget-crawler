export class ProductDto {
  productId: string;
  category: string;
  model: string;
  specs: string;
}

export class AsusDto extends ProductDto {
  type: string;
  series: string;
}
